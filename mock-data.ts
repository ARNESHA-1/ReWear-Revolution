import type { Item, Swap } from './types';

export const allItems: Item[] = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    description:
      'A classic 90s vintage denim jacket. Perfectly worn in for a comfortable fit. Features two chest pockets and two side pockets. A timeless piece for any wardrobe.',
    images: ['https://cdna.lystit.com/520/650/n/photos/farfetch/c254302b/levis-blue-Skyline-Denim-Trucker-Jacket.jpeg'],
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', '90s', 'casual'],
    uploader: { name: 'Alex Doe', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
    featured: true,
    points: 150,
  },
  {
    id: 2,
    title: 'Floral Summer Dress',
    description:
      'Light and airy floral summer dress. Features a beautiful pattern, v-neck, and adjustable straps. Perfect for warm weather, vacations, or casual outings.',
    images: ['https://cdn.mos.cms.futurecdn.net/whowhatwear/posts/287911/floral-dresses-for-summer-287911-1593028013697-main.jpg?interlace=true&quality=70', 'https://placehold.co/600x800.png'],
    category: 'Dresses',
    type: 'Sundress',
    size: 'S',
    condition: 'New with tags',
    tags: ['summer', 'floral', 'lightweight', 'vacation'],
    uploader: { name: 'Jane Smith', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
    featured: true,
    points: 120,
  },
  {
    id: 3,
    title: 'Cozy Knit Sweater',
    description:
      'A super soft and cozy knit sweater in a neutral beige color. Great for layering in cooler months. Made from a comfortable wool blend.',
    images: ['https://i1.wp.com/edinburghcastle.com/wp-content/uploads/2019/12/Hand-Knit-Irish-Sweater-Natural.gif?fit=1024%2C1024&ssl=1'],
    category: 'Tops',
    type: 'Sweater',
    size: 'L',
    condition: 'Good',
    tags: ['cozy', 'knit', 'winter', 'neutral'],
    uploader: { name: 'Sam Jones', avatar: 'https://placehold.co/100x100.png' },
    status: 'Swapped',
    featured: true,
    points: 100,
  },
  {
    id: 4,
    title: 'High-Waisted Trousers',
    description:
      'Chic high-waisted trousers in black. Versatile for both office and casual wear. Features a straight-leg cut and a comfortable, flattering fit.',
    images: ['https://media-photos.depop.com/b0/31793680/1141249145_144665e10eed44b1bee9545fdfd04478/P0.jpg', 'https://placehold.co/600x800.png'],
    category: 'Bottoms',
    type: 'Trousers',
    size: '10',
    condition: 'Poor',
    tags: ['workwear', 'minimalist', 'classic'],
    uploader: { name: 'Chris Lee', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
    featured: true,
    points: 80,
  },
  {
    id: 5,
    title: 'Graphic Print T-Shirt',
    description: 'Soft cotton t-shirt with a unique retro graphic print. Perfect for a casual, laid-back look.',
    images: ['https://placehold.co/600x800.png'],
    category: 'Tops',
    type: 'T-Shirt',
    size: 'M',
    condition: 'Good',
    tags: ['graphic tee', 'casual', 'retro'],
    uploader: { name: 'Alex Doe', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
    featured: false,
    points: 50,
  },
  {
    id: 6,
    title: 'Leather Ankle Boots',
    description: 'Stylish leather ankle boots with a low heel. Some minor scuffs but in great wearable condition. Zip closure on the side.',
    images: ['https://cdna.lystit.com/520/650/n/photos/farfetch/0364ffee/michael-by-michael-kors-grey-Clara-90mm-ankle-length-boot.jpeg', 'https://placehold.co/600x800.png'],
    category: 'Shoes',
    type: 'Boots',
    size: '8',
    condition: 'Fair',
    tags: ['leather', 'boots', 'fall'],
    uploader: { name: 'Jane Smith', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
    featured: true,
    points: 90,
  },
];

export const featuredItems = allItems.filter(item => item.featured);

export const userItems = allItems.filter(item => item.uploader.name === 'Alex Doe');

export const swaps: Swap[] = [
    {
        id: 1,
        itemOffered: { id: 5, title: 'Graphic Print T-Shirt', image: 'https://placehold.co/100x100.png' },
        itemRequested: { id: 2, title: 'Floral Summer Dress', image: 'https://placehold.co/100x100.png' },
        status: 'Pending',
        date: '2024-05-20',
    },
    {
        id: 2,
        itemOffered: { id: 3, title: 'Cozy Knit Sweater', image: 'https://placehold.co/100x100.png' },
        itemRequested: { id: 1, title: 'Vintage Denim Jacket', image: 'https://placehold.co/100x100.png' },
        status: 'Completed',
        date: '2024-04-15',
    }
];

export const pendingItems: Item[] = [
    {
        id: 7,
        title: 'Silk Scarf',
        description: 'A beautiful 100% silk scarf with a paisley pattern. Vibrant colors.',
        images: ['https://placehold.co/600x800.png'],
        category: 'Accessories',
        type: 'Scarf',
        size: 'One Size',
        condition: 'Excellent',
        tags: ['silk', 'luxury', 'accessory'],
        uploader: { name: 'Pat Kim', avatar: 'https://placehold.co/100x100.png' },
        status: 'Pending Approval',
        points: 70,
    },
    {
        id: 8,
        title: 'Running Shorts',
        description: 'Lightweight athletic shorts, great for running or the gym. Has an inner lining and a small key pocket.',
        images: ['https://placehold.co/600x800.png'],
        category: 'Activewear',
        type: 'Shorts',
        size: 'M',
        condition: 'Good',
        tags: ['athletic', 'sporty', 'gym'],
        uploader: { name: 'Jordan Wu', avatar: 'https://placehold.co/100x100.png' },
        status: 'Pending Approval',
        points: 40,
    }
];
