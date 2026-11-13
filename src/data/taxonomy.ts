import type { City, Specialty } from "./types";

export const cities: City[] = [
  { id: "indore", slug: "indore", name: "Indore", state: "Madhya Pradesh", isMetro: true },
  { id: "bengaluru", slug: "bengaluru", name: "Bengaluru", state: "Karnataka", isMetro: true },
  { id: "mumbai", slug: "mumbai", name: "Mumbai", state: "Maharashtra", isMetro: true },
  { id: "delhi", slug: "delhi", name: "Delhi NCR", state: "Delhi", isMetro: true },
  { id: "hyderabad", slug: "hyderabad", name: "Hyderabad", state: "Telangana", isMetro: true },
  { id: "chennai", slug: "chennai", name: "Chennai", state: "Tamil Nadu", isMetro: true },
  { id: "pune", slug: "pune", name: "Pune", state: "Maharashtra", isMetro: true },
  { id: "kolkata", slug: "kolkata", name: "Kolkata", state: "West Bengal", isMetro: true },
  { id: "jaipur", slug: "jaipur", name: "Jaipur", state: "Rajasthan", isMetro: false },
  { id: "ahmedabad", slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", isMetro: false },
  { id: "kochi", slug: "kochi", name: "Kochi", state: "Kerala", isMetro: false },
];

export const specialties: Specialty[] = [
  {
    id: "general",
    slug: "general-practice",
    name: "General Practice",
    tagline: "Everyday checkups & care",
    description:
      "Routine health exams, minor illnesses, wound care and overall wellness for pets and small animals.",
    icon: "paw",
  },
  {
    id: "surgery",
    slug: "surgery",
    name: "Surgery",
    tagline: "Soft-tissue & general surgery",
    description:
      "Sterilisation, tumour removal, caesarean sections and other general soft-tissue procedures.",
    icon: "scissors",
  },
  {
    id: "emergency",
    slug: "emergency-care",
    name: "Emergency & Critical Care",
    tagline: "Round-the-clock rescue",
    description:
      "24/7 handling of accidents, poisoning, heatstroke, bloat and other life-threatening situations.",
    icon: "siren",
  },
  {
    id: "dentistry",
    slug: "dentistry",
    name: "Dentistry",
    tagline: "Teeth & oral health",
    description:
      "Scaling, extractions, oral tumour screening and treatment of gum disease in dogs and cats.",
    icon: "tooth",
  },
  {
    id: "dermatology",
    slug: "dermatology",
    name: "Dermatology",
    tagline: "Skin, coat & allergies",
    description:
      "Itching, mange, fungal infections, food allergies and chronic skin conditions.",
    icon: "drop",
  },
  {
    id: "orthopedics",
    slug: "orthopedics",
    name: "Orthopedics",
    tagline: "Bones, joints & mobility",
    description:
      "Fracture repair, hip dysplasia management, ACL injuries and joint surgeries.",
    icon: "bone",
  },
  {
    id: "internal",
    slug: "internal-medicine",
    name: "Internal Medicine",
    tagline: "Complex diagnostics",
    description:
      "Kidney, liver, cardiac and endocrine disorders managed with specialist-level diagnostics.",
    icon: "stethoscope",
  },
  {
    id: "ophthalmology",
    slug: "ophthalmology",
    name: "Ophthalmology",
    tagline: "Eye care",
    description:
      "Cataract surgery, corneal ulcers, glaucoma and other eye conditions.",
    icon: "eye",
  },
  {
    id: "vaccination",
    slug: "preventive-care",
    name: "Preventive Care & Vaccination",
    tagline: "Stay ahead of illness",
    description:
      "Vaccination schedules, deworming, tick prevention and wellness screenings.",
    icon: "shield",
  },
  {
    id: "exotics",
    slug: "avian-exotics",
    name: "Avian & Exotic Pets",
    tagline: "Birds, rabbits & more",
    description:
      "Care for birds, rabbits, guinea pigs, hamsters, turtles and other exotic companions.",
    icon: "bird",
  },
  {
    id: "physiotherapy",
    slug: "physiotherapy",
    name: "Physiotherapy & Rehab",
    tagline: "Recover & move well",
    description:
      "Post-surgical rehab, arthritis management, hydrotherapy and pain relief programmes.",
    icon: "wave",
  },
  {
    id: "imaging",
    slug: "diagnostic-imaging",
    name: "Diagnostic Imaging",
    tagline: "See inside clearly",
    description:
      "Digital X-ray, ultrasound, and in-house laboratory testing for faster answers.",
    icon: "scan",
  },
  {
    id: "cardiology",
    slug: "cardiology",
    name: "Cardiology",
    tagline: "Heart & circulation",
    description:
      "Heart murmurs, arrhythmias, congestive heart failure and blood-pressure management.",
    icon: "heart",
  },
  {
    id: "gastroenterology",
    slug: "gastroenterology",
    name: "Gastroenterology",
    tagline: "Gut, liver & nutrition",
    description:
      "Vomiting, diarrhoea, pancreatitis, liver disease and dietary sensitivity work-ups.",
    icon: "stomach",
  },
  {
    id: "neurology",
    slug: "neurology",
    name: "Neurology",
    tagline: "Brain, nerves & seizures",
    description:
      "Seizures, vestibular disease, spinal injuries and other nervous-system disorders.",
    icon: "brain",
  },
  {
    id: "oncology",
    slug: "oncology",
    name: "Oncology",
    tagline: "Tumour care & comfort",
    description:
      "Tumour assessment, chemotherapy protocols and palliative care planning.",
    icon: "ribbon",
  },
  {
    id: "gynaecology",
    slug: "gynaecology-obstetrics",
    name: "Gynaecology & Obstetrics",
    tagline: "Reproduction & whelping",
    description:
      "Breeding support, pregnancy monitoring, caesareans and reproductive health.",
    icon: "venus",
  },
];
