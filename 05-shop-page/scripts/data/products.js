import { Product } from "../models/product.js";

export const products = await loadProducts();

async function loadProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=30&select=id,title,price,description,category,rating,images');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const loadedProducts = result.products.reduce(
            (accumulator, currentValue) => {
                accumulator[String(currentValue.id)] = new Product(currentValue);
                return accumulator;
            }, {});
        return loadedProducts;
    } catch (error) {
        console.error("Failed to load products");
    }
}
