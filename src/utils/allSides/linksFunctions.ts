export type Link = {
  id: number;
  href: string;
  label: string;
  isContained: boolean;
  links?: number[];
  isOpen?: boolean;
};

let links: Link[] = [
  { id: 1, href: "/blogs?page=1", label: "Home", isContained: false },
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
  {
    id: 3223137483,
    href: "/create-blog",
    label: "Create Blog",
    isContained: false
  },
  { id: 4, href: "/contact", label: "Contact", isContained: false },
  {
    id: 5,
    href: "/blogs?tag=appetizers",
    label: "Appetizers",
    isContained: true
  },
  { id: 6, href: "/blogs?tag=asian", label: "Asian", isContained: true },
  { id: 7, href: "/blogs?tag=baking", label: "Baking", isContained: true },
  { id: 8, href: "/blogs?tag=beef", label: "Beef", isContained: true },
  {
    id: 9,
    href: "/blogs?tag=breakfast",
    label: "Breakfast",
    isContained: true
  },
  { id: 10, href: "/blogs?tag=brunch", label: "Brunch", isContained: true },
  {
    id: 11,
    href: "/blogs?tag=budget-friendly",
    label: "Budget-Friendly",
    isContained: true
  },
  { id: 12, href: "/blogs?tag=chicken", label: "Chicken", isContained: true },
  { id: 13, href: "/blogs?tag=desserts", label: "Desserts", isContained: true },
  { id: 14, href: "/blogs?tag=family", label: "Family", isContained: true },
  { id: 15, href: "/blogs?tag=grilling", label: "Grilling", isContained: true },
  { id: 16, href: "/blogs?tag=healthy", label: "Healthy", isContained: true },
  { id: 17, href: "/blogs?tag=homemade", label: "Homemade", isContained: true },
  {
    id: 18,
    href: "/blogs?tag=international",
    label: "International",
    isContained: true
  },
  { id: 19, href: "/blogs?tag=italian", label: "Italian", isContained: true },
  { id: 20, href: "/blogs?tag=mexican", label: "Mexican", isContained: true },
  { id: 21, href: "/blogs?tag=party", label: "Party", isContained: true },
  { id: 22, href: "/blogs?tag=pasta", label: "Pasta", isContained: true },
  { id: 23, href: "/blogs?tag=quick", label: "Quick", isContained: true },
  { id: 24, href: "/blogs?tag=salads", label: "Salads", isContained: true },
  { id: 25, href: "/blogs?tag=seafood", label: "Seafood", isContained: true },
  { id: 26, href: "/blogs?tag=seasonal", label: "Seasonal", isContained: true },
  {
    id: 27,
    href: "/blogs?tag=slow-cooker",
    label: "Slow-Cooker",
    isContained: true
  },
  { id: 28, href: "/blogs?tag=snacks", label: "Snacks", isContained: true },
  { id: 29, href: "/blogs?tag=soups", label: "Soups", isContained: true },
  { id: 30, href: "/blogs?tag=vegan", label: "Vegan", isContained: true },
  {
    id: 31,
    href: "/blogs?tag=vegetables",
    label: "Vegetables",
    isContained: true
  },
  {
    id: 32,
    href: "/blogs?tag=vegetarian",
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
