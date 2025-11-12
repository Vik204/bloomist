export interface Flower {
  id: number
  name: string
  price: string
  image: string
  description: string
  category: string
  details?: string
}

export const flowers: Flower[] = [
  {
    id: 1,
    name: "Red Roses Bouquet",
    price: "$25",
    image: "/placeholder.svg?key=w1u9y",
    description:
      "A stunning arrangement of freshly picked crimson red roses, perfect for expressing love and admiration. Hand-selected stems are arranged with lush green foliage and delicate white filler flowers, creating a classic and timeless bouquet.",
    category: "Bouquets",
    details:
      "Beautiful arrangement of 12 premium red roses with green foliage. Perfect for romantic occasions, anniversaries, or special celebrations. Each rose is hand-selected for freshness and beauty.",
  },
  {
    id: 2,
    name: "Sunflower Bundle",
    price: "$18",
    image: "/placeholder.svg?key=es31r",
    description:
      "Bring warmth and joy with our cheerful sunflower bundle. These vibrant golden blooms are arranged with complementary greenery and accent flowers to create an uplifting arrangement that brightens any room.",
    category: "Seasonal",
    details:
      "A cheerful collection of vibrant sunflowers that instantly brightens any space. These golden blooms symbolize happiness and positivity. Great for weddings, celebrations, or as a thoughtful gift.",
  },
  {
    id: 3,
    name: "Orchid Arrangement",
    price: "$40",
    image: "/placeholder.svg?key=9oez0",
    description:
      "Experience exotic elegance with our premium orchid arrangement. Featuring rare and exotic orchid varieties in soft pastels and jewel tones, perfect for special occasions or adding sophistication to any space.",
    category: "Gifts",
    details:
      "Sophisticated arrangement featuring rare and exotic orchids. Each orchid is carefully selected and arranged by our expert florists. These exotic flowers are long-lasting and truly stunning.",
  },
  {
    id: 4,
    name: "Tulip Spring Collection",
    price: "$22",
    image: "/placeholder.svg?key=i0jfi",
    description:
      "Welcome spring with our vibrant tulip collection. A mix of stunning tulip colors arranged with fresh greens, perfect for brightening up your home or gifting to someone special.",
    category: "Seasonal",
    details:
      "A vibrant mix of assorted tulips in various pastel colors. These spring beauties symbolize perfect love and elegance. Ideal for spring celebrations and bringing fresh energy to any room.",
  },
  {
    id: 5,
    name: "Lavender Bliss",
    price: "$28",
    image: "/placeholder.svg?key=bkiu4",
    description:
      "Calming and beautiful, our lavender arrangement features premium lavender stems combined with complementary dried flowers and greenery. Perfect for relaxation and adding a touch of elegance.",
    category: "Bouquets",
    details:
      "Beautiful arrangement of fragrant lavender flowers. Known for their calming properties and delicate beauty. Perfect for relaxation, spa themes, or as a unique gift for someone special.",
  },
  {
    id: 6,
    name: "Wedding Classic",
    price: "$55",
    image: "/placeholder.svg?key=k8ka2",
    description:
      "Our signature wedding arrangement featuring premium white roses, baby's breath, and eucalyptus. Elegantly arranged for the perfect ceremony or celebration of love and commitment.",
    category: "Gifts",
    details:
      "Exquisite arrangement of white and pink lilies. Known for their large, fragrant blooms and elegant appearance. These premium lilies make a grand statement for weddings, funerals, or special events.",
  },
]

export const categories = ["All", "Bouquets", "Gifts", "Seasonal"]
