import { ICategory } from "./icategory";

/**
 * [Day 6 Task 1] Product Interface
 * Updated to match the Platzi Fake Store API schema.
 */
export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: ICategory;
}