// ============================================================
// RUTE SERU - Data Trip, Destinasi, Testimoni, Galeri
// Edit data di file ini saja, gampang banget!
// ============================================================

export type Region = 'Jawa' | 'Sumatera' | 'Sulawesi' | 'One Day Trip';

export interface Trip {
  id: string;
  slug: string;
  name: string;
  destination: string;
  region: Region;
  startDate: string;
  endDate: string;
  durationDays: number;
  price: number;
  totalSeats: number;
  filledSeats: number;
  popular?: boolean;
  image: string;
  includes: string[];
  excludes: string[];
  highlights: string[];
  mepoInfo?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  island: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  mapX: number;
  mapY: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  text: string;
  photo: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  image: string;
  caption: string;
  span: 'tall' | 'wide' | 'normal';
}

// ============================================================
// KONTAK
// ============================================================
export const CONTACTS = {
  melina: { name: 'Melina', phone: '0813-2636-1508', wa: '6281326361508' },
  maria: { name: 'Maria', phone: '0813-2636-1508', wa: '6281326361508' },
  ig: '@ruteseru',
  tiktok: 'ruteseru',
  email: 'halo@ruteseru.id',
  mepo: 'Jl. Kramat 5 No. 8, Jakarta Pusat',
  mepoNote:
    'Lokasi Mepo nyaman, dekat angkot, busway, stasiun, ada parkir murah. Kumpul jam 23:30 WIB.',
};

// ============================================================
// TRIPS
// ============================================================
export const TRIPS: Trip[] = [
  {
    id: 'pacitan-sep26',
    slug: 'pacitan',
    name: 'Pacitan Beach Adventure',
    destination: 'Pacitan, Jawa Timur',
    region: 'Jawa',
    startDate: '2026-09-18',
    endDate: '2026-09-20',
    durationDays: 3,
    price: 1100,
    totalSeats: 14,
    filledSeats: 13,
    popular: true,
    image: 'https://images.pexels.com/photos/17863794/pexels-photo-17863794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribadi', 'Spot Optional', 'Asuransi'],
    highlights: ['Pantai Srau', 'Goa Gong', 'Sunset Klayar', 'Suweru House'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 23:30',
  },
  {
    id: 'kebumen-okt26',
    slug: 'kebumen',
    name: 'Kebumen Hidden Paradise',
    destination: 'Kebumen, Jawa Tengah',
    region: 'Jawa',
    startDate: '2026-10-23',
    endDate: '2026-10-25',
    durationDays: 3,
    price: 970,
    totalSeats: 14,
    filledSeats: 8,
    image: 'https://images.pexels.com/photos/15596907/pexels-photo-15596907.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribadi', 'Spot Optional'],
    highlights: ['Pantai Logending', 'Goa Jatijajar', 'Benteng Van Der Wijck'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 23:30',
  },
  {
    id: 'purwakarta-1day',
    slug: 'purwakarta',
    name: 'Purwakarta One Day Trip',
    destination: 'Purwakarta, Jawa Barat',
    region: 'One Day Trip',
    startDate: '2026-11-08',
    endDate: '2026-11-08',
    durationDays: 1,
    price: 366,
    totalSeats: 20,
    filledSeats: 12,
    popular: true,
    image: 'https://images.pexels.com/photos/27808775/pexels-photo-27808775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribadi', 'Spot Optional'],
    highlights: ['Situ Bagendit', 'Waduk Jatiluhur', 'Curug Cipurut'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 05:00',
  },
  {
    id: 'karimunjawa-nov26',
    slug: 'karimunjawa',
    name: 'Karimun Jawa Island Hopping',
    destination: 'Karimun Jawa, Jawa Tengah',
    region: 'Jawa',
    startDate: '2026-11-20',
    endDate: '2026-11-23',
    durationDays: 4,
    price: 1850,
    totalSeats: 16,
    filledSeats: 10,
    popular: true,
    image: 'https://images.pexels.com/photos/9149273/pexels-photo-9149273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Kapal Ferry PP', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi', 'Snorkeling'],
    excludes: ['Makan pribidi', 'Tiket Pesawat ke Semarang', 'Spot Optional'],
    highlights: ['Main sama hiu kecil', 'Snorkeling Menjangan', 'Sunset Bukit Annora', 'Pulau Menjangan Besar'],
    mepoInfo: 'Kumpul Bandara Semarang 08:00',
  },
  {
    id: 'pahawang-des26',
    slug: 'pahawang',
    name: 'Pulau Pahawang Lampung',
    destination: 'Pahawang, Lampung',
    region: 'Sumatera',
    startDate: '2026-12-12',
    endDate: '2026-12-14',
    durationDays: 3,
    price: 1450,
    totalSeats: 14,
    filledSeats: 6,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Kapal PP', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi', 'Snorkeling'],
    excludes: ['Makan pribidi', 'Tiket Pesawat ke Lampung', 'Spot Optional'],
    highlights: ['Kayak Transparan', 'Snorkeling Pulau Kelagian', 'Sand Island', 'Sunset Tanjung Ringgit'],
    mepoInfo: 'Kumpul Bandara Lampung 09:00',
  },
  {
    id: 'dieng-des26',
    slug: 'dieng',
    name: 'Dieng Golden Sunrise',
    destination: 'Dieng, Jawa Tengah',
    region: 'Jawa',
    startDate: '2026-12-27',
    endDate: '2026-12-28',
    durationDays: 2,
    price: 780,
    totalSeats: 16,
    filledSeats: 4,
    image: 'https://images.pexels.com/photos/37701936/pexels-photo-37701936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribadi', 'Spot Optional'],
    highlights: ['Sikunir Sunrise', 'Kawah Sikidang', 'Telaga Warna', 'Candi Arjuna'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 22:00',
  },
  {
    id: 'sebesi-jan27',
    slug: 'sebesi',
    name: 'Sebesi Island Escape',
    destination: 'Pulau Sebesi, Lampung',
    region: 'Sumatera',
    startDate: '2027-01-15',
    endDate: '2027-01-17',
    durationDays: 3,
    price: 1350,
    totalSeats: 14,
    filledSeats: 3,
    image: 'https://images.pexels.com/photos/1731791/pexels-photo-1731791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['Kapal PP', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi', 'Snorkeling'],
    excludes: ['Makan pribidi', 'Tiket Pesawat ke Lampung'],
    highlights: ['Pantai Krakatau', 'Snorkeling', 'Hiking Gunung Anak Krakatau', 'Sunset Pantai'],
    mepoInfo: 'Kumpul Bandara Lampung 08:00',
  },
  {
    id: 'garut-feb27',
    slug: 'garut',
    name: 'Garut Hot Spring & Hills',
    destination: 'Garut, Jawa Barat',
    region: 'Jawa',
    startDate: '2027-02-06',
    endDate: '2027-02-07',
    durationDays: 2,
    price: 650,
    totalSeats: 18,
    filledSeats: 5,
    image: 'https://images.pexels.com/photos/2287309/pexels-photo-2287309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribidi', 'Spot Optional'],
    highlights: ['Pemandian Air Panas Cipanas', 'Curug Orok', 'Situ Bagendit', 'Kampung Adat'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 23:30',
  },
  {
    id: 'guci-mar27',
    slug: 'guci',
    name: 'Guci Hot Spring Retreat',
    destination: 'Guci, Jawa Tengah',
    region: 'Jawa',
    startDate: '2027-03-13',
    endDate: '2027-03-14',
    durationDays: 2,
    price: 720,
    totalSeats: 16,
    filledSeats: 2,
    image: 'https://images.pexels.com/photos/18562255/pexels-photo-18562255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Homestay Sharing', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribidi', 'Spot Optional'],
    highlights: ['Pemandian Air Panas Guci', 'Curug Cipendawa', 'Bukit Sidengkeng'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 23:00',
  },
  {
    id: 'umangumang-mar27',
    slug: 'umang-umang',
    name: 'Umang-Umang Beach Camp',
    destination: 'Umang-Umang, Banten',
    region: 'Jawa',
    startDate: '2027-03-28',
    endDate: '2027-03-29',
    durationDays: 2,
    price: 590,
    totalSeats: 18,
    filledSeats: 7,
    image: 'https://images.pexels.com/photos/11039532/pexels-photo-11039532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    includes: ['AC Minivan', 'Tenda/Cottage', 'Tiket Wisata', 'Tour Leader', 'Dokumentasi'],
    excludes: ['Makan pribidi', 'Spot Optional'],
    highlights: ['Beach Camping', 'Snorkeling', 'Sunrise Bukit', 'Bonfire Night'],
    mepoInfo: 'Jl. Kramat 5 No. 8 JakPus, kumpul 05:00',
  },
];

// ============================================================
// DESTINASI
// ============================================================
export const DESTINATIONS: Destination[] = [
  {
    id: 'karimunjawa',
    slug: 'karimunjawa',
    name: 'Karimun Jawa',
    region: 'Jawa Tengah',
    island: 'Jawa',
    image: 'https://images.pexels.com/photos/9149273/pexels-photo-9149273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/9149273/pexels-photo-9149273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2121302/pexels-photo-2121302.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Surgeon mini di Karimun Jawa, snorkeling crystal clear, sunset Bukit Annora. Surga tropis 27 pulau di utara Jawa!',
    highlights: ['Main sama hiu kecil', 'Snorkeling Menjangan', 'Sunset Bukit Annora', 'Pulau Menjangan Besar'],
    mapX: 52,
    mapY: 42,
  },
  {
    id: 'pahawang',
    slug: 'pahawang',
    name: 'Pulau Pahawang',
    region: 'Lampung',
    island: 'Sumatera',
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3535916/pexels-photo-3535916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1731791/pexels-photo-1731791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Kayak transparan di air tosca, snorkeling Pulau Kelagian, sand island pasang surut. Pesona Lampung yang bikin nagih!',
    highlights: ['Kayak Transparan', 'Snorkeling Kelagian', 'Sand Island', 'Sunset Tanjung Ringgit'],
    mapX: 38,
    mapY: 55,
  },
  {
    id: 'umangumang',
    slug: 'umang-umang',
    name: 'Umang-Umang',
    region: 'Banten',
    island: 'Jawa',
    image: 'https://images.pexels.com/photos/11039532/pexels-photo-11039532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/11039532/pexels-photo-11039532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11186280/pexels-photo-11186280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17863794/pexels-photo-17863794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Beach camping di pulau tersembunyi Banten. Snorkeling, bonfire, dan sunrise dari bukit. Hemat tapi seru!',
    highlights: ['Beach Camping', 'Snorkeling', 'Sunrise Bukit', 'Bonfire Night'],
    mapX: 43,
    mapY: 48,
  },
  {
    id: 'sebesi',
    slug: 'sebesi',
    name: 'Pulau Sebesi',
    region: 'Lampung',
    island: 'Sumatera',
    image: 'https://images.pexels.com/photos/1731791/pexels-photo-1731791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1731791/pexels-photo-1731791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/16156054/pexels-photo-16156054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31460035/pexels-photo-31460035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Pulau terdekat dari Anak Krakatau. Hiking, snorkeling, dan lihat langsung gunung berapi aktif dari jarak dekat!',
    highlights: ['Pantai Krakatau', 'Snorkeling', 'Hiking Anak Krakatau', 'Sunset Pantai'],
    mapX: 40,
    mapY: 53,
  },
  {
    id: 'pacitan',
    slug: 'pacitan',
    name: 'Pacitan',
    region: 'Jawa Timur',
    island: 'Jawa',
    image: 'https://images.pexels.com/photos/17863794/pexels-photo-17863794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17863794/pexels-photo-17863794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/35308345/pexels-photo-35308345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/34127856/pexels-photo-34127856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Kota 1001 Goa. Pantai Srau yang eksotis, Goa Gong megah, dan Sunset Klayar yang bikin merinding. Wajib visit!',
    highlights: ['Pantai Srau', 'Goa Gong', 'Sunset Klayar', 'Suweru House'],
    mapX: 58,
    mapY: 56,
  },
  {
    id: 'dieng',
    slug: 'dieng',
    name: 'Dieng',
    region: 'Jawa Tengah',
    island: 'Jawa',
    image: 'https://images.pexels.com/photos/37701936/pexels-photo-37701936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/37701936/pexels-photo-37701936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4649742/pexels-photo-4649742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2287309/pexels-photo-2287309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Negeri di atas awan. Golden sunrise Sikunir, kawah berapi, telaga warna-warni. Dingin tapi hati hangat!',
    highlights: ['Sikunir Sunrise', 'Kawah Sikidang', 'Telaga Warna', 'Candi Arjuna'],
    mapX: 54,
    mapY: 50,
  },
  {
    id: 'garut',
    slug: 'garut',
    name: 'Garut',
    region: 'Jawa Barat',
    island: 'Jawa',
    image: 'https://images.pexels.com/photos/2287309/pexels-photo-2287309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/2287309/pexels-photo-2287309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/27808775/pexels-photo-27808775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37550277/pexels-photo-37550277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Swiss van Java. Pemandian air panas alami, curug orok yang segar, dan kampung adat yang memesona.',
    highlights: ['Air Panas Cipanas', 'Curug Orok', 'Situ Bagendit', 'Kampung Adat'],
    mapX: 48,
    mapY: 50,
  },
  {
    id: 'guci',
    slug: 'guci',
    name: 'Guci',
    region: 'Jawa Tengah',
    island: 'Jawa',
    image: 'https://images.pexels.com/photos/18562255/pexels-photo-18562255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/18562255/pexels-photo-18562255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/35308345/pexels-photo-35308345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17863794/pexels-photo-17863794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description: 'Retreat air panas alami di lereng gunung. Healing, fresh air, dan curug cipendawa yang menenangkan.',
    highlights: ['Air Panas Guci', 'Curug Cipendawa', 'Bukit Sidengkeng'],
    mapX: 53,
    mapY: 51,
  },
];

// ============================================================
// TESTIMONI
// ============================================================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Bu Sari',
    location: 'Jakarta',
    trip: 'Karimun Jawa',
    rating: 5,
    text: 'Pertama kali ikut open trip tanpa suami, ternyata seru banget! Tour leadernya ramah, jaga terus, dan dokumennya cakep. Anak-anak di rumah iri katanya. Hehe.',
    photo: 'https://images.pexels.com/photos/38366748/pexels-photo-38366748.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  },
  {
    id: 't2',
    name: 'Mbak Rina',
    location: 'Bandung',
    trip: 'Pahawang Lampung',
    rating: 5,
    text: 'Bestie dan aku langsung booking karena kayak transparannya. Beneran deh, kayak di luar negeri! Miminnya responsif banget di WA.',
    photo: 'https://images.pexels.com/photos/16105478/pexels-photo-16105478.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  },
  {
    id: 't3',
    name: 'Bu Wati',
    location: 'Bekasi',
    trip: 'Pacitan',
    rating: 5,
    text: 'Ikut sama ibu-ibu arisan RT. Awalnya takut capek, ternyata tidak ngebut, santai, dan semua sudah diurus. Tinggal bawa badan dan kamera. Recommended!',
    photo: 'https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  },
  {
    id: 't4',
    name: 'Mbak Dewi',
    location: 'Tangerang',
    trip: 'Dieng',
    rating: 5,
    text: 'Hijab friendly banget. Homestay-nya nyaman buat kita, tour leader cewek paham banget kebutuhan kita. Sunrise Sikunir worth it!',
    photo: 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  },
  {
    id: 't5',
    name: 'Bu Yuni',
    location: 'Depok',
    trip: 'Karimun Jawa',
    rating: 5,
    text: 'Ulang tahun aku minta ke Karimun sama keluarga. Rute Seru bikin trip terasa private meskipun open trip. Mimin Melina baik banget. Pasti balik lagi!',
    photo: 'https://images.pexels.com/photos/30654821/pexels-photo-30654821.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  },
];

// ============================================================
// GALERI
// ============================================================
export const GALLERY_CATEGORIES = ['Semua', 'Karimun Jawa', 'Lampung', 'Pacitan', 'Dieng', 'Garut'];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', category: 'Karimun Jawa', image: 'https://images.pexels.com/photos/36003130/pexels-photo-36003130.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', caption: 'Road trip ke Karimun, happy banget!', span: 'tall' },
  { id: 'g2', category: 'Karimun Jawa', image: 'https://images.pexels.com/photos/9149273/pexels-photo-9149273.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', caption: 'Island hopping Karimun Jawa', span: 'wide' },
  { id: 'g3', category: 'Lampung', image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', caption: 'Kayak transparan di Pahawang', span: 'tall' },
  { id: 'g4', category: 'Lampung', image: 'https://images.pexels.com/photos/3535916/pexels-photo-3535916.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', caption: 'Clear water Pahawang', span: 'normal' },
  { id: 'g5', category: 'Pacitan', image: 'https://images.pexels.com/photos/17863794/pexels-photo-17863794.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', caption: 'Pantai Srau Pacitan', span: 'wide' },
  { id: 'g6', category: 'Dieng', image: 'https://images.pexels.com/photos/37701936/pexels-photo-37701936.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', caption: 'Sunrise Sikunir Dieng', span: 'tall' },
  { id: 'g7', category: 'Karimun Jawa', image: 'https://images.pexels.com/photos/2121302/pexels-photo-2121302.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', caption: 'Snorkeling Menjangan', span: 'normal' },
  { id: 'g8', category: 'Lampung', image: 'https://images.pexels.com/photos/1731791/pexels-photo-1731791.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', caption: 'Pulau Sebesi view', span: 'wide' },
  { id: 'g9', category: 'Pacitan', image: 'https://images.pexels.com/photos/35308345/pexels-photo-35308345.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', caption: 'Goa Gong Pacitan', span: 'tall' },
  { id: 'g10', category: 'Garut', image: 'https://images.pexels.com/photos/2287309/pexels-photo-2287309.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', caption: 'Bukit Garut', span: 'normal' },
  { id: 'g11', category: 'Karimun Jawa', image: 'https://images.pexels.com/photos/36003131/pexels-photo-36003131.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', caption: 'Bestie trip Karimun', span: 'tall' },
  { id: 'g12', category: 'Lampung', image: 'https://images.pexels.com/photos/30961637/pexels-photo-30961637.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', caption: 'Kayak transparan bestie', span: 'wide' },
  { id: 'g13', category: 'Dieng', image: 'https://images.pexels.com/photos/4649742/pexels-photo-4649742.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', caption: 'Telaga Warna Dieng', span: 'normal' },
  { id: 'g14', category: 'Pacitan', image: 'https://images.pexels.com/photos/34127856/pexels-photo-34127856.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', caption: 'Coastal view Pacitan', span: 'tall' },
  { id: 'g15', category: 'Karimun Jawa', image: 'https://images.pexels.com/photos/36003121/pexels-photo-36003121.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', caption: 'Dancing di trip!', span: 'wide' },
  { id: 'g16', category: 'Garut', image: 'https://images.pexels.com/photos/27808775/pexels-photo-27808775.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', caption: 'Sunrise Garut', span: 'normal' },
];

// ============================================================
// TEAM
// ============================================================
export const TEAM = [
  { id: 'vita', name: 'Ka Vita', role: 'Founder & Tour Leader', photo: 'https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Mulai Rute Seru dari hobi traveling bareng bestie. Pelopor trip ramah hijab di Jakarta.' },
  { id: 'nia', name: 'Ka Nia', role: 'Tour Leader & Content', photo: 'https://images.pexels.com/photos/16105478/pexels-photo-16105478.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Jago dokumentasi, setiap trip pasti foto-fotonya cakep. Sabar ngurus ibu-ibu. Hehe.' },
  { id: 'ria', name: 'Ka Ria', role: 'Tour Leader & Logistik', photo: 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', bio: 'Detail banget urusan akomodasi & transport. Pastikan trip anti ribet, tepat waktu.' },
];

// ============================================================
// STATS
// ============================================================
export const STATS = [
  { label: 'Travelers Happy', value: '1.4K+' },
  { label: 'Trips Done', value: '380+' },
  { label: 'Destinasi', value: '12+' },
  { label: 'Rating', value: '4.9★' },
];

// ============================================================
// WHY RUTE SERU
// ============================================================
export const WHY_US = [
  { icon: 'MapPin', title: 'Mepo JakPus Strategis', desc: 'Titik kumpul di Jl. Kramat 5 No. 8 Jakarta Pusat. Dekat angkot, busway, stasiun, parkir murah.' },
  { icon: 'HeartHandshake', title: 'Tour Leader Cewek Ramah', desc: 'Dampingan tour leader perempuan yang sabar, asik, dan ngerti banget kebutuhan bestie & ibu-ibu.' },
  { icon: 'Sparkles', title: 'Hijab Friendly', desc: 'Akomodasi nyaman buat jamaah hijab, spot foto ramah, dan suasana aman untuk perempuan.' },
  { icon: 'Camera', title: 'Dokumentasi Cakep', desc: 'Setiap trip ada tim dokumentasi. Foto & reels ready, tinggal upload ke medsos. Auto viral!' },
];

// ============================================================
// LOYALTY CARD
// ============================================================
export const LOYALTY = {
  totalStamps: 10,
  perks: [
    'Gift special eksklusif Rute Seru',
    'Diskon 15% trip berikutnya',
    'Priority booking trip baru',
    'Free merchandise surprise',
  ],
};
