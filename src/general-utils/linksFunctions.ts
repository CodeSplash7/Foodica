import { Link } from "@/types/link-types";
import {
  aboutPageLink,
  blogsLinkByPage,
  blogsPageLink,
  blogsLinkByTag,
  contactPageLink,
  createBlogPageLink
} from "@/general-utils/app-routes";

let links: Link[] = [
  { id: 1, href: blogsLinkByPage(1), label: "Home", isContained: false },
  { id: 2, href: aboutPageLink, label: "About", isContained: false },
  {
    id: 3,
    href: blogsPageLink,
    label: "Recipe Index",
    links: [
      5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 32
    ],
    isContained: false
  },
  {
    id: 3223137483,
    href: createBlogPageLink(),
    label: "Create Blog",
    isContained: false
  },
  { id: 4, href: contactPageLink, label: "Contact", isContained: false },
  {
    id: 5,
    href: blogsLinkByTag("Appetizers"),
    label: "Appetizers",
    isContained: true
  },
  {
    id: 6,
    href: blogsLinkByTag("Asian"),
    label: "Asian",
    isContained: true
  },
  {
    id: 7,
    href: blogsLinkByTag("Baking"),
    label: "Baking",
    isContained: true
  },
  {
    id: 8,
    href: blogsLinkByTag("Beef"),
    label: "Beef",
    isContained: true
  },
  {
    id: 9,
    href: blogsLinkByTag("Breakfast"),
    label: "Breakfast",
    isContained: true
  },
  {
    id: 10,
    href: blogsLinkByTag("Brunch"),
    label: "Brunch",
    isContained: true
  },
  {
    id: 11,
    href: blogsLinkByTag("Budget-Friendly"),
    label: "Budget-Friendly",
    isContained: true
  },
  {
    id: 12,
    href: blogsLinkByTag("Chicken"),
    label: "Chicken",
    isContained: true
  },
  {
    id: 13,
    href: blogsLinkByTag("Desserts"),
    label: "Desserts",
    isContained: true
  },
  {
    id: 14,
    href: blogsLinkByTag("Family"),
    label: "Family",
    isContained: true
  },
  {
    id: 15,
    href: blogsLinkByTag("Grilling"),
    label: "Grilling",
    isContained: true
  },
  {
    id: 16,
    href: blogsLinkByTag("Healthy"),
    label: "Healthy",
    isContained: true
  },
  {
    id: 17,
    href: blogsLinkByTag("Homemade"),
    label: "Homemade",
    isContained: true
  },
  {
    id: 18,
    href: blogsLinkByTag("International"),
    label: "International",
    isContained: true
  },
  {
    id: 19,
    href: blogsLinkByTag("Italian"),
    label: "Italian",
    isContained: true
  },
  {
    id: 20,
    href: blogsLinkByTag("Mexican"),
    label: "Mexican",
    isContained: true
  },
  {
    id: 21,
    href: blogsLinkByTag("Party"),
    label: "Party",
    isContained: true
  },
  {
    id: 22,
    href: blogsLinkByTag("Pasta"),
    label: "Pasta",
    isContained: true
  },
  {
    id: 23,
    href: blogsLinkByTag("Quick"),
    label: "Quick",
    isContained: true
  },
  {
    id: 24,
    href: blogsLinkByTag("Salads"),
    label: "Salads",
    isContained: true
  },
  {
    id: 25,
    href: blogsLinkByTag("Seafood"),
    label: "Seafood",
    isContained: true
  },
  {
    id: 26,
    href: blogsLinkByTag("Seasonal"),
    label: "Seasonal",
    isContained: true
  },
  {
    id: 27,
    href: blogsLinkByTag("Slow-Cooker"),
    label: "Slow-Cooker",
    isContained: true
  },
  {
    id: 28,
    href: blogsLinkByTag("Snacks"),
    label: "Snacks",
    isContained: true
  },
  {
    id: 29,
    href: blogsLinkByTag("Soups"),
    label: "Soups",
    isContained: true
  },
  {
    id: 30,
    href: blogsLinkByTag("Vegan"),
    label: "Vegan",
    isContained: true
  },
  {
    id: 31,
    href: blogsLinkByTag("Vegetables"),
    label: "Vegetables",
    isContained: true
  },
  {
    id: 32,
    href: blogsLinkByTag("Vegetarian"),
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
