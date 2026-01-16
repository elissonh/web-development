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
            quantity: quantity
        });
    }
    saveToStorage();
    updateCartCountElements();
}

export function getItemsOnlyCost() {
    let total = 0;

    cart.forEach(element => {
        const productObj = products[element.productId];
        const productPriceCents = productObj.priceCents;
        total += (productPriceCents * element.quantity)
    });
    total = convertCentsToMoney(total);
    return total;
}

export function cartIsEmpty() {
    if (cart.length === 0) return true

    cart.forEach(() => {
        return false;
    });
}

function getCartTotalCount() {
    if (cart.length === 0) return 0

    let totalCount = 0;
    cart.forEach((item) => {
        totalCount += item.quantity;
    });
    return totalCount;
}

export function updateCartCountElements(removeElement = false) {
    const cartTotalCount = getCartTotalCount()
    const productCountEl = document.querySelector(".js-cart-product-count");

    if (cartTotalCount > 0) {
        productCountEl.classList.remove('display-none');
        productCountEl.innerHTML = cartTotalCount > 9 ? '9+' : cartTotalCount;
    } else {
        productCountEl.classList.add('display-none');
        productCountEl.innerHTML = '';
    }
}
