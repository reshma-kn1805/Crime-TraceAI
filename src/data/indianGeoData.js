/**
 * CrimeTraceAI — Indian Geographic & Cybercrime Regional Data
 * Coordinates, incident counts, hotspot ratings, and Cyber Police Unit stations.
 */

export const INDIAN_STATES_REGIONS = [
  {
    id: 'MH',
    name: 'Maharashtra',
    center: [19.7515, 75.7139],
    zoom: 6,
    incidentCount: 1482,
    topThreat: 'Financial Fraud & UPI Scams',
    lossINR: 42800000,
    cities: [
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, cases: 840, hub: 'BKC Cyber Police Station' },
      { name: 'Pune', lat: 18.5204, lng: 73.8567, cases: 410, hub: 'Shivajinagar Cyber Cell' },
      { name: 'Nagpur', lat: 21.1458, lng: 79.0882, cases: 232, hub: 'Nagpur City Cyber Wing' }
    ]
  },
  {
    id: 'KA',
    name: 'Karnataka',
    center: [15.3173, 75.7139],
    zoom: 6,
    incidentCount: 1290,
    topThreat: 'Part-Time Job & Telegram Task Fraud',
    lossINR: 38500000,
    cities: [
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, cases: 1080, hub: 'CID Cyber Crime Police Station (Infantry Rd)' },
      { name: 'Mysuru', lat: 12.2958, lng: 76.6394, cases: 140, hub: 'Mysuru Cyber Cell' },
      { name: 'Mangaluru', lat: 12.9141, lng: 74.8560, cases: 70, hub: 'Dakshina Kannada Cyber Wing' }
    ]
  },
  {
    id: 'DL',
    name: 'Delhi NCR',
    center: [28.6139, 77.2090],
    zoom: 9,
    incidentCount: 1620,
    topThreat: 'Digital Arrest & CBI Impersonation',
    lossINR: 54100000,
    cities: [
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090, cases: 920, hub: 'Special Cell IFSO (Dwarka)' },
      { name: 'Noida (UP-NCR)', lat: 28.5355, lng: 77.3910, cases: 420, hub: 'Sector 36 Cyber Crime Police Station' },
      { name: 'Gurugram (HR-NCR)', lat: 28.4595, lng: 77.0266, cases: 280, hub: 'Cyber Crime Police Station East' }
    ]
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    center: [11.1271, 78.6569],
    zoom: 6,
    incidentCount: 940,
    topThreat: 'Aadhaar AePS & Phishing Portals',
    lossINR: 26400000,
    cities: [
      { name: 'Chennai', lat: 13.0827, lng: 80.2707, cases: 620, hub: 'Greater Chennai CCB Cyber Cell' },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, cases: 210, hub: 'Coimbatore City Cyber Wing' },
      { name: 'Madurai', lat: 9.9252, lng: 78.1198, cases: 110, hub: 'Madurai Cyber Crime Unit' }
    ]
  },
  {
    id: 'TG',
    name: 'Telangana',
    center: [18.1124, 79.0193],
    zoom: 6,
    incidentCount: 1110,
    topThreat: 'Fake Investment Trading Apps',
    lossINR: 33700000,
    cities: [
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, cases: 890, hub: 'TGCSB (Telangana Cyber Security Bureau)' },
      { name: 'Cyberabad', lat: 17.4399, lng: 78.3489, cases: 220, hub: 'Gachibowli Cyber Wing' }
    ]
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    center: [22.2587, 71.1924],
    zoom: 6,
    incidentCount: 880,
    topThreat: 'Micro-Loan Extortion & Blackmail',
    lossINR: 21900000,
    cities: [
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, cases: 540, hub: 'CID Crime Cyber Police Station' },
      { name: 'Surat', lat: 21.1702, lng: 72.8311, cases: 340, hub: 'Surat Cyber Crime Cell' }
    ]
  },
  {
    id: 'WB',
    name: 'West Bengal',
    center: [22.9868, 87.8550],
    zoom: 6,
    incidentCount: 810,
    topThreat: 'Call Center Tech Support Impersonation',
    lossINR: 24200000,
    cities: [
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639, cases: 590, hub: 'Lalbazar Cyber Crime PS' },
      { name: 'Salt Lake', lat: 22.5868, lng: 88.4178, cases: 220, hub: 'Bidhannagar Cyber Cell' }
    ]
  },
  {
    id: 'JH',
    name: 'Jharkhand (Mule Hub)',
    center: [23.6102, 85.2799],
    zoom: 6,
    incidentCount: 650,
    topThreat: 'SIM Swap & Direct Bank Phishing',
    lossINR: 19800000,
    cities: [
      { name: 'Jamtara', lat: 23.9629, lng: 86.8021, cases: 410, hub: 'Jamtara Cyber Crime Unit' },
      { name: 'Ranchi', lat: 23.3441, lng: 85.3096, cases: 240, hub: 'Ranchi Cyber Cell' }
    ]
  },
  {
    id: 'RJ',
    name: 'Rajasthan (Mewat Region)',
    center: [27.0238, 74.2179],
    zoom: 6,
    incidentCount: 790,
    topThreat: 'Sextortion & Fake OLX Army Officer Scam',
    lossINR: 22400000,
    cities: [
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873, cases: 480, hub: 'Jaipur Cyber Police Station' },
      { name: 'Bharatpur', lat: 27.2152, lng: 77.5030, cases: 310, hub: 'Bharatpur Cyber Cell (Mewat Hub)' }
    ]
  },
  {
    id: 'KL',
    name: 'Kerala',
    center: [10.8505, 76.2711],
    zoom: 6,
    incidentCount: 620,
    topThreat: 'Foreign Job & Visa Processing Fraud',
    lossINR: 17500000,
    cities: [
      { name: 'Kochi', lat: 9.9312, lng: 76.2673, cases: 380, hub: 'Ernakulam Cyber Police Station' },
      { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366, cases: 240, hub: 'Cyberdome Police Headquarters' }
    ]
  }
];

export const INDIA_MAP_DEFAULT_CENTER = [21.5, 79.5];
export const INDIA_MAP_DEFAULT_ZOOM = 5;
