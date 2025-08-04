// Application data and constants
const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Nourishing Hair Mask',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    category: 'hairMasks',
    rating: 4.8,
    reviews: 127,
    description: 'Transform dry, damaged hair with our deeply nourishing mask enriched with organic argan oil and shea butter.',
    ingredients: 'Organic Argan Oil, Shea Butter, Coconut Oil, Vitamin E, Aloe Vera',
    howToUse: 'Apply to damp hair from mid-length to ends. Leave for 10-15 minutes, then rinse thoroughly.',
    benefits: ['Deep hydration', 'Repairs damage', 'Adds shine', 'Strengthens hair']
  },
  {
    id: 2,
    name: 'Silk Hair Serum',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    badge: 'New',
    category: 'serumsOils',
    rating: 4.9,
    reviews: 89,
    description: 'Lightweight serum that adds instant shine and smoothness while protecting against heat damage.',
    ingredients: 'Silk Proteins, Moroccan Oil, Jojoba Oil, Vitamin B5',
    howToUse: 'Apply 2-3 drops to damp or dry hair, focusing on ends. Style as usual.',
    benefits: ['Heat protection', 'Instant shine', 'Frizz control', 'Lightweight formula']
  },
  {
    id: 3,
    name: 'Curl Defining Cream',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    badge: 'Trending',
    category: 'styling',
    rating: 4.7,
    reviews: 156,
    description: 'Define and enhance your natural curls with this moisturizing cream that eliminates frizz.',
    ingredients: 'Shea Butter, Coconut Oil, Flaxseed Extract, Glycerin',
    howToUse: 'Apply to damp hair, scrunch gently, and air dry or diffuse.',
    benefits: ['Defines curls', 'Reduces frizz', 'Long-lasting hold', 'Natural ingredients']
  },
  {
    id: 4,
    name: 'Lavender Hair Oil',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    badge: 'Professional',
    category: 'serumsOils',
    rating: 4.6,
    reviews: 203,
    description: 'Calming lavender oil blend that nourishes hair and scalp while promoting relaxation.',
    ingredients: 'Lavender Essential Oil, Sweet Almond Oil, Rosemary Extract',
    howToUse: 'Massage into scalp and hair 30 minutes before washing, or use as overnight treatment.',
    benefits: ['Scalp health', 'Aromatherapy', 'Deep nourishment', 'Promotes growth']
  },
  {
    id: 5,
    name: 'Volumizing Shampoo',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
    category: 'shampooConditioner',
    rating: 4.5,
    reviews: 178,
    description: 'Gentle cleansing shampoo that adds volume and body to fine, limp hair.',
    ingredients: 'Rice Protein, Biotin, Panthenol, Natural Surfactants',
    howToUse: 'Massage into wet hair, lather, and rinse. Follow with conditioner.',
    benefits: ['Adds volume', 'Gentle cleansing', 'Strengthens hair', 'Sulfate-free']
  },
  {
    id: 6,
    name: 'Repair Treatment',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    category: 'treatments',
    rating: 4.8,
    reviews: 92,
    description: 'Intensive treatment for severely damaged hair, restoring strength and elasticity.',
    ingredients: 'Keratin, Collagen, Peptides, Ceramides',
    howToUse: 'Apply to clean, towel-dried hair. Leave for 20 minutes, then rinse.',
    benefits: ['Rebuilds structure', 'Intense repair', 'Restores elasticity', 'Salon-grade formula']
  }
];

const REVIEWS_DATA = [
  {
    id: 1,
    username: "sarah_chen",
    displayName: "Sarah Chen",
    location: "Toronto",
    timeAgo: "2h",
    rating: 5,
    review: {
      en: "Just left @lunelilas and I'm OBSESSED 😍 The hair mask completely transformed my damaged hair. After just one use, my hair feels like silk! #hairgoals #selfcare",
      fr: "Je viens de quitter @lunelilas et je suis OBSÉDÉE 😍 Le masque capillaire a complètement transformé mes cheveux abîmés. Après une seule utilisation, mes cheveux sont comme de la soie ! #cheveux #soins"
    },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b048?w=100&h=100&fit=crop&crop=face",
    product: {
      en: "Nourishing Hair Mask",
      fr: "Masque Capillaire Nourrissant"
    },
    likes: 247,
    comments: 18,
    verified: true
  },
  {
    id: 2,
    username: "emma.rdz",
    displayName: "Emma Rodriguez",
    location: "Vancouver",
    timeAgo: "4h",
    rating: 5,
    review: {
      en: "3 months with the silk serum and my hair has never been healthier ✨ The natural ingredients really make a difference. Thank you @lunelilas! #cleanhaircare #natural",
      fr: "3 mois avec le sérum soyeux et mes cheveux n'ont jamais été aussi sains ✨ Les ingrédients naturels font vraiment la différence. Merci @lunelilas ! #soinsnatural #bio"
    },
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    product: {
      en: "Silk Hair Serum",
      fr: "Sérum Capillaire Soyeux"
    },
    likes: 156,
    comments: 24,
    verified: false
  },
  {
    id: 3,
    username: "marie_dubois_",
    displayName: "Marie Dubois",
    location: "Montreal",
    timeAgo: "6h",
    rating: 5,
    review: {
      en: "Finally found my holy grail for curly hair! 🥰 The curl defining cream is a total game-changer - defined curls with zero frizz. Curly girls, you NEED this! #curlyhair #frizzfree",
      fr: "J'ai enfin trouvé mon Saint Graal pour cheveux bouclés ! 🥰 La crème définition boucles change tout - boucles définies sans frisottis. Les filles aux cheveux bouclés, vous en avez BESOIN ! #cheveusboucles"
    },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    product: {
      en: "Curl Defining Cream",
      fr: "Crème Définition Boucles"
    },
    likes: 389,
    comments: 52,
    verified: true
  },
  {
    id: 4,
    username: "jessica.kim",
    displayName: "Jessica Kim",
    location: "Calgary",
    timeAgo: "1d",
    rating: 5,
    review: {
      en: "The lavender hair oil smells like heaven and makes my hair so manageable 💜 Love that it's clean ingredients only. Self-care Sunday done right! #lavender #selflove",
      fr: "L'huile capillaire à la lavande sent le paradis et rend mes cheveux si faciles à coiffer 💜 J'adore qu'elle soit faite uniquement d'ingrédients propres. Dimanche bien-être réussi ! #lavande #soins"
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    product: {
      en: "Lavender Hair Oil",
      fr: "Huile Capillaire à la Lavande"
    },
    likes: 203,
    comments: 31,
    verified: false
  }
];

const FEATURE_ICONS = {
  salonTested: 'award',
  cleanIngredients: 'leaf',
  craftedInMontreal: 'map-pin',
  expertApproved: 'users'
};

const SERVICE_ICONS = {
  cuts: 'scissors',
  color: 'palette',
  treatments: 'sparkles',
  styling: 'crown'
};

const SOCIAL_PLATFORMS = [
  { icon: 'instagram', name: 'Instagram', gradient: 'from-purple-400 to-pink-400' },
  { icon: 'facebook', name: 'Facebook', gradient: 'from-pink-400 to-red-400' },
  { icon: 'twitter', name: 'Twitter', gradient: 'from-blue-400 to-blue-600' }
];

const STYLISTS_DATA = [
  {
    name: 'Camille Dubois',
    title: 'Founder & Master Stylist',
    specialty: 'Natural color & precision cuts',
    experience: '15 years experience',
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b048?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: 'Marie Laurent',
    title: 'Senior Stylist',
    specialty: 'Curly hair & texture specialist',
    experience: '8 years experience',
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: 'Sophie Chen',
    title: 'Color Specialist',
    specialty: 'Balayage & highlights',
    experience: '6 years experience',
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face"
  }
];

const PROVINCES = [
  { value: 'ON', label: 'Ontario' },
  { value: 'QC', label: 'Quebec' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'YT', label: 'Yukon' }
];

const TIME_SLOTS = [
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

window.appData = {
  PRODUCTS_DATA,
  REVIEWS_DATA,
  FEATURE_ICONS,
  SERVICE_ICONS,
  SOCIAL_PLATFORMS,
  STYLISTS_DATA,
  PROVINCES,
  TIME_SLOTS
};