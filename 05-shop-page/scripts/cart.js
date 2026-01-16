// import { products} from "./products.js"
export const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(item) {
    cartTotalCount += item.quantity;
    cart.push({productId: item.productId, quantity: item.quantity});
    saveToStorage();
    updateCartCountElements();
}

function getCartTotalCount() {
    console.log(cart);
    if (cart.length === 0) return

    let totalCount = 0;
    cart.forEach((item) => {
        totalCount += item.quantity;
    });
    return totalCount;
}

export function updateCartCountElements() {
    const cartTotalCount = getCartTotalCount()
    console.log(cartTotalCount);
    if (cartTotalCount === 0) return;

    document.querySelectorAll(".cart-product-count")
        .forEach((item) => {
            item.innerHTML = cartTotalCount > 9 ? '9+' : cartTotalCount;
        });
}