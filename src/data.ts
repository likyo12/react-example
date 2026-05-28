import { Product, WeavingStage, Review } from './types';

export const products: Product[] = [
  {
    id: 'lumi-01',
    name: 'French Linen Sheet Set',
    subtitle: 'AVAILABLE IN 8 COLORS',
    description: 'Experience pure sensory bliss with our signature French Linen Sheet Set. Sourced from organic European flax fields, pre-washed for unmatched softness, and crafted to breathe with you all night long. Keeps you cool in summer, wrapped in cozy insulation in winter.',
    price: 240.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWRBIIPQZ-UettHHjUHwH5BSdbgwC4Hmp-ir5_7eLubm39zGgyxnqvSjSxKJNKpY-VXByLZiYk4CMrkazhguVufp6Mc948smppJL5nLd-mFljtHOmE21qEMR1nO1K3Oi6_LC2hv6u4-pBw1Zkiq66T27CwxthqchC7KomS1kbJpxfu12Xu1PvzHLMNmWu--x3vNFq_tu-X-ZD0GRXwUzFB9F4tcQkgZAMQ8fQGgHp-KqLruovrikR1tQPpAqduIwPM86t6zDm7MQ8l',
    category: 'bedding',
    badge: 'NEW IN',
    badgeType: 'new',
    colors: ['Warm Sand', 'Cloudburst', 'Sage', 'Oatmeal', 'Terracotta', 'Charcoal'],
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: '100% Organic European Flax, spun & finished using eco-certified non-toxic dyes.',
    care: 'Machine wash warm on gentle cycle. Tumble dry low or line dry in the breeze. Do not use bleach. Wrinkles are part of the raw beauty.',
    rating: 4.9,
    story: 'Woven in France near the coastal fields. The climate\'s optimal humidity yields exceptionally long fiber strands, translating to greater tensile strength and standard-setting luxury.'
  },
  {
    id: 'lumi-02',
    name: 'Cloudburst Linen Duvet Cover',
    subtitle: 'EUROPEAN FLAX CERTIFIED',
    description: 'A masterpiece of weightless comfort. Gently pre-washed in volcanic stones, the Cloudburst Duvet Cover boasts an exquisite rumpled drape that gets softer with every wash cycle. Handcrafted with beautiful concealed real wood button closures.',
    price: 280.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDktpRLSRCHRFwtUGbZXMhPwCl_FqmEJmeIHwRSlwtr_iCBVRIEYFQn2BZJ3aD84Pu02vF6mZao7XkcbAUhezHdNDxRnBVSnS_3WaSBd5O7-nbtLP0R5iuYnmk0Rb-COYGUMLRnJq7rX-g-jcLkTkB7RB11MG3_m4_-3Gabmk1f5h2fsESwWJYl8YMlvS9BofirPn5qh64PmD6E7_bLdMK8emM6PlEFc0qPpilCY9y5oeqACdmQ-Wix1rBHUe6TyrOMqxaK7yMXDS2H',
    category: 'bedding',
    badge: 'ORGANIC',
    badgeType: 'organic',
    colors: ['Cloudburst', 'Warm Sand', 'Oatmeal', 'Charcoal'],
    sizes: ['Double', 'Queen', 'King'],
    materials: '100% GOTS Certified organic linen flax.',
    care: 'Warm wash inside out. Line dry recommended to preserve button durability.',
    rating: 4.8,
    story: 'Designed with the calm gray tones of sea-mist over Belgium flax valleys. Sourced ethically from multi-generational agricultural cooperatives.'
  },
  {
    id: 'lumi-03',
    name: 'Textured Linen Throw',
    subtitle: 'LIMITED EDITION',
    description: 'Perfect for cozy afternoons on the garden chair or draped across a minimalist sofa. This heavy-weight loose throw highlights the stunning organic variations of untreated linen fibers. Finished with elegant raw fringe edges.',
    price: 145.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhX4h_r3XMmS7zueYmXGadvyrkXxpDbmTWafRhAoSl4BC27VhNwMo1w0CXj7NB-n8Uhs0SZ_67n8kmUYfXhTzbvCK5X-crIJr-J9274IBdLfDS9uF2EQnVR6Ep1imZgeEvZRd9qUTjb9Vsnmj2Q4czmIKyObXfCFvXo-vEOG8NUs-ichIqM2rua99EIdsnRTCi_wIGR37938hgkKprJ0HQ12AdaS8f28jmWueskdI7q46j5FhJIKzRjDYIKK-_8PYRDyp18W_4Bf3s',
    category: 'bedding',
    badge: 'LIMITED',
    badgeType: 'limited',
    colors: ['Oatmeal', 'Warm Sand'],
    sizes: ['Standard (150cm x 200cm)'],
    materials: '100% Undyed, unprocessed long-harvest flax fibers.',
    care: 'Dry clean recommended or hand wash cold and dry flat to prevent shrinkage of loose weaves.',
    rating: 5.0,
    story: 'Woven slowly on low-speed vintage loom shuttles in small batches, mimicking traditional artisanal craft and minimizing waste.'
  },
  {
    id: 'lumi-04',
    name: 'Linen Napkin Set (4)',
    subtitle: 'MULTI-TONAL OAT',
    description: 'Add a touch of slow-dining elegance to your tabletop. Gather your loved ones around organic, non-slip linen napkins with heavy mitered corners. Highly absorbent and naturally antibacterial.',
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvwQ6s28wBnI8GtMtmv3f3Z2SNuHljwG3Eh4hNfHIKgjEFtRkdYK2CiU_EmK5vRddEY-opkiNumSgx_aDh2lxEhiKKvGc6OX4H52MKbbPMT_egd4ro0pC9NjeRQnhWrrd1ksprPjxOncnLjHiIpemcO6pFIBcjuWujrqF5wkfgW3FzoLJ9-V8jt6-ugBgniiw_FLQC548pGIDJkLCQUt7qncXdldgZ53UeskiAVW80DiSnsEYOU80JtVSjcSRXJITIX4wb_DX36yRq',
    category: 'table',
    colors: ['Oatmeal', 'Sage', 'Terracotta', 'Charcoal'],
    sizes: ['Set of 4 (45x45cm)'],
    materials: 'Eco-certified long-staple linen.',
    care: 'Machine wash warm, iron while slightly damp for crisp lines or leave rumpled for a country vibe.',
    rating: 4.7,
    story: 'Sourced from organic leftover cuts from our duvet production, working towards an admirable zero-waste textile loop.'
  },
  // Extra luxurious categories using hotlinks
  {
    id: 'lumi-05',
    name: 'Sage Meadow Bedding Set',
    subtitle: 'SPRING SELECTION',
    description: 'A serene meadow experience brought straight to your sanctuary. Features our signature organic sage dye, reflecting the high-altitude fields of Provence. Deep pockets and robust elastic corners encompass thick mattress layers easily.',
    price: 260.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_inZVQ3_39pnUNYwZR2yVsMonOQstuYdQdbDkH4PZ4D5V8AfNmo2q8HaFFRHJS4o44JS9jsgIYCyng46al1suUxeA-IwHqTnSSX7vuy239kUcfBWHuyWLR5pWcvu1HsK5LBuugebnbYiotzKUxkHwcPbZR7skZSDYRZKHTsLyWhKc0QpByTFwUNXCobKo4awzUMdgQD-YfH7SfFJiKb5Zg5Snvu9uXbDURdiyOgkrpgyOYisY8ugCbZIgMA1EP7v6T6HVSAClRapW',
    category: 'bedding',
    colors: ['Sage', 'Oatmeal', 'Warm Sand'],
    sizes: ['Queen', 'King'],
    materials: '100% Flax Linen.',
    care: 'Gentle cycle, tumble dry medium.',
    rating: 4.9,
    story: ' Dyed using plant extracted botanicals for a truly chemical-free environment.'
  },
  {
    id: 'lumi-06',
    name: 'Waffle Weave Towel Set (2)',
    subtitle: 'TACTILE ABSORBENCY',
    description: 'Indulge in our exquisite waffle linen towels. Expertly engineered to perform with exceptional absorbency and quick air-drying features. Exfoliates gently on damp skin, turning standard showers into high-end spa experiences.',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACAsCZMks857Y1vUtwnjTvobJWFPJ3bzcaCupTZdsJPs6MCT1o3A-rFlcNLJnljVnTmTuJHw3cfzgf1zOIvm43t9_wWZE6BEOgmChwSLRuoGhJbZUiS_PiVh1dyQMiwjmk6tvJ-yFDAdOJt7D_pxmroCgJekUt0bvakyojG4CetpwlhuldGCHqXuuGBUhE5XwGEHPF5W692HOHNuefghLBlryJinQTccAYQHqYpekMyUL2f-y2-ziqEIXWin6dNon9A0NjjjMXDjDy',
    category: 'bath',
    colors: ['Oatmeal', 'Charcoal', 'Warm Sand'],
    sizes: ['Set of 2 Bath Sheets'],
    materials: '85% Long-flax Linen, 15% Organic Cotton for structural waffle stability.',
    care: 'avoid fabric softeners as they coat fibers and limit absorption. Shake well before drying.',
    rating: 4.8,
    story: 'Woven on old Flemish looms that pack threads tightly, leaving deep pockets for ultimate absorption.'
  },
  {
    id: 'lumi-07',
    name: 'Terracotta Lounge Tunic',
    subtitle: 'SLOW WEAR',
    description: 'Graceful, loose-fitting lounge apparel perfect for slow mornings and tranquil afternoons. Featuring breathable linen with an exquisite weight that drops beautifully. Includes two seamless side pockets and soft wooden button details.',
    price: 115.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB--C9s_-UpNTzeCnuusowsf8CSm2tZ2qJjjQ6KYgIpzU8RKYEmn119bp7V-An-DI12tVYzFB1N4iV1H99vsDYZEvycwbvAHB5Eb0ytCCngFj5A4bjBotJZDjpNZPuajs7T_qzwsXQX0zoiAnzro-1aIMeu15edXJAWvsTHHaqOLosz5i_dJCl3TpTSGpdIZFn7zD--T7mNEtHc3r4GfxF1OwMkkGpPrBx8R-ni3euLKe7QC9RbGvG1wKq_kIw1Qk7HLQdCZpSt2-qt',
    category: 'apparel',
    colors: ['Terracotta', 'Oatmeal', 'Warm Sand'],
    sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
    materials: '100% organic heavy linen, pre-washed in volcanic stones.',
    care: 'Wash with similar colors, line dry in shade to preserve terracotta radiance.',
    rating: 4.9,
    story: 'Designed in our Paris studio, minimizing seam counts to deliver maximum spatial comfort.'
  }
];

export const weavingStages: WeavingStage[] = [
  {
    step: 1,
    title: 'Sowing and Growing',
    description: 'Our flax is sown in the coastal plains from Northern France up to Belgium. Over the course of 100 days, the plant grows relying solely on natural rainfall and standard ocean dew, requiring zero artificial irrigation or heavy fertilizing cycles.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMWQqTxLDGrGdheCRC_4fAWsYj_a7sUChgJjg0ggzVR64MaguRilCfcU1glE0So1NGPVDH2FnIAz-UJP-5tFwjJbNToJQzzmAZzKvACKIjt7zb_iZovE_ATfUM2q_E3uVcUs6uvz0g4dUxexure7hPHizmw22sB5xQadrCKebpWuDaZ2CXvMgKOtx1AY2oTDhMcFpImNjY-1Uo4vCR_jvbSEkF2_6O-dR1dNRB3vaxrD76SOY9hh7BtqueJC3Ap_xZ0igRD-1NIQd0'
  },
  {
    step: 2,
    title: 'Retting & Pulling',
    description: 'When the flax turns golden, it is pulled from the earth by the roots to retain maximum fiber length. It lies in the field for "retting"—a natural biological process where moisture, dew, and microorganisms loosen the tough wooden bark enclosing premium internal fibers.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAstmrr2s-ZQOo89cQbHJfP_INbsc0chYFMEpes8K7RDEU2Z063Zb61ZCV-SNqHv2umWlFmgAoSxJ-Ajo_WWaJ2Sq4rExbbxAGeTu6_qxTRrjHAcluakPTW979sgT5xG-MDPOvSs1moZHNCigQtb9APjBuFE6ELZNuZk7GU3LFPU4zrra-Di1OSZ4smXamlpvFOd2WCQ2Z5opPK4x45yzQoDyW3tuqJL2bhyAgAxLUcY1E_TGR_SnldNiZeQ7ndi9tIlYTgeW-RtkYy'
  },
  {
    step: 3,
    title: 'Scutching & Hackling',
    description: 'The dried straw goes through scutching to separate coarse wood dust from long, gleaming luxury fibers. Hackling combs these fibers through fine needle-bed rows, straightening the strands into soft, hair-like silver flax ribbons.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvwxruVHHtpSBGOo7QIZ-_muXHql1UWmEaFi2UL2NfcAD4dd-z5CbSN2RrmGGdNYPQtItk_zxTW1aBUtYgRhHZP6f_y5xOkU-rJ-QkKBA2FqIDlpJbvfdma3voV_ygf8ord_bdUDfDkjnXtGOlzMvE_YbFrrEN52XbjeZuHTvm8mEc4SHK-DKuQWO0vpgS7A9eYY4cC851xekK6HpruL7Nd8aj1NEhK0egXySDLK-WGnMFrd26pDeILDwgWz0lG-m-lv5djCCCJ6db'
  },
  {
    step: 4,
    title: 'Woven into Serenity',
    description: 'The ribbons are spun under humid temperature conditions into premium linen threads. These threads are mounted on low-shuttle looms, carefully interlacing the yarns slowly to preserve the gorgeous organic slubs and slight irregularities that give our linen its signature tactile beauty.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHi2-_cEiJsUVhVxhx5wBcZAXZLC8D6_sFhVXkLVrqlJp0noBILhF-4ZdtNLGCy4G3QU3T1NGRSTK_SJb4A9LAtEjxfCZZoirEdgoge-Q6MDd3fU0MDA0CuFt5QY-aDTaQP-5OPOFLzo_G7PlL8L0nBRxtAre75gm4y5fbDozGG9kzFlQBVdVPy4pWH-u46VX_eaX1w5onAL_j-kezOkUG2LBdadBG_OnfAGbHq6F8wAcF8ojpK_GSqHme9AGzMJbt_cr1GHxXi-af'
  }
];

export const sampleReviews: Record<string, Review[]> = {
  'lumi-01': [
    { id: 'rev-01', author: 'Evelyn V.', rating: 5, date: 'May 12, 2026', text: 'I was hesitant because of the price, but oh my! After three washes, these sheets feel absolutely heavenly. They keep me so comfortably cool, and the Sand color looks like a luxury editorial photo in real life.' },
    { id: 'rev-02', author: 'Markus D.', rating: 5, date: 'April 28, 2026', text: 'Superior craftsmanship. The seams are perfect, and the natural tracking of the slubs is beautiful. This is real slow luxury.' }
  ],
  'lumi-02': [
    { id: 'rev-03', author: 'Jean-Luc S.', rating: 4, date: 'May 19, 2026', text: 'Exquisite weight. It wraps you like a cloud. Beautiful wooden buttons. Deducted one star only because the King size took a little long to air dry, but totally worth it.' }
  ]
};
