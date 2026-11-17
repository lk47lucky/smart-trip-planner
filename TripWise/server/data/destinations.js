const destinations = [
  {
    id: "coorg",
    name: "Coorg",
    state: "Karnataka",
    categories: ["Mountains", "Forests", "Waterfalls", "Adventure"],
    summary: "Coffee estates, misty hills, forest drives and waterfalls make Coorg a relaxed nature escape.",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1000&q=85",
    coordinates: { lat: 12.3375, lng: 75.8069 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Coorg+Karnataka",
    baseCosts: { transport: 1800, accommodation: 1100, food: 650, activities: 500 },
    perDayCosts: { accommodation: 1100, food: 650, activities: 500 },
    transport: [
      { mode: "Bus", priceRange: "₹700–₹1,200/person return" },
      { mode: "Train + taxi", priceRange: "₹1,000–₹1,800/person" },
      { mode: "Car", priceRange: "₹5,000–₹7,500/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹500–₹900/night", capacity: "Shared rooms; usually 4–8 beds" },
      { type: "Budget hotel", priceRange: "₹1,200–₹2,200/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,800–₹3,500/night", capacity: "Often 2–4 guests/room" }
    ],
    attractions: ["Abbey Falls", "Raja's Seat", "Coffee estate visit", "Mandalpatti viewpoint", "Dubare Elephant Camp"],
    itinerary: [
      { title: "Arrive and explore Madikeri", description: "Reach Coorg, settle in and enjoy the hill-town atmosphere.", activities: ["Raja's Seat", "Madikeri Fort", "Local market"] },
      { title: "Waterfalls and coffee country", description: "Spend the day among forest paths, waterfalls and coffee estates.", activities: ["Abbey Falls", "Coffee estate", "Omkareshwara Temple"] },
      { title: "Scenic views and return", description: "Choose a final viewpoint or nature stop before heading back.", activities: ["Mandalpatti viewpoint", "Breakfast with a view", "Return journey"] }
    ]
  },
  {
    id: "chikmagalur",
    name: "Chikmagalur",
    state: "Karnataka",
    categories: ["Mountains", "Forests", "Waterfalls", "Adventure"],
    summary: "A Western Ghats favourite with coffee plantations, mountain viewpoints and trekking routes.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=85",
    coordinates: { lat: 13.3161, lng: 75.7720 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chikmagalur+Karnataka",
    baseCosts: { transport: 1600, accommodation: 1000, food: 600, activities: 550 },
    perDayCosts: { accommodation: 1000, food: 600, activities: 550 },
    transport: [
      { mode: "Bus", priceRange: "₹600–₹1,000/person return" },
      { mode: "Train + taxi", priceRange: "₹900–₹1,700/person" },
      { mode: "Car", priceRange: "₹4,500–₹7,000/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹450–₹850/night", capacity: "Shared rooms; usually 4–8 beds" },
      { type: "Budget hotel", priceRange: "₹1,000–₹2,000/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,500–₹3,200/night", capacity: "Often 2–5 guests/room" }
    ],
    attractions: ["Mullayanagiri", "Baba Budangiri", "Jhari Falls", "Coffee museum", "Hirekolale Lake"],
    itinerary: [
      { title: "Arrive in coffee country", description: "Check in and explore the town and nearby lake.", activities: ["Hirekolale Lake", "Coffee museum", "Local cafes"] },
      { title: "Mountain viewpoints", description: "Explore the highlands and waterfalls. Check local access conditions before trekking.", activities: ["Mullayanagiri", "Baba Budangiri", "Jhari Falls"] },
      { title: "Slow morning and return", description: "Enjoy a relaxed breakfast and a final plantation stop.", activities: ["Coffee plantation", "Local breakfast", "Return journey"] }
    ]
  },
  {
    id: "gokarna",
    name: "Gokarna",
    state: "Karnataka",
    categories: ["Beaches", "Adventure"],
    summary: "A laid-back coastal town known for beaches, cliffside walks and relaxed sunsets.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    coordinates: { lat: 14.5479, lng: 74.3188 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gokarna+Karnataka",
    baseCosts: { transport: 2200, accommodation: 900, food: 650, activities: 450 },
    perDayCosts: { accommodation: 900, food: 650, activities: 450 },
    transport: [
      { mode: "Bus", priceRange: "₹900–₹1,600/person return" },
      { mode: "Train", priceRange: "₹500–₹1,200/person return, plus local transfer" },
      { mode: "Car", priceRange: "₹6,000–₹9,000/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹400–₹850/night", capacity: "Shared rooms; usually 4–10 beds" },
      { type: "Budget hotel", priceRange: "₹1,000–₹2,000/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,500–₹3,000/night", capacity: "Often 2–4 guests/room" }
    ],
    attractions: ["Om Beach", "Kudle Beach", "Half Moon Beach", "Gokarna Main Beach", "Mahabaleshwar Temple"],
    itinerary: [
      { title: "Arrive by the coast", description: "Check in, explore the town and enjoy a relaxed beach evening.", activities: ["Gokarna town", "Kudle Beach", "Sunset"] },
      { title: "Beach trail day", description: "Explore the coastline on foot or by locally available transport.", activities: ["Om Beach", "Half Moon Beach", "Coastal viewpoints"] },
      { title: "Temple and return", description: "Visit the town centre and start the return journey.", activities: ["Mahabaleshwar Temple", "Main Beach", "Return journey"] }
    ]
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    categories: ["Heritage", "Cities", "Adventure"],
    summary: "A remarkable landscape of ancient ruins, giant boulders, temples and riverside views.",
    image: "https://images.unsplash.com/photo-1600100397608-f010e9c7c7e8?w=1000&q=85",
    coordinates: { lat: 15.3350, lng: 76.4600 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hampi+Karnataka",
    baseCosts: { transport: 2200, accommodation: 850, food: 600, activities: 450 },
    perDayCosts: { accommodation: 850, food: 600, activities: 450 },
    transport: [
      { mode: "Bus", priceRange: "₹900–₹1,500/person return" },
      { mode: "Train", priceRange: "₹500–₹1,300/person return, plus transfer" },
      { mode: "Car", priceRange: "₹6,000–₹9,000/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹350–₹750/night", capacity: "Shared rooms; usually 4–10 beds" },
      { type: "Budget hotel", priceRange: "₹900–₹1,800/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,300–₹2,800/night", capacity: "Often 2–5 guests/room" }
    ],
    attractions: ["Virupaksha Temple", "Vittala Temple", "Stone Chariot", "Hemakuta Hill", "Matanga Hill"],
    itinerary: [
      { title: "Temple town and riverside", description: "Arrive and explore the central heritage area at an easy pace.", activities: ["Virupaksha Temple", "Hampi Bazaar", "Riverside walk"] },
      { title: "The grand monuments", description: "Spend the day exploring Hampi's major archaeological sites.", activities: ["Vittala Temple", "Stone Chariot", "Royal Enclosure"] },
      { title: "Sunrise viewpoint and return", description: "Catch an early view if conditions permit, then return.", activities: ["Hemakuta Hill", "Local breakfast", "Return journey"] }
    ]
  },
  {
    id: "mysuru",
    name: "Mysuru",
    state: "Karnataka",
    categories: ["Cities", "Heritage"],
    summary: "A cultural city break with palaces, gardens, markets and well-known local food.",
    image: "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=1000&q=85",
    coordinates: { lat: 12.2958, lng: 76.6394 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mysuru+Karnataka",
    baseCosts: { transport: 700, accommodation: 900, food: 600, activities: 500 },
    perDayCosts: { accommodation: 900, food: 600, activities: 500 },
    transport: [
      { mode: "Train", priceRange: "₹150–₹500/person return" },
      { mode: "Bus", priceRange: "₹300–₹650/person return" },
      { mode: "Car", priceRange: "₹2,500–₹4,000/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹400–₹800/night", capacity: "Shared rooms; usually 4–8 beds" },
      { type: "Budget hotel", priceRange: "₹900–₹1,800/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,400–₹2,800/night", capacity: "Often 2–5 guests/room" }
    ],
    attractions: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens", "St Philomena's Church", "Devaraja Market"],
    itinerary: [
      { title: "Palace and city centre", description: "Explore the historic centre and local markets.", activities: ["Mysore Palace", "Devaraja Market", "St Philomena's Church"] },
      { title: "Hill and gardens", description: "Visit the hilltop temple and gardens; check garden timings.", activities: ["Chamundi Hill", "Brindavan Gardens", "Local food"] },
      { title: "A relaxed city morning", description: "Enjoy breakfast and one final stop before returning.", activities: ["Karanji Lake", "Mysore breakfast", "Return journey"] }
    ]
  },
  {
    id: "wayanad",
    name: "Wayanad",
    state: "Kerala",
    categories: ["Mountains", "Forests", "Waterfalls", "Adventure"],
    summary: "Green highlands, forest reserves, caves and waterfalls across Kerala's Western Ghats.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&q=85",
    coordinates: { lat: 11.6854, lng: 76.1320 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Wayanad+Kerala",
    baseCosts: { transport: 1900, accommodation: 1100, food: 650, activities: 550 },
    perDayCosts: { accommodation: 1100, food: 650, activities: 550 },
    transport: [
      { mode: "Bus", priceRange: "₹700–₹1,400/person return" },
      { mode: "Train + bus", priceRange: "₹900–₹1,700/person" },
      { mode: "Car", priceRange: "₹5,500–₹8,000/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹450–₹900/night", capacity: "Shared rooms; usually 4–8 beds" },
      { type: "Budget hotel", priceRange: "₹1,200–₹2,300/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,800–₹3,500/night", capacity: "Often 2–5 guests/room" }
    ],
    attractions: ["Edakkal Caves", "Soochipara Falls", "Pookode Lake", "Banasura Sagar Dam", "Lakkidi View Point"],
    itinerary: [
      { title: "Arrive in the highlands", description: "Settle in and explore a nearby lake or viewpoint.", activities: ["Pookode Lake", "Lakkidi View Point", "Local market"] },
      { title: "Caves and waterfalls", description: "Choose accessible nature attractions and check local entry conditions.", activities: ["Edakkal Caves", "Soochipara Falls", "Scenic drive"] },
      { title: "Dam and return", description: "Enjoy a final scenic stop before beginning the return journey.", activities: ["Banasura Sagar Dam", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    categories: ["Mountains", "Forests", "Cities"],
    summary: "A classic Nilgiri hill station with tea gardens, cool weather and scenic rail journeys.",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1000&q=85",
    coordinates: { lat: 11.4102, lng: 76.6950 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ooty+Tamil+Nadu",
    baseCosts: { transport: 2100, accommodation: 1200, food: 700, activities: 600 },
    perDayCosts: { accommodation: 1200, food: 700, activities: 600 },
    transport: [
      { mode: "Bus", priceRange: "₹800–₹1,500/person return" },
      { mode: "Train + bus", priceRange: "₹700–₹1,600/person" },
      { mode: "Car", priceRange: "₹6,000–₹9,000/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹500–₹950/night", capacity: "Shared rooms; usually 4–8 beds" },
      { type: "Budget hotel", priceRange: "₹1,300–₹2,500/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,800–₹3,800/night", capacity: "Often 2–5 guests/room" }
    ],
    attractions: ["Botanical Garden", "Ooty Lake", "Doddabetta Peak", "Tea Factory", "Nilgiri Mountain Railway"],
    itinerary: [
      { title: "Arrive and settle in", description: "Explore the town centre and enjoy the cooler evening weather.", activities: ["Ooty Lake", "Town market", "Local tea"] },
      { title: "Gardens and viewpoints", description: "Visit the botanical garden and surrounding viewpoints.", activities: ["Botanical Garden", "Doddabetta Peak", "Tea Factory"] },
      { title: "Heritage rail and return", description: "If tickets are available, enjoy a Nilgiri train experience before returning.", activities: ["Nilgiri Mountain Railway", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "sakleshpur",
    name: "Sakleshpur",
    state: "Karnataka",
    categories: ["Mountains", "Forests", "Adventure", "Waterfalls"],
    summary: "A quieter Western Ghats getaway with plantation stays, green hills and nature trails.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&q=85",
    coordinates: { lat: 12.9416, lng: 75.7847 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sakleshpur+Karnataka",
    baseCosts: { transport: 1400, accommodation: 950, food: 600, activities: 450 },
    perDayCosts: { accommodation: 950, food: 600, activities: 450 },
    transport: [
      { mode: "Bus", priceRange: "₹500–₹900/person return" },
      { mode: "Train", priceRange: "₹250–₹800/person return" },
      { mode: "Car", priceRange: "₹4,000–₹6,500/vehicle" }
    ],
    accommodation: [
      { type: "Hostel / dorm", priceRange: "₹400–₹800/night", capacity: "Shared rooms; usually 4–8 beds" },
      { type: "Budget hotel", priceRange: "₹1,000–₹1,900/night", capacity: "Usually 2–3 guests/room" },
      { type: "Homestay", priceRange: "₹1,500–₹3,000/night", capacity: "Often 2–6 guests/room" }
    ],
    attractions: ["Manjarabad Fort", "Bisle View Point", "Jenukal Gudda", "Plantation trails", "Hemavathi backwaters"],
    itinerary: [
      { title: "Fort and plantation stay", description: "Arrive, check in and explore the historic fort.", activities: ["Manjarabad Fort", "Plantation walk", "Local dinner"] },
      { title: "Hills and viewpoints", description: "Spend the day exploring scenic highland routes.", activities: ["Bisle View Point", "Jenukal Gudda", "Nature trail"] },
      { title: "Slow morning and return", description: "Enjoy a relaxed breakfast and return journey.", activities: ["Plantation breakfast", "Local market", "Return journey"] }
    ]
  }
,
  {
    id: "varkala", name: "Varkala", state: "Kerala",
    categories: ["Beaches", "Adventure"],
    summary: "A coastal destination known for its cliffside views, beaches and relaxed seaside atmosphere.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    coordinates: { lat: 8.7379, lng: 76.7163 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Varkala+Kerala",
    baseCosts: { transport: 1800, accommodation: 1000, food: 650, activities: 450 },
    perDayCosts: { accommodation: 1000, food: 650, activities: 450 },
    transport: [{ mode: "Train", priceRange: "Varies by origin; check current fares" }, { mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹500–₹1,000/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,200–₹2,500/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,800–₹3,500/night", capacity: "Capacity varies by property" }],
    attractions: ["Varkala Cliff", "Papanasam Beach", "Kappil Beach", "Anjengo Fort"],
    itinerary: [
      { title: "Arrive and explore the cliff", description: "Check in and explore the coastal cliff area.", activities: ["Varkala Cliff", "Papanasam Beach", "Sunset"] },
      { title: "Beaches and coastal views", description: "Explore nearby beaches and coastal scenery.", activities: ["Kappil Beach", "Local cafes", "Coastal walk"] },
      { title: "Relaxed morning and return", description: "Enjoy a final beach visit before returning.", activities: ["Morning beach visit", "Local market", "Return journey"] }
    ]
  },
  {
    id: "kovalam", name: "Kovalam", state: "Kerala",
    categories: ["Beaches", "Adventure"],
    summary: "A well-known coastal town with crescent beaches and a lighthouse viewpoint.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    coordinates: { lat: 8.4004, lng: 76.9787 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kovalam+Kerala",
    baseCosts: { transport: 1800, accommodation: 1100, food: 700, activities: 500 },
    perDayCosts: { accommodation: 1100, food: 700, activities: 500 },
    transport: [{ mode: "Train", priceRange: "Varies by origin; check current fares" }, { mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹500–₹1,000/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,300–₹2,600/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,800–₹3,500/night", capacity: "Capacity varies by property" }],
    attractions: ["Lighthouse Beach", "Hawa Beach", "Samudra Beach", "Vizhinjam Lighthouse"],
    itinerary: [
      { title: "Arrive at the coast", description: "Settle in and explore the main beach area.", activities: ["Lighthouse Beach", "Vizhinjam Lighthouse", "Sunset"] },
      { title: "Explore the coastline", description: "Enjoy the beaches and nearby coastal attractions.", activities: ["Hawa Beach", "Samudra Beach", "Local seafood area"] },
      { title: "Morning by the sea and return", description: "Enjoy a relaxed morning before returning.", activities: ["Beach walk", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "alleppey", name: "Alappuzha", state: "Kerala",
    categories: ["Beaches", "Forests", "Cities"],
    summary: "Known for its backwaters, canals, houseboats and long sandy coastline.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=85",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Alappuzha+Kerala",
    baseCosts: { transport: 1600, accommodation: 1000, food: 650, activities: 600 },
    perDayCosts: { accommodation: 1000, food: 650, activities: 600 },
    transport: [{ mode: "Train", priceRange: "Varies by origin; check current fares" }, { mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹450–₹900/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,100–₹2,300/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,600–₹3,500/night", capacity: "Capacity varies by property" }],
    attractions: ["Alappuzha Beach", "Backwaters", "Pathiramanal Island", "Marari Beach"],
    itinerary: [
      { title: "Arrive and explore the beach", description: "Check in and visit the coast.", activities: ["Alappuzha Beach", "Lighthouse area", "Local market"] },
      { title: "Backwater experience", description: "Explore the backwaters using locally available services.", activities: ["Backwater cruise", "Canal-side villages", "Pathiramanal Island"] },
      { title: "Slow morning and return", description: "Enjoy breakfast and a final local stop.", activities: ["Beach walk", "Local breakfast", "Return journey"] }
    ]
  },
  {
    id: "munnar", name: "Munnar", state: "Kerala",
    categories: ["Mountains", "Forests", "Adventure"],
    summary: "Hill station with tea plantations, mountain scenery and cool weather.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=85",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Munnar+Kerala",
    baseCosts: { transport: 2000, accommodation: 1200, food: 700, activities: 550 },
    perDayCosts: { accommodation: 1200, food: 700, activities: 550 },
    transport: [{ mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Train + bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹500–₹1,000/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,300–₹2,600/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,800–₹4,000/night", capacity: "Capacity varies by property" }],
    attractions: ["Tea Museum", "Eravikulam National Park", "Mattupetty Dam", "Top Station"],
    itinerary: [
      { title: "Arrive in the hills", description: "Settle in and explore tea country.", activities: ["Tea Museum", "Tea plantation viewpoint", "Local market"] },
      { title: "National park and viewpoints", description: "Explore the highland scenery and check park access in advance.", activities: ["Eravikulam National Park", "Mattupetty Dam", "Echo Point"] },
      { title: "Scenic morning and return", description: "Enjoy a final viewpoint before returning.", activities: ["Top Station", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "thekkady", name: "Thekkady", state: "Kerala",
    categories: ["Forests", "Mountains", "Adventure"],
    summary: "A nature destination known for forest landscapes and the Periyar region.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&q=85",
    coordinates: { lat: 9.6031, lng: 77.1610 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Thekkady+Kerala",
    baseCosts: { transport: 1900, accommodation: 1100, food: 650, activities: 600 },
    perDayCosts: { accommodation: 1100, food: 650, activities: 600 },
    transport: [{ mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Train + bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹450–₹900/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,200–₹2,400/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,700–₹3,500/night", capacity: "Capacity varies by property" }],
    attractions: ["Periyar Tiger Reserve", "Periyar Lake", "Spice plantations", "Kumily"],
    itinerary: [
      { title: "Arrive and explore Kumily", description: "Check in and explore the local town.", activities: ["Kumily market", "Spice garden", "Local food"] },
      { title: "Forest and lake", description: "Choose an official Periyar activity subject to availability.", activities: ["Periyar Tiger Reserve", "Periyar Lake", "Nature interpretation centre"] },
      { title: "Plantation morning and return", description: "Enjoy a final plantation visit before returning.", activities: ["Spice plantation", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "kumarakom", name: "Kumarakom", state: "Kerala",
    categories: ["Forests", "Beaches"],
    summary: "A backwater village with lake views, birdlife and tranquil waterways.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=85",
    coordinates: { lat: 9.6175, lng: 76.4300 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kumarakom+Kerala",
    baseCosts: { transport: 1600, accommodation: 1300, food: 700, activities: 650 },
    perDayCosts: { accommodation: 1300, food: 700, activities: 650 },
    transport: [{ mode: "Train + taxi", priceRange: "Varies by origin; check current fares" }, { mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹500–₹1,000/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,500–₹3,000/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,800–₹4,000/night", capacity: "Capacity varies by property" }],
    attractions: ["Vembanad Lake", "Kumarakom Bird Sanctuary", "Backwater canals", "Pathiramanal Island"],
    itinerary: [
      { title: "Arrive by the lake", description: "Settle in and explore the waterfront.", activities: ["Vembanad Lake", "Village walk", "Sunset"] },
      { title: "Bird sanctuary and backwaters", description: "Explore the bird sanctuary and waterways.", activities: ["Kumarakom Bird Sanctuary", "Backwater cruise", "Local village"] },
      { title: "Relaxed morning and return", description: "Enjoy a final lakeside morning.", activities: ["Lake view", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "bekal", name: "Bekal", state: "Kerala",
    categories: ["Beaches", "Heritage"],
    summary: "A coastal destination combining a historic fort with Arabian Sea views.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    coordinates: { lat: 12.3915, lng: 75.0340 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bekal+Kerala",
    baseCosts: { transport: 1900, accommodation: 1000, food: 650, activities: 450 },
    perDayCosts: { accommodation: 1000, food: 650, activities: 450 },
    transport: [{ mode: "Train", priceRange: "Varies by origin; check current fares" }, { mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹450–₹900/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,200–₹2,500/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,600–₹3,200/night", capacity: "Capacity varies by property" }],
    attractions: ["Bekal Fort", "Bekal Beach", "Kappil Beach", "Chandragiri Fort"],
    itinerary: [
      { title: "Arrive and explore the fort", description: "Visit the historic fort and nearby coast.", activities: ["Bekal Fort", "Bekal Beach", "Sunset"] },
      { title: "Coastal exploration", description: "Explore nearby beaches and viewpoints.", activities: ["Kappil Beach", "Chandragiri Fort", "Coastal drive"] },
      { title: "Morning by the sea and return", description: "Enjoy a final coastal stop before returning.", activities: ["Beach walk", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "athirappilly", name: "Athirappilly", state: "Kerala",
    categories: ["Waterfalls", "Forests", "Adventure"],
    summary: "A forested landscape known for its dramatic waterfall and river scenery.",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1000&q=85",
    coordinates: { lat: 10.2850, lng: 76.5690 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Athirappilly+Kerala",
    baseCosts: { transport: 1600, accommodation: 1000, food: 650, activities: 500 },
    perDayCosts: { accommodation: 1000, food: 650, activities: 500 },
    transport: [{ mode: "Bus + local transfer", priceRange: "Varies by origin; check current fares" }, { mode: "Train + taxi", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹450–₹900/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,200–₹2,500/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,600–₹3,200/night", capacity: "Capacity varies by property" }],
    attractions: ["Athirappilly Falls", "Vazhachal Falls", "Thumboormuzhi Dam", "Sholayar region"],
    itinerary: [
      { title: "Arrive and visit the falls", description: "Check access conditions and explore the waterfall area.", activities: ["Athirappilly Falls", "River viewpoint", "Local market"] },
      { title: "Forest and river scenery", description: "Explore nearby nature attractions where access is permitted.", activities: ["Vazhachal Falls", "Thumboormuzhi Dam", "Scenic drive"] },
      { title: "Slow morning and return", description: "Enjoy breakfast and return journey.", activities: ["Nature walk", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "marari", name: "Marari Beach", state: "Kerala",
    categories: ["Beaches"],
    summary: "A quieter coastal stretch near Alappuzha known for a relaxed beach atmosphere.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    coordinates: { lat: 9.6020, lng: 76.2990 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Marari+Beach+Kerala",
    baseCosts: { transport: 1600, accommodation: 1100, food: 650, activities: 400 },
    perDayCosts: { accommodation: 1100, food: 650, activities: 400 },
    transport: [{ mode: "Train + taxi", priceRange: "Varies by origin; check current fares" }, { mode: "Bus", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹500–₹1,000/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,300–₹2,600/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,800–₹3,500/night", capacity: "Capacity varies by property" }],
    attractions: ["Marari Beach", "Fishing villages", "Alappuzha backwaters", "Local coastal markets"],
    itinerary: [
      { title: "Arrive and unwind", description: "Settle in and enjoy the beach.", activities: ["Marari Beach", "Fishing village walk", "Sunset"] },
      { title: "Coast and backwaters", description: "Explore nearby coastal and backwater scenery.", activities: ["Beach morning", "Backwater area", "Local market"] },
      { title: "Morning by the beach and return", description: "Enjoy a final beach visit before returning.", activities: ["Beach walk", "Breakfast", "Return journey"] }
    ]
  },
  {
    id: "cherai", name: "Cherai Beach", state: "Kerala",
    categories: ["Beaches"],
    summary: "A sandy beach destination on Vypin Island near Kochi.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    coordinates: { lat: 10.1380, lng: 76.1780 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cherai+Beach+Kerala",
    baseCosts: { transport: 1400, accommodation: 1000, food: 650, activities: 400 },
    perDayCosts: { accommodation: 1000, food: 650, activities: 400 },
    transport: [{ mode: "Bus + ferry", priceRange: "Varies by origin; check current fares" }, { mode: "Train + taxi", priceRange: "Varies by origin; check current fares" }, { mode: "Car", priceRange: "Estimate based on route and vehicle" }],
    accommodation: [{ type: "Hostel / dorm", priceRange: "₹450–₹900/night", capacity: "Shared rooms; capacity varies" }, { type: "Budget hotel", priceRange: "₹1,200–₹2,400/night", capacity: "Usually 2–3 guests/room" }, { type: "Homestay", priceRange: "₹1,600–₹3,200/night", capacity: "Capacity varies by property" }],
    attractions: ["Cherai Beach", "Munambam fishing harbour", "Pallipuram Fort", "Kuzhuppilly Beach"],
    itinerary: [
      { title: "Arrive at Cherai", description: "Settle in and explore the beach.", activities: ["Cherai Beach", "Coastal walk", "Sunset"] },
      { title: "Explore nearby coast", description: "Visit nearby coastal attractions.", activities: ["Munambam harbour", "Pallipuram Fort", "Kuzhuppilly Beach"] },
      { title: "Morning and return", description: "Enjoy a final beach visit before returning.", activities: ["Beach walk", "Breakfast", "Return journey"] }
    ]
  }
];

module.exports = destinations;