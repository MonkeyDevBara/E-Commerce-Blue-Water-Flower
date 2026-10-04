export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Bunga Artificial' | 'Gift Wrappers' | 'Dried Flowers' | 'Pita & Aksesoris' | 'Kemasan & Foam';
  price: number;
  originalPrice?: number;
  resellerPrice: number;
  unit: string;
  wholesaleMinQty?: number;
  wholesaleUnitNote?: string;
  stock: number;
  stockStatus: 'tersedia' | 'hampir_habis';
  badge?: 'TERLARIS' | 'BARU' | 'SALE -20%' | 'SALE -25%' | 'SALE' | 'POPULER' | 'REKOMENDASI' | 'BASIC' | 'GROSIR' | 'TRENDING';
  rating: number;
  reviewCount: number;
  soldCount: string;
  image: string;
  thumbnails?: string[];
  description: string;
  colors: { name: string; hex: string }[];
  specs: {
    height?: string;
    diameter?: string;
    weight?: string;
    material: string;
    packageQty: string;
    origin: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'daisy-red',
    sku: 'DAISY-RED-01',
    name: 'Daisy Artificial Premium — RED',
    category: 'Bunga Artificial',
    price: 28500,
    resellerPrice: 22800,
    unit: 'tangkai',
    wholesaleMinQty: 24,
    wholesaleUnitNote: 'Grosir: Rp 24.000 (Min. 24) / Rp 22.800 (Reseller)',
    stock: 744,
    stockStatus: 'tersedia',
    badge: 'TERLARIS',
    rating: 4.8,
    reviewCount: 127,
    soldCount: '2.341',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9H3BeIqa1wKhiBsDs3oLUamQ3BIbCQUdXTMNCaDkQsVKEvDW1rIrkU7Fy_Dvq_m0YnRx-hcUZ1IdjqettueX2Ttg4gnmRHH54pSNofmhVwzfVOAvGZJO2lXVFujtoqgTrvKgOCuoIzO9VW0rZNJpvfmXLtyj2XCWts7DwIvFfv7fp0iiobDwGU2uZ1MNSjOioQ2R1yZXamN7qUAA5PKnF1_PkqR3uA00S-lxyqn3ZXc-1wMMuhuoF',
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9H3BeIqa1wKhiBsDs3oLUamQ3BIbCQUdXTMNCaDkQsVKEvDW1rIrkU7Fy_Dvq_m0YnRx-hcUZ1IdjqettueX2Ttg4gnmRHH54pSNofmhVwzfVOAvGZJO2lXVFujtoqgTrvKgOCuoIzO9VW0rZNJpvfmXLtyj2XCWts7DwIvFfv7fp0iiobDwGU2uZ1MNSjOioQ2R1yZXamN7qUAA5PKnF1_PkqR3uA00S-lxyqn3ZXc-1wMMuhuoF',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBghoEFGRZ3o0nUABBYSunLs600AKHwj64-iqMVWButejCP6OvyYSxE6RKmkpHv_8YEFCafsmoq2C5UV2fM-deKzua6YL_DftdKwgM3yS6DLbA4xWNHyVQXLWpEwI6qAzWQXp8pkUb-l5IRUsW2taf1hHdPeBdo2RyXuNLFwOGOsiARNCdS6p3M2kAQeRtDJDSZjSL-Mwgwhh7GEKNqd5VhUP9X6KVRI_0hWM_6ytYiJgSEogu9yNxl',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPT2vxWsTJ11G_sPShSqdbt79ukEQJfU3D4ZHA23_rNAdafDct7YserjUJpFvDzJiaUA1Gg3j_8RwHVK_lSamggE90s4WBdyGavorzlXVglBAprg85wQUSx2BoBP8TN3RUG3y6EQ7G4aLLN7oR88K5UB9NFAoD-78R5houpoIiVaFhkVZ5UlHg3fqCS3gCwC0Pcvo459wFL9khpTyUS9fcbsJa50geJQ3iH1YXGs68YSKa7YBE1a-k',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PcmNnBeGOIjheTXsNpzyXQHM1kL6lwA3VphjzZAwTjvvtaeYNpjnHxExqN7ygN15pSmishlspYicpIR3L63oYatwQg7EeokX4aWp_1VNuRd17gi3dXpEdGOUSSQHSK9TGcweZ-CxHHKrXndCXLq1vZ9PsttPinuiMKetNZBCQ4ygckDMt8dFQn9QqJJCpU9j9267t5tZAETQevRIvcz3qJ6tO2EmV72R5uO1_ph0FfTS8qJChw0E'
    ],
    description: 'Bahan premium silk velvet, 5 tangkai bunga per ikat. Dibuat menggunakan perpaduan material silk fabric dan high-density latex berkualitas tinggi yang menghasilkan kelopak dengan tekstur alami yang lentur serta warna merah pekat yang tidak mudah pudar.',
    colors: [
      { name: 'Merah (RED)', hex: '#e53935' },
      { name: 'Biru (BLUE)', hex: '#1e88e5' },
      { name: 'Pink (PINK)', hex: '#f06292' },
      { name: 'Putih (WHITE)', hex: '#f8fafc' },
      { name: 'Kuning (YELLOW)', hex: '#fdd835' },
      { name: 'Oranye (ORANGE)', hex: '#fb8c00' },
      { name: 'Ungu Lavender (UNGU)', hex: '#ba68c8' },
      { name: 'Deep Purple (PURPLE)', hex: '#6a1b9a' }
    ],
    specs: {
      height: '± 30 cm',
      diameter: 'Ø 7 cm',
      weight: '± 50 gr',
      material: 'Silk Fabric Grade A + High-Density Latex + Flexible Wire Core Stem',
      packageQty: '1 tangkai (Retail) / Per Lusin (12 pcs) / Per Koli Box (120 pcs)',
      origin: 'Yiwu International Floral Market, Zhejiang, China'
    }
  },
  {
    id: 'clp-tif-01',
    sku: 'CLP-TIF-01',
    name: 'Cellophane Gradient Matte — TIFFANY BLUE',
    category: 'Gift Wrappers',
    price: 34900,
    originalPrice: 45000,
    resellerPrice: 27900,
    unit: '20 lbr',
    wholesaleMinQty: 10,
    wholesaleUnitNote: 'Dus (50 pack): Rp 25.000/pack',
    stock: 520,
    stockStatus: 'tersedia',
    badge: 'SALE -20%',
    rating: 4.9,
    reviewCount: 94,
    soldCount: '1.820',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PcmNnBeGOIjheTXsNpzyXQHM1kL6lwA3VphjzZAwTjvvtaeYNpjnHxExqN7ygN15pSmishlspYicpIR3L63oYatwQg7EeokX4aWp_1VNuRd17gi3dXpEdGOUSSQHSK9TGcweZ-CxHHKrXndCXLq1vZ9PsttPinuiMKetNZBCQ4ygckDMt8dFQn9QqJJCpU9j9267t5tZAETQevRIvcz3qJ6tO2EmV72R5uO1_ph0FfTS8qJChw0E',
    description: 'Waterproof 20 lembar/pack, finish matte beludru mewah standar florist Korea. Lembaran tidak tembus pandang dan tidak luntur saat kena tetesan air.',
    colors: [
      { name: 'Tiffany Blue', hex: '#4dd0e1' },
      { name: 'Rose Pink', hex: '#f06292' },
      { name: 'Lilac', hex: '#ba68c8' },
      { name: 'Black Matte', hex: '#212121' }
    ],
    specs: {
      height: '58 cm',
      diameter: '58 cm',
      weight: '± 320 gr/pack',
      material: 'BOPP Waterproof Film + Matte Frosted Coat',
      packageQty: '20 lembar per pack',
      origin: 'Yiwu, Zhejiang, China'
    }
  },
  {
    id: 'dry-gyp',
    sku: 'DRY-GYP-100',
    name: 'Baby Breath Dried Gypsophila Import',
    category: 'Dried Flowers',
    price: 42000,
    resellerPrice: 34000,
    unit: 'ikat 100gr',
    wholesaleMinQty: 12,
    wholesaleUnitNote: 'Koli (20 ikat): Rp 32.000/ikat',
    stock: 310,
    stockStatus: 'tersedia',
    badge: 'POPULER',
    rating: 4.8,
    reviewCount: 88,
    soldCount: '980',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPT2vxWsTJ11G_sPShSqdbt79ukEQJfU3D4ZHA23_rNAdafDct7YserjUJpFvDzJiaUA1Gg3j_8RwHVK_lSamggE90s4WBdyGavorzlXVglBAprg85wQUSx2BoBP8TN3RUG3y6EQ7G4aLLN7oR88K5UB9NFAoD-78R5houpoIiVaFhkVZ5UlHg3fqCS3gCwC0Pcvo459wFL9khpTyUS9fcbsJa50geJQ3iH1YXGs68YSKa7YBE1a-k',
    description: 'Preserved flower alami, tahan hingga 2 tahun tanpa rontok. Filler floral terfavorit untuk rustic wedding, buket wisuda, dan display interior café.',
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Pastel Pink', hex: '#f8bbd0' },
      { name: 'Sky Blue', hex: '#bbdefb' },
      { name: 'Sun Yellow', hex: '#fff59d' }
    ],
    specs: {
      height: '± 45 cm',
      diameter: '± 25 cm bunched',
      weight: '100 gr / ikat',
      material: '100% Bunga Alami Preserved dengan Gliserin Nabati',
      packageQty: '1 ikat (100 gr)',
      origin: 'Kunming & Yiwu Floral Hub'
    }
  },
  {
    id: 'pta-holo-38',
    sku: 'PTA-HOLO-38',
    name: 'Pita Gelombang Hologram 3.8cm — PURPLE',
    category: 'Pita & Aksesoris',
    price: 15000,
    originalPrice: 20000,
    resellerPrice: 12500,
    unit: 'roll 10 yard',
    wholesaleMinQty: 20,
    wholesaleUnitNote: 'Grosir: Rp 12.500/roll (Min. 20 roll)',
    stock: 18,
    stockStatus: 'hampir_habis',
    badge: 'SALE -25%',
    rating: 4.7,
    reviewCount: 52,
    soldCount: '1.450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PcmNnBeGOIjheTXsNpzyXQHM1kL6lwA3VphjzZAwTjvvtaeYNpjnHxExqN7ygN15pSmishlspYicpIR3L63oYatwQg7EeokX4aWp_1VNuRd17gi3dXpEdGOUSSQHSK9TGcweZ-CxHHKrXndCXLq1vZ9PsttPinuiMKetNZBCQ4ygckDMt8dFQn9QqJJCpU9j9267t5tZAETQevRIvcz3qJ6tO2EmV72R5uO1_ph0FfTS8qJChw0E',
    description: 'Reflektif kilau lavender iridescent, lebar 4cm panjang 10 yard per roll. Tepi gelombang berkerut memberikan aksen mewah pada ikatan buket bunga.',
    colors: [
      { name: 'Purple Hologram', hex: '#8e24aa' },
      { name: 'Silver Iridescent', hex: '#e0e0e0' },
      { name: 'Rose Gold', hex: '#f48fb1' }
    ],
    specs: {
      height: '3.8 cm (lebar)',
      diameter: '10 yard / roll (± 9.1 meter)',
      weight: '± 45 gr/roll',
      material: 'Laser Holographic Organza Ribbon',
      packageQty: '1 Roll',
      origin: 'Yiwu Textile Market, China'
    }
  },
  {
    id: 'tul-pnk',
    sku: 'TUL-PNK',
    name: 'Tulip Latex Artificial — PINK',
    category: 'Bunga Artificial',
    price: 22500,
    resellerPrice: 18000,
    unit: '5 tangkai',
    wholesaleMinQty: 10,
    wholesaleUnitNote: 'Grosir: Rp 18.000/ikat (Min. 10 ikat)',
    stock: 480,
    stockStatus: 'tersedia',
    badge: 'REKOMENDASI',
    rating: 4.9,
    reviewCount: 160,
    soldCount: '3.100',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoBmaFoJIaEpsGfF0JkcyHxVy43JKzdomz7PQgbdeNaAHqrNyP6PWX66rhrbjDDKHQr-qSVXt9VnbprvO-jb_7IP2shcbBXOFOAONkVO8v7arh3f9oAGBm_kgB3orluE6cLdYZp1JkPgm7cmz_1VxFK80rYlJfdSa2QFnV41x_5fYARDtUhDjwLy4bx6OYGYMNdpd1B0WFQIB_uYjGGAW5m9g7tjqucG7NXfjLhfUEXMZ88bcEXITX',
    description: 'Real-touch latex grade A, kelopak lentur tahan lembap dan tidak mudah robek saat dirangkai dengan floral tape.',
    colors: [
      { name: 'Soft Pink', hex: '#f48fb1' },
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Champagne', hex: '#ffecb3' }
    ],
    specs: {
      height: '34 cm',
      diameter: 'Ø 3.5 cm kelopak',
      weight: '60 gr/ikat',
      material: 'Real Touch High-Elastic Polyurethane Latex',
      packageQty: 'Isi 5 tangkai',
      origin: 'Yiwu, China'
    }
  },
  {
    id: 'tis-pur',
    sku: 'TIS-PUR',
    name: 'Kertas Tissue Nonwoven — DEEP PURPLE',
    category: 'Gift Wrappers',
    price: 18000,
    resellerPrice: 14500,
    unit: '10 lbr (50x70cm)',
    wholesaleMinQty: 20,
    wholesaleUnitNote: 'Dus (100 pack): Rp 13.000/pack',
    stock: 620,
    stockStatus: 'tersedia',
    badge: 'TERLARIS',
    rating: 4.8,
    reviewCount: 73,
    soldCount: '2.050',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8kxgG3rcsZntGcq0nFUz5XRaLfQzqbotrfVIL8MksSstOYi139tCApECbgTewnGx6JuBBZSWTuAGMENOsq-CYQqozL2uUX7d0Bqi54V6ompjTbfSOjiJ4Z0AsIicOmKVQ_VY3J7MmGHwsXd2yZqr3zySBARQGyNkx_9eJIqPsCu_YM_0qvf4PO5JBB8amm4Ohn6L9_b3ivPtpyMZvVODl2PLOEtqgB8iBNRCh5-Q2P0CWdjWSuPcP',
    description: 'Serat kain sintetis lembut, tidak mudah robek saat dilipat atau dibentuk rumbai. Ideal untuk layer dalam buket bunga segar & artificial.',
    colors: [
      { name: 'Deep Purple', hex: '#6a1b9a' },
      { name: 'Cream Ivory', hex: '#fff9c4' },
      { name: 'Wine Red', hex: '#880e4f' }
    ],
    specs: {
      height: '70 cm',
      diameter: '50 cm',
      weight: '110 gr/pack',
      material: 'Non-Woven Spunbond Fiber Fabric',
      packageQty: '10 lembar (50x70cm)',
      origin: 'Yiwu, China'
    }
  },
  {
    id: 'sun-01',
    sku: 'SUN-01',
    name: 'Bunga Matahari Palsu Silk',
    category: 'Bunga Artificial',
    price: 31000,
    originalPrice: 38000,
    resellerPrice: 24500,
    unit: 'tangkai',
    wholesaleMinQty: 12,
    wholesaleUnitNote: 'Grosir: Rp 24.500 (Min. 12 tangkai)',
    stock: 390,
    stockStatus: 'tersedia',
    badge: 'SALE',
    rating: 4.7,
    reviewCount: 49,
    soldCount: '870',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHWXJJsMIXniPSUWdeHaB9sgnsidUvoOqv-kvPkE95q2qqtkz4wo71yW-iGWDMoYtN2B9TQgDjKzghrwIIr4NyJ2q19Uzo2OwMGJ8fvBNhBcazP0SGk1rOYkyvDWNLMBmfy9IIk0mEyXjzrKJIbKBLZ1-Eq4L2SEYFE17YumfUKrBK6jH3jqwHUOi6nHiU6gOIKUwyZUuQCe9loDhAq7-z6aVvg5rNLGQ_AZQF7PS3KNO3l54-hiBb',
    description: 'Kelopak kuning cerah bergradasi, diameter kuntum 12cm. Center hitam dengan serbuk beludru lembut memberikan kesan sunflower mekar alami.',
    colors: [
      { name: 'Sun Golden Yellow', hex: '#fbc02d' }
    ],
    specs: {
      height: '42 cm',
      diameter: 'Ø 12 cm',
      weight: '65 gr',
      material: 'Silk Fabric Grade A + Flocked Center',
      packageQty: '1 tangkai (1 kepala mekar + 2 daun)',
      origin: 'Yiwu, China'
    }
  },
  {
    id: 'wrp-fly',
    sku: 'WRP-FLY',
    name: 'Flower Wrapping Butterfly — MAUVE',
    category: 'Gift Wrappers',
    price: 25000,
    resellerPrice: 19500,
    unit: 'pack 20 lbr',
    wholesaleMinQty: 10,
    wholesaleUnitNote: 'Dus (60 pack): Rp 18.000/pack',
    stock: 410,
    stockStatus: 'tersedia',
    badge: 'TRENDING',
    rating: 4.9,
    reviewCount: 112,
    soldCount: '2.400',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi40mfBqPt_wprgRnWCur1sah8Un3met4kAEzILpX8uci3V28CnIKuBboVWPFa1An3sEbJnOr9ortA1LYjjkDCc6jwJMJHPTk7aFUTP33LciJo0Zuu8P0-5q7bQ4aOl6NrxEaLFsBRb8n1_fagaQtyWTYrcAmQ-X23lLOOmXI9hvt7OT81VTj_RYFx-3uWj2x7DtA3OZbnh-cvBmBI9BxRtFZJDuX5EsVOROGxQyFjzJ0bMAA-2qgx',
    description: 'Motif kupu-kupu timbul elegan dengan tepi bergelombang. Bahan anti air sangat cantik saat dijadikan selubung terluar buket hadiah valentine atau hari ibu.',
    colors: [
      { name: 'Mauve Pink', hex: '#d81b60' },
      { name: 'Cloud White', hex: '#f5f5f5' }
    ],
    specs: {
      height: '58 cm',
      diameter: '58 cm',
      weight: '280 gr/pack',
      material: 'Embossed Waterproof OPP Wrap',
      packageQty: 'Pack isi 20 lbr',
      origin: 'Yiwu, China'
    }
  },
  {
    id: 'amr-pnk',
    sku: 'AMR-PNK',
    name: 'Amaranthus Preserved — SOFT PINK',
    category: 'Dried Flowers',
    price: 55000,
    resellerPrice: 44000,
    unit: 'ikat 3 tangkai',
    wholesaleMinQty: 6,
    wholesaleUnitNote: 'Koli: Rp 42.000/ikat (Min. 12 ikat)',
    stock: 145,
    stockStatus: 'tersedia',
    badge: 'BARU',
    rating: 4.8,
    reviewCount: 38,
    soldCount: '620',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPT2vxWsTJ11G_sPShSqdbt79ukEQJfU3D4ZHA23_rNAdafDct7YserjUJpFvDzJiaUA1Gg3j_8RwHVK_lSamggE90s4WBdyGavorzlXVglBAprg85wQUSx2BoBP8TN3RUG3y6EQ7G4aLLN7oR88K5UB9NFAoD-78R5houpoIiVaFhkVZ5UlHg3fqCS3gCwC0Pcvo459wFL9khpTyUS9fcbsJa50geJQ3iH1YXGs68YSKa7YBE1a-k',
    description: 'Untaian gantung awet alami, panjang rata-rata 60–80cm. Memberikan siluet dramatis cascading pada pelaminan, standing flowers, dan chandelier wedding.',
    colors: [
      { name: 'Soft Pink', hex: '#f06292' },
      { name: 'Ivory Bleached', hex: '#fffde7' }
    ],
    specs: {
      height: '60–80 cm',
      diameter: 'Cascading form',
      weight: '120 gr/ikat',
      material: '100% Natural Preserved Hanging Amaranthus',
      packageQty: 'Per ikat 3 tangkai',
      origin: 'Yunnan & Yiwu Floral Hub'
    }
  },
  {
    id: 'pta-stn',
    sku: 'PTA-STN',
    name: 'Pita Satin Lebar 2.5cm — TIFFANY BLUE',
    category: 'Pita & Aksesoris',
    price: 12000,
    resellerPrice: 9500,
    unit: 'roll 25 yard',
    wholesaleMinQty: 24,
    wholesaleUnitNote: 'Dus: Rp 9.500/roll (Min. 24 roll)',
    stock: 920,
    stockStatus: 'tersedia',
    badge: 'BASIC',
    rating: 4.9,
    reviewCount: 210,
    soldCount: '5.400',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPT2vxWsTJ11G_sPShSqdbt79ukEQJfU3D4ZHA23_rNAdafDct7YserjUJpFvDzJiaUA1Gg3j_8RwHVK_lSamggE90s4WBdyGavorzlXVglBAprg85wQUSx2BoBP8TN3RUG3y6EQ7G4aLLN7oR88K5UB9NFAoD-78R5houpoIiVaFhkVZ5UlHg3fqCS3gCwC0Pcvo459wFL9khpTyUS9fcbsJa50geJQ3iH1YXGs68YSKa7YBE1a-k',
    description: 'Double face polyester mengkilap, panjang roll 25 yard (±22 meter). Tekstur halus, tepian tidak berserabut saat digunting, warna mengkilap tahan luntur.',
    colors: [
      { name: 'Tiffany Blue', hex: '#4dd0e1' },
      { name: 'Gold Champagne', hex: '#ffd54f' },
      { name: 'Emerald Green', hex: '#2e7d32' },
      { name: 'Red Maroon', hex: '#b71c1c' }
    ],
    specs: {
      height: '2.5 cm (1 inch)',
      diameter: '25 yard / roll',
      weight: '40 gr/roll',
      material: '100% High-Density Polyester Double Face Satin',
      packageQty: '1 Roll',
      origin: 'Yiwu Ribbon Manufacturing'
    }
  },
  {
    id: 'clp-gld',
    sku: 'CLP-GLD',
    name: 'Cellophane List Gold — DARK VIOLET',
    category: 'Gift Wrappers',
    price: 29000,
    resellerPrice: 23000,
    unit: 'pack 20 lbr',
    wholesaleMinQty: 10,
    wholesaleUnitNote: 'Dus: Rp 21.000/pack (Min. 50 pack)',
    stock: 430,
    stockStatus: 'tersedia',
    badge: 'TERLARIS',
    rating: 4.8,
    reviewCount: 97,
    soldCount: '2.210',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhBJzaS1BVSA6avqyPtQNJp7V8IcJCUBGuVL4wmMtcqmmi2DIGFNIxNGHlXYM-al4eLEbPhrc1kxTq_pDD9n7I7VhOFIfAkARsSZ-0DpCGR_M-uGAmVX0b4zJ4CwjAP6rFaKn9Fr5A1CDbLuXUWqAVFVk69Sd0-JKKKrhOOdw0EYt5RQFRu0dPp4jiEjqRwrjAW7zfGMGKwsWdgJykc6IAfpe2DNz8Sz6i3Sv7KAxYIW0j5Tg85g7D',
    description: 'Garis bingkai foil emas tahan luntur air, ukuran 58x58cm. Menghasilkan kontras mewah bingkai emas berkelas tinggi untuk buket wisuda dan pesta.',
    colors: [
      { name: 'Dark Violet', hex: '#4a148c' },
      { name: 'Classic Black', hex: '#212121' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    specs: {
      height: '58 cm',
      diameter: '58 cm',
      weight: '310 gr/pack',
      material: 'Gold Stamped Foil + Waterproof Matte BOPP',
      packageQty: 'Pack isi 20 lbr',
      origin: 'Yiwu, China'
    }
  },
  {
    id: 'bkt-zig',
    sku: 'BKT-ZIG',
    name: 'Kerangka Buket Zigzag XL',
    category: 'Kemasan & Foam',
    price: 16500,
    resellerPrice: 12500,
    unit: 'pcs (tinggi 45cm)',
    wholesaleMinQty: 25,
    wholesaleUnitNote: 'Dus (100 pcs): Rp 11.000/pcs',
    stock: 670,
    stockStatus: 'tersedia',
    badge: 'GROSIR',
    rating: 4.7,
    reviewCount: 65,
    soldCount: '1.930',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPT2vxWsTJ11G_sPShSqdbt79ukEQJfU3D4ZHA23_rNAdafDct7YserjUJpFvDzJiaUA1Gg3j_8RwHVK_lSamggE90s4WBdyGavorzlXVglBAprg85wQUSx2BoBP8TN3RUG3y6EQ7G4aLLN7oR88K5UB9NFAoD-78R5houpoIiVaFhkVZ5UlHg3fqCS3gCwC0Pcvo459wFL9khpTyUS9fcbsJa50geJQ3iH1YXGs68YSKa7YBE1a-k',
    description: 'Penyangga buket berdiri kokoh bahan wire frame powder-coated anti karat. Buket uang, buket snack, dan buket bunga besar bisa berdiri mandiri di meja.',
    colors: [
      { name: 'White Coat', hex: '#fafafa' },
      { name: 'Black Coat', hex: '#212121' }
    ],
    specs: {
      height: 'Tinggi 45 cm',
      diameter: 'Lebar kerucut 22 cm',
      weight: '140 gr/pcs',
      material: 'Sturdy Steel Wire + Powder Coating Anti Karat',
      packageQty: '1 Pcs (Dapat ditumpuk)',
      origin: 'Yiwu Hardware Craft'
    }
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    name: 'Semua Produk',
    count: 1771,
    emoji: '📦',
    desc: 'Semua suplai floral import langsung dari Yiwu, China'
  },
  {
    id: 'bunga-artificial',
    name: 'Bunga Artificial',
    count: 248,
    emoji: '🌺',
    desc: 'Silk Peony, Daisy, Tulip, Mawar premium tekstur realistis.'
  },
  {
    id: 'gift-wrappers',
    name: 'Gift Wrappers',
    count: 312,
    emoji: '🎁',
    desc: 'Cellophane Matte tahan air, Korean Two-Tone, dan Tissue paper.'
  },
  {
    id: 'dried-flowers',
    name: 'Dried Flowers',
    count: 187,
    emoji: '🌾',
    desc: 'Baby Breath import, Lagurus Bunny Tail, Amaranthus, dan Pampas.'
  },
  {
    id: 'pita-aksesoris',
    name: 'Pita & Aksesoris',
    count: 423,
    emoji: '🎀',
    desc: 'Pita Hologram, Satin, Floral Foam Oasis, dan Gunting Florist Emas.'
  },
  {
    id: 'kemasan-foam',
    name: 'Kemasan & Foam',
    count: 156,
    emoji: '📦',
    desc: 'Kerangka buket, floral foam basah/kering, tas mika & kardus pengiriman.'
  }
];
