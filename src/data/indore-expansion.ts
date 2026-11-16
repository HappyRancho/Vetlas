import type { Provider } from './types';
const checked = '2026-11-15';
const royal = 'https://www.royalveterinaryclinic.shop/contact';
export const additionalIndoreProviders: Provider[] = [
  {
    id: 'pet-matrix-nipania', slug: 'pet-matrix-tulsi-nagar', name: 'Pet Matrix Pet Clinic & Pet Shop',
    type: 'clinic', cityId: 'indore', area: 'Tulsi Nagar / Nipania',
    address: 'Shop 412-AA, Tulsi Nagar Main Road, near Saraswati Mandir and Bombay Hospital, Indore 452010',
    phone: '+919424091153', hours: {},
    hoursNote: 'Clinic website: Mon–Sat 6:30–9:30 PM; Sun 11 AM–1 PM. Confirm before visiting.',
    specialtyIds: ['general', 'surgery'], species: [], services: ['Consultation', 'Major and minor surgery', 'Corrective surgery'], amenities: [],
    verified: false, dataSource: 'public', lastChecked: checked,
    about: 'The clinic website lists 412-AA and surgical services. A conflicting third-party street number remains in our research history. Bird and exotic-pet expertise has not been confirmed; ask the clinic before visiting. No consultation fee was found.',
    sources: { website: 'https://petmatrixclinic.com/', googleMaps: 'https://www.google.com/maps/search/?api=1&query=Pet+Matrix+412+AA+Tulsi+Nagar+Indore' },
    evidence: [{ label: 'Clinic website (JavaScript rendered): address, phone, weekly hours and surgery services', url: 'https://petmatrixclinic.com/' }, { label: 'Reddit avian-care discussion; not confirmation of species expertise', url: 'https://www.reddit.com/r/Indore/comments/1llslm8' }],
  },
  ...([
    { id: 'indore-royal-ganeshganj', slug: 'royal-vet-clinic-ganeshganj', branch: 'Ganeshganj', area: 'Ganeshganj / Raj Mohalla', address: '55, Ganeshganj, near Antim Square, Raj Mohalla, Indore', lat: 22.7186253, lng: 75.8409981, hoursNote: 'Clinic website: Mon–Sat 10 AM–9 PM; doctor 10 AM–2 PM and 6–9 PM. Sunday availability not listed.' },
    { id: 'indore-royal-kesharbagh', slug: 'royal-vet-clinic-kesharbagh', branch: 'Kesharbagh Road', area: 'Kesharbagh Road', address: 'G-42A, in front of Palash Parisar, Kesharbagh Road, Indore 452009', lat: 22.6788412, lng: 75.8418031, hoursNote: 'Clinic website: Mon–Sun 10 AM–9 PM; doctor 2–5 PM. Call to confirm the doctor is available.' },
  ].map(branch => ({
    id: branch.id, slug: branch.slug, name: `Royal Veterinary Clinic — ${branch.branch}`, type: 'clinic' as const,
    cityId: 'indore', area: branch.area, address: branch.address, phone: '+918770793826', hours: {}, hoursNote: branch.hoursNote,
    specialtyIds: ['general', 'vaccination'], species: ['dog', 'cat'], services: ['Consultation', 'Vaccination'], amenities: [],
    verified: false, dataSource: 'public' as const, lastChecked: checked,
    about: 'This branch is listed on the Royal Veterinary Clinic website. The network also advertises surgery, pathology and dental scaling; confirm their availability at this branch. Clinic opening hours and doctor hours differ. Consultation fees have not been confirmed.',
    coordinates: { lat: branch.lat, lng: branch.lng }, coordinateSource: royal,
    sources: { website: royal, googleMaps: `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}` },
    evidence: [{ label: 'Clinic contact page: branch address, phone, doctor hours and map coordinates', url: royal }, { label: 'Network service list; confirm branch availability', url: 'https://www.royalveterinaryclinic.shop/services' }],
  }))),
  {
    id: 'indore-happy-tails-navlakha', slug: 'happy-tails-navlakha', name: 'Happy Tails Pet Clinic', type: 'clinic', cityId: 'indore', area: 'Janki Nagar / Navlakha',
    address: 'Shop 6, ground floor, Ish Kripa Complex, near Jankinath Mandir, 111 Janki Nagar, Navlakha, Indore 452001',
    phone: '+919244089800', hours: {}, hoursNote: 'Clinic website: Mon–Sat 10 AM–9 PM; Sun 1–4 PM. Confirm before visiting.',
    specialtyIds: ['general', 'vaccination'], species: ['dog', 'cat'], services: ['Consultation', 'Wellness checkups', 'Vaccination', 'Nutrition guidance'], amenities: [],
    verified: false, dataSource: 'public', lastChecked: checked,
    about: 'The Navlakha clinic website describes consultations, preventive care and nutrition guidance. The reviewed pages do not publish a consultation charge. Clinic claims about experience and online ratings have not been independently verified.',
    sources: { website: 'https://www.happytailspet-clinic.com/', googleMaps: 'https://maps.google.com/?q=Happy+Tails+Pet+Clinic+Indore' },
    evidence: [{ label: 'Clinic contact page: address, phone and weekly hours', url: 'https://www.happytailspet-clinic.com/contact' }, { label: 'Clinic service descriptions', url: 'https://www.happytailspet-clinic.com/services' }],
  },
];
