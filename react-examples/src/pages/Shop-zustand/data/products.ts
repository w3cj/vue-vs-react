import { ProductInfo } from '../types';

const products: ProductInfo[] = [
  {
    id: 1,
    title: 'Syntax Pocket Tee',
    image:
      'https://sentry.shop/cdn/shop/files/Pocket-3.jpg?v=1697669378&width=300',
    price: 23,
    description:
      '100% ring spun cotton. Garment dyed for that lived-in feel and almost no shrinkage at home. Has a slightly more relaxed fit than most tech company tees. Not enough for most people to size up/down, just the vibe of the tee.',
    hasSize: true,
  },
  {
    id: 2,
    title: 'Syntax Skate Deck',
    image:
      'https://sentry.shop/cdn/shop/files/Skate-1.jpg?v=1698783764&width=300',
    price: 50,
    description:
      'The perfect background accessory for any video call. Popsicle Deck, 7-Ply Canadian Maple, 8" x 32". Does not include trucks or wheels.',
    hasSize: false,
  },
];

export default products;
