export type TypeValue = {
  category?: string;
  subcategory?: string;
  sleeveStyle?: string;
};

export type SizeCategory = "men" | "women" | "unisex" | "kids";

export type AgeRange = { id: string; from: string; to: string };

export type SizesValue = {
  category?: SizeCategory;
  options: string[];
  ageRanges: AgeRange[];
};

export type Photo = { id: string; cover: boolean; url: string; name?: string };
