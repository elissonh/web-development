import { cart, getCartCount, getItemsCostCents } from "../cart.js";
import { deliveryOptions } from "../delivery-options.js";
import { convertCentsToMoney } from "../utils/utils.js";

const cartTextPercentEl = document.querySelector('.js-cart-tax-percentage');
const cartItemsCostEl = document.querySelector('.js-cart-items-cost');
const cartsShippingCostEl = document.querySelector('.js-cart-shipping-cost');
const cartTotalNoTaxEl = document.querySelector('.js-cart-total-no-tax');
const cartTaxCostEl = document.querySelector('.js-cart-tax-cost');
const cartTotalCostEl = document.querySelector('.js-cart-total-cost');
const taxPercentageValue = 10;
const currency = 'R$';

export function renderPaymentSummary() {
    const itemsCostCents = getItemsCostCents();
    const shippingCostCents = getShippingCostCents();
    const totalNoTaxCents = itemsCostCents + shippingCostCents
    const taxCostCents = itemsCostCents * (taxPercentageValue / 100);
    const totalCost = totalNoTaxCents + taxCostCents;

    updateCartCountElement();
    cartTextPercentEl.textContent = taxPercentageValue;
    cartItemsCostEl.innerHTML = `${currency}${convertCentsToMoney(itemsCostCents)}`;
    cartsShippingCostEl.innerHTML = `${currency}${convertCentsToMoney(shippingCostCents)}`;
    cartTotalNoTaxEl.innerHTML = `${currency}${convertCentsToMoney(totalNoTaxCents)}`;
    cartTaxCostEl.innerHTML = `${currency}${convertCentsToMoney(taxCostCents)}`;
    cartTotalCostEl.innerHTML = `${currency}${convertCentsToMoney(totalCost)}`;
}

function getShippingCostCents() {
    let total = 0;
    cart.forEach(cartItem => {
        const deliveryOption = deliveryOptions[cartItem.deliveryOptionId]
        total += deliveryOption.priceCents;
    });
    return total;
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