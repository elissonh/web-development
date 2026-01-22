import { products } from "../data/products.js";

export function getItemsCostCents(cart) {
    let total = 0;
    cart.items.forEach(cartItem => {
        const productObj = products[cartItem.productId];
        const productPriceCents = productObj.priceCents;
        total += (productPriceCents * cartItem.quantity)
    });

    return total;
}