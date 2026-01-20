import { getCartCount } from "./cart.js"


const cartTextPercentEl = document.querySelector('.js-cart-tax-percentage');
const cartItemsCostEl = document.querySelector('.js-cart-items-cost');
const cartsShippingCostEl = document.querySelector('.js-cart-shipping-cost');
const cartTotalNoTaxEl = document.querySelector('.js-cart-total-no-tax');
const cartTaxCostEl = document.querySelector('.js-cart-tax-cost');
const cartTotalCostEl = document.querySelector('.js-cart-total-cost');
const taxPercentageValue = 10;

export function renderPaymentSummary() {
    cartTextPercentEl.innerHTML = taxPercentageValue;
    cartItemsCostEl.innerHTML = getItemsOnlyCost();
    updateCartCountElement();
}

function updateCartCountElement() {
    const cartTotalCount = getCartCount()
    const productCountEl = document.querySelector(".js-cart-product-count");

    if (cartTotalCount > 0) {
        productCountEl.classList.remove('display-none');
        productCountEl.innerHTML = cartTotalCount > 9 ? '9+' : cartTotalCount;
    } else {
        productCountEl.classList.add('display-none');
        productCountEl.innerHTML = '';
    }
}