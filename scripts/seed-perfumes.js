const mongoose = require('mongoose');

const uri = process.env.MONGODB_URL || 'mongodb+srv://theperfumeessence_db_user:JfVrZe2SPcZhzw6u@cluster0.9y7syba.mongodb.net/zevora?appName=Cluster0';

const VariantSchema = new mongoose.Schema({
  label: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },
    onSale: { type: Boolean, default: false },
    hotSeller: { type: Boolean, default: false },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    images: { type: [String], required: true },
    hasVariants: { type: Boolean, default: false },
    fragranceType: { type: String, default: null },
    variants: { type: [VariantSchema], required: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const perfumeProducts = [
  {
    name: 'Oud Royale Extrait de Parfum',
    slug: 'oud-royale-extrait-de-parfum',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Woody Oriental',
    images: ['/Images/image.png'],
    description: 'An opulent and mysterious masterpiece centered around rare Cambodian oud, infused with velvet Damascus rose, smoky frankincense, and golden amber crystals. Crafted for the true connoisseur seeking magnetic allure and unmatched all-day longevity.',
    keywords: ['oud', 'luxury perfume', 'woody oriental', 'extrait de parfum', 'long lasting fragrance', 'perfumes india'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-OUD-ROYALE-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-OUD-ROYALE-100ML', stock: 50 },
    ],
  },
  {
    name: 'Velvet Amber & Madagascar Vanilla',
    slug: 'velvet-amber-madagascar-vanilla',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Amber Gourmand',
    images: ['/Images/image copy.png'],
    description: 'A sensual and intoxicating embrace of pure Madagascar vanilla bourbon, warm amber resin, and soft white cashmere musk with a heart of roasted tonka bean. Leaves an unforgettable, comforting trail from day to night.',
    keywords: ['amber', 'vanilla perfume', 'gourmand fragrance', 'warm luxury scent', 'designer perfume'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-VELVET-AMBER-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-VELVET-AMBER-100ML', stock: 50 },
    ],
  },
  {
    name: 'Imperial Rose & Kashmiri Saffron',
    slug: 'imperial-rose-kashmiri-saffron',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Floral Spicy',
    images: ['/Images/image copy 2.png'],
    description: 'A regal blend celebrating Turkish rose absolute enriched with precious hand-harvested Kashmiri saffron, velvety Indonesian patchouli, and warm honeyed cedarwood. Sophisticated, alluring, and timelessly romantic.',
    keywords: ['rose perfume', 'kashmiri saffron', 'floral spicy', 'luxury fragrance', 'wedding scent'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-IMPERIAL-ROSE-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-IMPERIAL-ROSE-100ML', stock: 50 },
    ],
  },
  {
    name: 'Midnight Tuscan Leather & Cedar',
    slug: 'midnight-tuscan-leather-cedar',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Leathery Woody',
    images: ['/Images/image copy 3.png'],
    description: 'A bold, sophisticated creation opening with fresh cardamom and Italian bergamot, descending into supple Tuscan leather, dark birch, and smoky Atlas cedarwood. The ultimate signature statement for the charismatic individual.',
    keywords: ['leather perfume', 'cedarwood', 'masculine luxury', 'woody perfume', 'evening scent'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-MIDNIGHT-LTHR-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-MIDNIGHT-LTHR-100ML', stock: 50 },
    ],
  },
  {
    name: 'Soleil Neroli & Bergamot Aqua',
    slug: 'soleil-neroli-bergamot-aqua',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Citrus Aromatic',
    images: ['/Images/image copy 4.png'],
    description: 'Luminous, crystalline, and invigorating. Sparkling Calabrian bergamot intertwined with sun-drenched orange blossoms, neroli petals, sea salt breeze, and crisp white cedar. Radiates pure summer elegance all year round.',
    keywords: ['neroli', 'bergamot', 'citrus fresh', 'summer perfume', 'fresh fragrance india'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-SOLEIL-NEROLI-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-SOLEIL-NEROLI-100ML', stock: 50 },
    ],
  },
  {
    name: 'Noir Santal & Cardamom Essence',
    slug: 'noir-santal-cardamom-essence',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Warm Woody',
    images: ['/Images/image copy 5.png'],
    description: 'Creamy Mysore sandalwood harmonized with crushed green cardamom pods, violet leaf absolute, Florentine iris, and comforting grey ambergris. Smooth, intoxicating, and effortlessly modern.',
    keywords: ['sandalwood perfume', 'santal', 'cardamom', 'creamy woody', 'niche luxury perfume'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-NOIR-SANTAL-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-NOIR-SANTAL-100ML', stock: 50 },
    ],
  },
  {
    name: 'Golden Blonde Tobacco & Tonka',
    slug: 'golden-blonde-tobacco-tonka',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Oriental Spicy',
    images: ['/Images/image copy 6.png'],
    description: 'Rich blonde tobacco leaf infused with wild blossom honey, roasted cacao nibs, and spiced tonka bean over a bed of dried plum and sweet wood sap. A warm, luxurious declaration of distinction.',
    keywords: ['tobacco vanilla', 'tonka bean', 'honey spicy', 'luxury perfume india', 'oriental gourmand'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-GLDN-TOBACCO-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-GLDN-TOBACCO-100ML', stock: 50 },
    ],
  },
  {
    name: 'Aura Haitian Vetiver & Grapefruit',
    slug: 'aura-haitian-vetiver-grapefruit',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: false,
    fragranceType: 'Earthy Citrus',
    images: ['/Images/image copy 7.png'],
    description: 'A crisp, crystalline blend of zesty pink grapefruit, crushed pink peppercorns, smoky Haitian vetiver roots, and mineral oakmoss. Clean, focused, and endlessly refined for day-to-evening versatility.',
    keywords: ['vetiver', 'grapefruit', 'earthy citrus', 'fresh perfume', 'unisex fragrance'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-AURA-VETIVER-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-AURA-VETIVER-100ML', stock: 50 },
    ],
  },
  {
    name: 'Mystic Dark Patchouli & Musk',
    slug: 'mystic-dark-patchouli-musk',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: true,
    fragranceType: 'Earthy Amber',
    images: ['/Images/image copy 8.png'],
    description: 'Deep earthy Indonesian patchouli layered over white cashmere musk, golden labdanum resin, and subtle nuances of wild dark berries. Hypnotic, evocative, and deeply enchanting.',
    keywords: ['patchouli perfume', 'white musk', 'mystic amber', 'evening luxury fragrance'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-MYSTIC-PATCH-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-MYSTIC-PATCH-100ML', stock: 50 },
    ],
  },
  {
    name: 'Celestial Sambac Jasmine & Iris',
    slug: 'celestial-sambac-jasmine-iris',
    category: 'perfumes',
    price: 799,
    salePrice: null,
    onSale: false,
    hotSeller: false,
    fragranceType: 'Powdery Floral',
    images: ['/Images/image copy 9.png'],
    description: 'Night-blooming Indian Sambac jasmine married with powdery Florentine iris, sparkling Sicilian mandarin, and sensual crystalline amber. Exquisitely graceful and enduring.',
    keywords: ['jasmine perfume', 'iris', 'powdery floral', 'feminine luxury', 'signature scent'],
    hasVariants: true,
    variants: [
      { label: '50 ml (MRP ₹799)', sku: 'PERF-CELESTIAL-JASM-50ML', stock: 50 },
      { label: '100 ml (MRP ₹1499)', sku: 'PERF-CELESTIAL-JASM-100ML', stock: 50 },
    ],
  },
];

async function seedPerfumes() {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    for (const item of perfumeProducts) {
      const existing = await Product.findOne({ slug: item.slug });
      if (existing) {
        Object.assign(existing, item);
        await existing.save();
        console.log(`Updated: ${item.name}`);
      } else {
        await Product.create(item);
        console.log(`Created: ${item.name}`);
      }
    }

    console.log('\nAll 10 luxury perfumes updated with 50ml (₹799) and 100ml (₹1499) prices!\n');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding perfumes:', err.message);
    process.exit(1);
  }
}

seedPerfumes();
