export type Link = {
  id: number;
  href: string;
  label: string;
  isContained: boolean;
  links?: number[];
  isOpen?: boolean;
};

let links: Link[] = [
  { id: 1, href: "/blogs?p=1", label: "Home", isContained: false },
  { id: 2, href: "/about", label: "About", isContained: false },
  {
    id: 3,
    href: "/blogs",
    label: "Recipe Index",
    links: [
      5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 32
    ],
    isContained: false
  },
  { id: 4, href: "/contact", label: "Contact", isContained: false },
  {
    id: 5,
    href: "appetizers",
    label: "Appetizers",
    isContained: true
  },
  { id: 6, href: "asian", label: "Asian", isContained: true },
  { id: 7, href: "baking", label: "Baking", isContained: true },
  { id: 8, href: "beef", label: "Beef", isContained: true },
  {
    id: 9,
    href: "breakfast",
    label: "Breakfast",
    isContained: true
  },
  { id: 10, href: "brunch", label: "Brunch", isContained: true },
  {
    id: 11,
    href: "budget-friendly",
    label: "Budget-Friendly",
    isContained: true
  },
  { id: 12, href: "chicken", label: "Chicken", isContained: true },
  { id: 13, href: "desserts", label: "Desserts", isContained: true },
  { id: 14, href: "family", label: "Family", isContained: true },
  { id: 15, href: "grilling", label: "Grilling", isContained: true },
  { id: 16, href: "healthy", label: "Healthy", isContained: true },
  { id: 17, href: "homemade", label: "Homemade", isContained: true },
  {
    id: 18,
    href: "international",
    label: "International",
    isContained: true
  },
  { id: 19, href: "italian", label: "Italian", isContained: true },
  { id: 20, href: "mexican", label: "Mexican", isContained: true },
  { id: 21, href: "party", label: "Party", isContained: true },
  { id: 22, href: "pasta", label: "Pasta", isContained: true },
  { id: 23, href: "quick", label: "Quick", isContained: true },
  { id: 24, href: "salads", label: "Salads", isContained: true },
  { id: 25, href: "seafood", label: "Seafood", isContained: true },
  { id: 26, href: "seasonal", label: "Seasonal", isContained: true },
  {
    id: 27,
    href: "slow-cooker",
    label: "Slow-Cooker",
    isContained: true
  },
  { id: 28, href: "snacks", label: "Snacks", isContained: true },
  { id: 29, href: "soups", label: "Soups", isContained: true },
  { id: 30, href: "vegan", label: "Vegan", isContained: true },
  {
    id: 31,
    href: "vegetables",
    label: "Vegetables",
    isContained: true
  },
  {
    id: 32,
    href: "vegetarian",
    label: "Vegetarian",
    isContained: true
  }
];

export const getAllLinks = () => {
  return links;
};

export const getMainLinks = () => {
  return links.filter((link) => !link.isContained);
};

export const getRecipeIndexLinks = () => {
  const recipeIndexLinks = links.find((l) => l.id === 3);
  if (!recipeIndexLinks) return;
  return links.filter((l) => recipeIndexLinks.links!.includes(l.id));
};
