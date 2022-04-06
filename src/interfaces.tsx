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
    id: number;
    cocktail_pk: number;
    cocktail_name: string;
    user: string;
}

interface SavedIngredient {
    id: number;
    ingredient: string;
    user: string;
}

export type {
    Cocktail,
    Category,
    Ingredient,
    SavedCocktail,
    SavedIngredient,
}