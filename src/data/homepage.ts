import { StepCard, Category } from "@/types/homepage";

import {
  Earth,
  Palette,
  CarFront,
  Library,
  Building2,
  Shirt,
  Cherry,
  Cross,
  BookOpenText,
  Book,
  Clapperboard,
  Flag,
  Building,
  Microscope,
  Volleyball,
  Cpu,
  Theater,
  Plane,
  Globe,
} from "lucide-react";

export const serviceSteps: StepCard[] = [
  {
    title: "Choose Your Interests",
    description:
      "Select the news categories you love: world news, tech, sports, entertainment—you name it!",
  },
  {
    title: "Enter Your Details",
    description:
      "Provide your email or phone number and we'll handle the rest.",
  },
  {
    title: "That's It!",
    description:
      "Sit back and enjoy personalized news updates, curated just for you.",
  },
];

export const categories: Category[] = [
  { name: "General", value: "world", icon: Globe },
  { name: "Arts", value: "arts", icon: Palette },
  { name: "Automobiles", value: "automobiles", icon: CarFront },
  { name: "Books", value: "books", icon: Library },
  { name: "Business", value: "business", icon: Building2 },
  { name: "Fashion", value: "fashion", icon: Shirt },
  { name: "Food", value: "food", icon: Cherry },
  { name: "Health", value: "health", icon: Cross },
  { name: "Insider", value: "insider", icon: Book },
  { name: "Magazine", value: "magazine", icon: BookOpenText },
  { name: "Movies", value: "movies", icon: Clapperboard },
  { name: "Politics", value: "politics", icon: Flag },
  { name: "Realestate", value: "realestate", icon: Building },
  { name: "Science", value: "science", icon: Microscope },
  { name: "Sports", value: "sports", icon: Volleyball },
  { name: "Technology", value: "technology", icon: Cpu },
  { name: "Theater", value: "theater", icon: Theater },
  { name: "Travel", value: "travel", icon: Plane },
];
