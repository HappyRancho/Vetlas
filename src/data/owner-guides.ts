export const ownerArticles = [
  {
    slug: "understanding-pet-behaviour", title: "Understanding pet behaviour", icon: "brain",
    description: "Learn what to record when your dog or cat’s behaviour changes and how to prepare for a veterinary visit.",
    sections: [
      { title: "What changed?", text: "Describe what your pet did, where it happened and what came just before it. For example, a dog that growls when picked up gives a vet more information than a label like “aggressive”. Note changes in sleep, appetite, mobility and toileting as well." },
      { title: "What should I bring to the appointment?", text: "Bring a timeline, your pet’s usual routine and a list of medicines. A short video of behaviour that happens naturally can help. Give your pet space and avoid recreating a frightening situation to film it." },
      { title: "When should I call a vet?", text: "Call about a sudden change, especially if your pet also seems painful, confused or unwell. A veterinarian can check for a physical cause and discuss a behaviour referral. If someone is at risk of a bite, keep people and other animals at a safe distance." }
    ],
    source: "AAHA canine and feline behaviour management guidelines", sourceUrl: "https://www.aaha.org/resources/2015-aaha-canine-and-feline-behavior-management-guidelines/",
    next: "Find a general practice", nextUrl: "/specialties/general-practice/"
  },
  {
    slug: "pet-nutrition-basics", title: "Pet nutrition basics", icon: "stomach",
    description: "Prepare a food history for your dog or cat and ask your veterinarian about portions, life stage and changes in weight.",
    sections: [
      { title: "What does my pet eat in a day?", text: "Record a typical day of meals, treats, table scraps and supplements. Include the product name and the amount actually eaten. Photograph food labels and note who else feeds your pet." },
      { title: "How do I choose a food and portion?", text: "Ask whether the food is complete and balanced for your pet’s species and life stage. Bring the feeding guide on the packet and your pet’s recent weights. Your vet can use body condition, activity and health to suggest a starting portion and a date to check progress." },
      { title: "What changes should I mention?", text: "Tell the clinic about weight loss or gain, thirst, appetite, vomiting or changes in stools. Call promptly if your pet stops eating or appears unwell. Ask before starting a restrictive diet, especially for a growing animal or one with a medical condition." }
    ],
    source: "WSAVA global nutrition guidelines and owner resources", sourceUrl: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
    next: "Find a veterinary clinic", nextUrl: "/clinics/"
  }
];

export const guideTopics = [
  ...ownerArticles.map(a => ({label:a.title, icon:a.icon, href:`/care-guide/${a.slug}/`})),
  {label:"Specialist referrals", icon:"stethoscope", href:"/care-guide/#referral"},
  {label:"Teaching hospitals", icon:"hospital", href:"/care-guide/#teaching"},
  {label:"Private care networks", icon:"building", href:"/care-guide/#networks"},
  {label:"Wildlife & rescue", icon:"bird", href:"/care-guide/#rescue"}
];
