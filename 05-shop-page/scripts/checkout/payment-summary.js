// import { Cart } from "../cartClass.js";
import { cart } from "../checkout.js";
import { deliveryOptions } from "../data/delivery-options.js";
import { convertCentsToMoney } from "../utils/utils.js";
import { getItemsCostCents } from '../utils/math.js'

const cartTextPercentEl = document.querySelector('.js-cart-tax-percentage');
const cartItemsCostEl = document.querySelector('.js-cart-items-cost');
const cartsShippingCostEl = document.querySelector('.js-cart-shipping-cost');
const cartTotalNoTaxEl = document.querySelector('.js-cart-total-no-tax');
const cartTaxCostEl = document.querySelector('.js-cart-tax-cost');
const cartTotalCostEl = document.querySelector('.js-cart-total-cost');
const taxPercentageValue = 10;
const currency = 'R$';

export function renderPaymentSummary() {
    const itemsCostCents = getItemsCostCents(cart);
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
    cart.items.forEach(cartItem => {
        const deliveryOption = deliveryOptions[cartItem.deliveryOptionId]
        total += deliveryOption.priceCents;
        console.log(cart);
    });
    return total;
}

function updateCartCountElement() {
    const cartItemsCount = cart.getItemsCount()
    const productCountEl = document.querySelector(".js-cart-product-count");

    if (cartItemsCount > 0) {
        productCountEl.classList.remove('display-none');
        productCountEl.innerHTML = cartItemsCount > 9 ? '9+' : cartItemsCount;
    } else {
        productCountEl.classList.add('display-none');
        productCountEl.innerHTML = '';
    }
}