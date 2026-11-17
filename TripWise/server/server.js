require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const destinations = require("./data/destinations");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

const reviewsFile = path.join(__dirname, "data", "reviews.json");
const dynamicDestinationCache = new Map();
const discoveryCache = new Map();
const CACHE_TTL = 30 * 60 * 1000;
const DEFAULT_RADIUS_METERS = 180000;

const knownOrigins = {
  bengaluru: { lat: 12.9716, lon: 77.5946, state: "Karnataka" },
  bangalore: { lat: 12.9716, lon: 77.5946, state: "Karnataka" },
  kerala: { lat: 10.8505, lon: 76.2711, state: "Kerala" },
  kochi: { lat: 9.9312, lon: 76.2673, state: "Kerala" },
  ernakulam: { lat: 9.9816, lon: 76.2999, state: "Kerala" },
  trivandrum: { lat: 8.5241, lon: 76.9366, state: "Kerala" },
  thiruvananthapuram: { lat: 8.5241, lon: 76.9366, state: "Kerala" },
  mumbai: { lat: 19.0760, lon: 72.8777, state: "Maharashtra" },
  delhi: { lat: 28.6139, lon: 77.2090, state: "Delhi" },
  hyderabad: { lat: 17.3850, lon: 78.4867, state: "Telangana" },
  chennai: { lat: 13.0827, lon: 80.2707, state: "Tamil Nadu" },
  kolkata: { lat: 22.5726, lon: 88.3639, state: "West Bengal" },
  pune: { lat: 18.5204, lon: 73.8567, state: "Maharashtra" },
  jaipur: { lat: 26.9124, lon: 75.7873, state: "Rajasthan" },
  ahmedabad: { lat: 23.0225, lon: 72.5714, state: "Gujarat" },
  goa: { lat: 15.2993, lon: 74.1240, state: "Goa" },
  lucknow: { lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh" },
  bhopal: { lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh" },
  chandigarh: { lat: 30.7333, lon: 76.7794, state: "Chandigarh" },
  shimla: { lat: 31.1048, lon: 77.1734, state: "Himachal Pradesh" },
  dehradun: { lat: 30.3165, lon: 78.0322, state: "Uttarakhand" },
  srinagar: { lat: 34.0837, lon: 74.7973, state: "Jammu and Kashmir" },
  guwahati: { lat: 26.1445, lon: 91.7362, state: "Assam" },
  patna: { lat: 25.5941, lon: 85.1376, state: "Bihar" },
  ranchi: { lat: 23.3441, lon: 85.3096, state: "Jharkhand" },
  bhubaneswar: { lat: 20.2961, lon: 85.8245, state: "Odisha" },
  raipur: { lat: 21.2514, lon: 81.6296, state: "Chhattisgarh" },
  imphal: { lat: 24.8170, lon: 93.9368, state: "Manipur" },
  shillong: { lat: 25.5788, lon: 91.8933, state: "Meghalaya" },
  gangtok: { lat: 27.3389, lon: 88.6065, state: "Sikkim" },
  itanagar: { lat: 27.0844, lon: 93.6053, state: "Arunachal Pradesh" },
  agartala: { lat: 23.8315, lon: 91.2868, state: "Tripura" },
  aizawl: { lat: 23.7271, lon: 92.7176, state: "Mizoram" },
  kohima: { lat: 25.6751, lon: 94.1086, state: "Nagaland" },
  panaji: { lat: 15.4909, lon: 73.8278, state: "Goa" }
};

const Review = mongoose.models.Review || mongoose.model("Review", new mongoose.Schema({
  destinationId: { type: String, required: true, index: true },
  name: { type: String, required: true, maxlength: 50 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
}));

function readLocalReviews() {
  try {
    if (!fs.existsSync(reviewsFile)) return [];
    return JSON.parse(fs.readFileSync(reviewsFile, "utf8"));
  } catch {
    return [];
  }
}

function writeLocalReviews(reviews) {
  fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
}

function haversineKm(a, b) {
  const toRad = (value) => value * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const value = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

async function geocodeOrigin(origin) {
  const normalized = origin.trim().toLowerCase();
  if (knownOrigins[normalized]) return knownOrigins[normalized];

  const cacheKey = `geo:${normalized}`;
  const cached = discoveryCache.get(cacheKey);
  if (cached && Date.now() - cached.time < CACHE_TTL) return cached.value;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", `${origin}, India`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url, {
    headers: { "User-Agent": "TripWiseStudentProject/1.0 (destination discovery)" },
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error("Location lookup service is temporarily unavailable.");

  const results = await response.json();
  if (!results.length) throw new Error("We couldn't identify that starting location. Try entering a city or state in India.");

  const item = results[0];
  const value = {
    lat: Number(item.lat),
    lon: Number(item.lon),
    state: item.address?.state || item.address?.region || "",
    displayName: item.display_name
  };
  discoveryCache.set(cacheKey, { time: Date.now(), value });
  return value;
}

function mapOsmCategories(tags = {}) {
  const categories = new Set();
  const natural = tags.natural || "";
  const tourism = tags.tourism || "";
  const historic = tags.historic || "";
  const leisure = tags.leisure || "";
  const sport = tags.sport || "";
  const name = (tags.name || "").toLowerCase();

  if (natural === "beach" || /beach|coast|seaside/.test(name)) categories.add("Beaches");
  if (natural === "waterfall" || tags.waterway === "waterfall" || /falls|waterfall/.test(name)) categories.add("Waterfalls");
  if (natural === "wood" || leisure === "nature_reserve" || leisure === "park" || /forest|wildlife|sanctuary|national park/.test(name)) categories.add("Forests");
  if (tags.natural === "peak" || tags.mountain || /hill|peak|mountain|valley|ghat/.test(name)) categories.add("Mountains");
  if (historic || /fort|palace|temple|monument|heritage|museum/.test(name)) categories.add("Heritage");
  if (tourism === "museum" || tourism === "zoo" || tourism === "theme_park" || /city|market/.test(name)) categories.add("Cities");
  if (sport || tourism === "viewpoint" || /trek|climb|adventure|viewpoint/.test(name)) categories.add("Adventure");
  if (tourism === "attraction" || tourism === "viewpoint") {
    if (!categories.size) categories.add("Adventure");
  }
  return [...categories];
}

function buildDynamicDestination(element, originPoint) {
  const tags = element.tags || {};
  const name = tags.name || tags["name:en"];
  if (!name) return null;

  const lat = Number(element.lat ?? element.center?.lat);
  const lon = Number(element.lon ?? element.center?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const categories = mapOsmCategories(tags);
  if (!categories.length) return null;

  const id = `osm-${element.type}-${element.id}`;
  const distanceKm = originPoint ? Math.round(haversineKm(originPoint, { lat, lon })) : null;
  const destination = {
    id,
    name,
    state: tags["addr:state"] || "",
    categories,
    summary: `${name} is a mapped place of interest. Check local information for current access, facilities and activities.`,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=80",
    coordinates: { lat, lng: lon },
    mapUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    distanceKm,
    dataSource: "OpenStreetMap",
    baseCosts: { transport: Math.max(500, Math.round((distanceKm || 100) * 3.2)), accommodation: 1000, food: 600, activities: 400 },
    perDayCosts: { accommodation: 1000, food: 600, activities: 400 },
    transport: [
      { mode: "Bus / public transport", priceRange: "Indicative estimate only; check current route fares" },
      { mode: "Train + local transfer", priceRange: "Availability depends on route; check current fares" },
      { mode: "Car", priceRange: "Estimate depends on road distance and vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "Indicative ₹400–₹1,000/night", capacity: "Availability and capacity vary by property" },
      { type: "Budget hotel", priceRange: "Indicative ₹1,000–₹2,500/night", capacity: "Usually 2–3 guests/room; confirm directly" },
      { type: "Homestay", priceRange: "Indicative ₹1,500–₹3,500/night", capacity: "Availability and capacity vary by property" }
    ],
    attractions: [name],
    itinerary: [
      { title: `Arrive at ${name}`, description: "Reach the destination and check local access and opening information.", activities: ["Arrival and check-in", name, "Explore nearby area"] },
      { title: "Explore the area", description: "Visit nearby attractions after checking travel time and local conditions.", activities: ["Local sightseeing", "Regional food", "Nearby viewpoint or attraction"] },
      { title: "Return journey", description: "Enjoy a relaxed morning and begin the return journey.", activities: ["Breakfast", "Final local stop", "Return journey"] }
    ]
  };
  dynamicDestinationCache.set(id, destination);
  return destination;
}

async function discoverOsmDestinations(originPoint, preferences, radius = DEFAULT_RADIUS_METERS) {
  const cacheKey = `osm:${originPoint.lat.toFixed(3)}:${originPoint.lon.toFixed(3)}:${[...preferences].sort().join(",")}:${radius}`;
  const cached = discoveryCache.get(cacheKey);
  if (cached && Date.now() - cached.time < CACHE_TTL) return cached.value;

  const lat = originPoint.lat;
  const lon = originPoint.lon;
  const query = `[out:json][timeout:20];
(
  nwr(around:${radius},${lat},${lon})["name"]["natural"~"^(beach|waterfall|peak|wood)$"];
  nwr(around:${radius},${lat},${lon})["name"]["tourism"~"^(attraction|viewpoint|museum|zoo|theme_park)$"];
  nwr(around:${radius},${lat},${lon})["name"]["historic"];
  nwr(around:${radius},${lat},${lon})["name"]["leisure"~"^(nature_reserve|park)$"];
  nwr(around:${radius},${lat},${lon})["name"]["waterway"="waterfall"];
);
out center tags;`;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "TripWiseStudentProject/1.0"
    },
    body: new URLSearchParams({ data: query }),
    signal: AbortSignal.timeout(25000)
  });
  if (!response.ok) throw new Error("The places discovery service is busy. Please try again in a moment.");

  const data = await response.json();
  const wanted = new Set(preferences);
  const mapped = (data.elements || [])
    .map((element) => buildDynamicDestination(element, originPoint))
    .filter(Boolean)
    .filter((item) => item.categories.some((category) => wanted.has(category)));

  const unique = [...new Map(mapped.map((item) => [item.name.toLowerCase(), item])).values()];
  unique.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  discoveryCache.set(cacheKey, { time: Date.now(), value: unique });
  return unique;
}

function estimateDestination(destination, input, originPoint) {
  const people = input.people;
  const days = input.days;
  const nights = Math.max(days - 1, 1);
  const distanceKm = originPoint && destination.coordinates
    ? Math.round(haversineKm(originPoint, { lat: destination.coordinates.lat, lon: destination.coordinates.lng }))
    : null;

  const perPersonTransport = distanceKm === null
    ? destination.baseCosts.transport
    : Math.max(300, Math.round(distanceKm * 3.2));
  const transport = perPersonTransport * people;
  const accommodation = destination.perDayCosts.accommodation * nights * Math.ceil(people / 2);
  const food = destination.perDayCosts.food * days * people;
  const activities = destination.perDayCosts.activities * days * people;
  const estimatedTotal = transport + accommodation + food + activities;
  const preferenceMatches = destination.categories.filter((category) => input.preferences.includes(category)).length;
  const preferenceScore = preferenceMatches / Math.max(input.preferences.length, 1);
  const distanceScore = distanceKm === null ? 0 : Math.max(0, 20 - distanceKm / 50);
  const matchScore = Math.min(99, Math.round(55 + preferenceScore * 25 + (estimatedTotal <= input.budget ? 9 : 0) + distanceScore / 2));

  return {
    ...destination,
    distanceKm,
    matchScore,
    estimatedTotal,
    costs: { transport, accommodation, food, activities },
    withinBudget: estimatedTotal <= input.budget
  };
}

function getDestinationById(id) {
  return destinations.find((item) => item.id === id) || dynamicDestinationCache.get(id);
}

app.get("/", (req, res) => {
  res.json({ success: true, message: "TripWise API is running." });
});

app.get("/api/destinations", (req, res) => {
  const { preference } = req.query;
  const list = preference ? destinations.filter((item) => item.categories.includes(preference)) : destinations;
  res.json({ success: true, destinations: list.map(({ itinerary, ...item }) => item) });
});

app.post("/api/trips/plan", async (req, res) => {
  const { origin, budget, people, days, date, preferences } = req.body || {};
  if (typeof origin !== "string" || !origin.trim()) {
    return res.status(400).json({ success: false, message: "Enter your starting location." });
  }
  if (!Number.isFinite(budget) || budget < 1000) {
    return res.status(400).json({ success: false, message: "Enter a valid budget of at least ₹1,000." });
  }
  if (!Number.isInteger(people) || people < 1 || people > 30) {
    return res.status(400).json({ success: false, message: "Choose between 1 and 30 travellers." });
  }
  if (!Number.isInteger(days) || days < 1 || days > 14) {
    return res.status(400).json({ success: false, message: "Choose a trip duration between 1 and 14 days." });
  }
  if (!Array.isArray(preferences) || preferences.length === 0) {
    return res.status(400).json({ success: false, message: "Choose at least one travel preference." });
  }

  const input = { origin: origin.trim(), budget, people, days, date: date || null, preferences };
  let originPoint = null;
  let discoveryError = null;

  try {
    originPoint = await geocodeOrigin(input.origin);
  } catch (error) {
    discoveryError = error.message;
  }

  let discovered = [];
  if (originPoint) {
    try {
      discovered = await discoverOsmDestinations(originPoint, preferences, DEFAULT_RADIUS_METERS);
      if (discovered.length < 5) {
        const expanded = await discoverOsmDestinations(originPoint, preferences, 350000);
        discovered = [...discovered, ...expanded];
      }
    } catch (error) {
      discoveryError = error.message;
    }
  }

  const staticMatches = destinations.filter((destination) =>
    destination.categories.some((category) => preferences.includes(category))
  );

  const combined = [...staticMatches, ...discovered];
  const unique = [...new Map(combined.map((destination) => [destination.name.toLowerCase(), destination])).values()];

  
const matching = unique
  .map((destination) => estimateDestination(destination, input, originPoint))
  .sort((a, b) => {
    const distanceA = a.distanceKm ?? Infinity;
    const distanceB = b.distanceKm ?? Infinity;

    if (distanceA !== distanceB) {
      return distanceA - distanceB;
    }

    if (a.withinBudget !== b.withinBudget) {
      return Number(b.withinBudget) - Number(a.withinBudget);
    }

    return b.matchScore - a.matchScore;
  })
  .slice(0, 10);


  const affordable = matching.filter((destination) => destination.withinBudget);
  const budgetWarning = affordable.length === 0
    ? "😂 This budget may be too tight for the selected trip. Try increasing it, reducing the number of days, or choosing a closer destination."
    : null;

  const response = {
    success: true,
    message: affordable.length
      ? `${affordable.length} of ${matching.length} suggested destinations fit the estimated budget.`
      : `Found ${matching.length} matching destinations. Their estimates exceed your budget.`,
    input,
    budgetWarning,
    estimateNote: "Indicative planning estimates only. Transport is approximated from straight-line distance, not live road routes or current fares. Accommodation and activity prices are sample estimates, not live availability or quotations. Confirm all prices before booking.",
    discoveryNote: discoveryError
      ? `Some live place discovery was unavailable: ${discoveryError}. Showing matching destinations from the TripWise database where available.`
      : "Recommendations combine TripWise destination records with places discovered through OpenStreetMap. Distance is approximate.",
    destinations: matching.map(({ itinerary, ...destination }) => destination)
  };

  if (matching.length < 5) {
    response.message += " Fewer than five matching places were available in the current data sources; no unrelated destinations were added just to fill the list.";
  }

  res.json(response);
});

app.post("/api/itinerary", (req, res) => {
  const { destinationId, days, preferences = [] } = req.body || {};
  const destination = getDestinationById(destinationId);
  if (!destination) return res.status(404).json({ success: false, message: "Destination not found. Please generate recommendations again." });
  if (!Number.isInteger(days) || days < 1 || days > 14) {
    return res.status(400).json({ success: false, message: "Trip duration must be between 1 and 14 days." });
  }

  const base = destination.itinerary || [];
  const fallback = {
    title: `Explore ${destination.name}`,
    description: "Explore the destination and confirm local access and opening information before travelling.",
    activities: destination.attractions?.length ? destination.attractions.slice(0, 3) : [destination.name, "Local sightseeing", "Return journey"]
  };
  const sourceDays = base.length ? base : [fallback];
  const plan = Array.from({ length: days }, (_, index) => {
    const source = sourceDays[index % sourceDays.length];
    const preferenceActivity = preferences.includes("Adventure") && index === 1 ? "Optional guided outdoor activity" : null;
    return {
      day: index + 1,
      title: source.title,
      description: source.description,
      activities: [...source.activities, ...(preferenceActivity ? [preferenceActivity] : [])]
    };
  });

  res.json({ success: true, itinerary: { destination: destination.name, days: plan } });
});

app.get("/api/reviews/:destinationId", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find({ destinationId: req.params.destinationId }).sort({ createdAt: -1 }).lean();
      return res.json({ success: true, reviews: reviews.map((review) => ({ ...review, id: String(review._id) })) });
    }
    const reviews = readLocalReviews().filter((review) => review.destinationId === req.params.destinationId);
    res.json({ success: true, reviews });
  } catch {
    res.status(500).json({ success: false, message: "Unable to load reviews." });
  }
});

app.post("/api/reviews", async (req, res) => {
  const { destinationId, name, rating, comment } = req.body || {};
  const destination = getDestinationById(destinationId);
  if (!destination) return res.status(404).json({ success: false, message: "Destination not found. Generate the destination again before reviewing it." });
  if (typeof name !== "string" || !name.trim() || name.length > 50) {
    return res.status(400).json({ success: false, message: "Enter a name of up to 50 characters." });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Choose a rating from 1 to 5." });
  }
  if (typeof comment !== "string" || comment.trim().length < 8 || comment.length > 500) {
    return res.status(400).json({ success: false, message: "Review must be between 8 and 500 characters." });
  }

  try {
    let review;
    if (mongoose.connection.readyState === 1) {
      const created = await Review.create({ destinationId, name: name.trim(), rating, comment: comment.trim() });
      review = { id: String(created._id), destinationId, name: created.name, rating: created.rating, comment: created.comment, createdAt: created.createdAt };
    } else {
      review = { id: crypto.randomUUID(), destinationId, name: name.trim(), rating, comment: comment.trim(), createdAt: new Date().toISOString() };
      const reviews = readLocalReviews();
      reviews.unshift(review);
      writeLocalReviews(reviews);
    }
    res.status(201).json({ success: true, review });
  } catch {
    res.status(500).json({ success: false, message: "Unable to save your review." });
  }
});

app.use((req, res) => res.status(404).json({ success: false, message: "Endpoint not found." }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`TripWise API running on http://localhost:${PORT}`);
  if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.error("MongoDB connection failed; local review storage remains active:", error.message));
  } else {
    console.log("MongoDB URI not configured; reviews will be stored locally.");
  }
});
