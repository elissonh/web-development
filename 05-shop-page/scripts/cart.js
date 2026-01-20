import { products } from "./products.js";
import { convertCentsToMoney } from './utils/utils.js'

export const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartMatchingItem(productId){
    let matchingItem;
    let matchingItemIndex;

    cart.forEach((cartItem, index) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
            matchingItemIndex = index;
        }
    })
    return [matchingItem, matchingItemIndex]
}

export function increaseItemCount(productId, count = 1) {
    const [matchingItem, _] = getCartMatchingItem(productId);
    if (!matchingItem) return;

    matchingItem.quantity = matchingItem.quantity + count;
    saveToStorage();
}

export function decreaseItemCount(productId, count = 1) {
    const [matchingItem, matchingItemIndex] = getCartMatchingItem(productId);
    if (!matchingItem) return;

    const newItemCount = matchingItem.quantity - count;
    if (newItemCount < 1) {
        cart.splice(matchingItemIndex, 1);
    } else {
        matchingItem.quantity = newItemCount;
    }
    saveToStorage();
}

export function deleteItem(productId) {
    const [matchingItem, matchingItemIndex] = getCartMatchingItem(productId);
    if (!matchingItem) return;

    cart.splice(matchingItemIndex, 1);
    saveToStorage();
}

export function addToCart(productId, quantity) {
    const [matchingItem, _] = getCartMatchingItem(productId);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: 1
        });
    }
    saveToStorage();
}

export function getItemsCostCents() {
    let total = 0;
    cart.forEach(element => {
        const productObj = products[element.productId];
        const productPriceCents = productObj.priceCents;
        total += (productPriceCents * element.quantity)
    });

    return total;
}

export function isCartEmpty() {
    if (cart.length === 0) return true

    cart.forEach(() => {
        return false;
    });
}

export function getCartCount() {
    if (cart.length === 0) return 0

    let totalCount = 0;
    cart.forEach((item) => {
        totalCount += item.quantity;
    });
    return totalCount;
}

export function updateDeliveryOption(productId, newDeliveryOption) {
    const [matchingItem, _] = getCartMatchingItem(productId);
    if (!matchingItem) return;

    matchingItem.deliveryOptionId = newDeliveryOption;
    saveToStorage();
}