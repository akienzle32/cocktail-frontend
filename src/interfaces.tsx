import { type } from "os";

interface Cocktail {
    [key: string]: string;
}

interface Category {
    [key: string]: string;
}

export type {
    Cocktail,
    Category,
}