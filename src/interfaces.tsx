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
    cocktail_pk: number;
    cocktail_name: string;
    user: string;
}

export type {
    Cocktail,
    Category,
    Ingredient,
    SavedCocktail,
}