import { type } from "os";

interface Cocktail {
    [key: string]: string;
}

interface Category {
    [key: string]: string;
}

interface Ingredient {
    [key: string]: string;
}

interface SavedCocktail {
    cocktail: number;
    user: string;
}

export type {
    Cocktail,
    Category,
    Ingredient,
    SavedCocktail,
}