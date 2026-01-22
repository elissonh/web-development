// import { cart, increaseItemCount, decreaseItemCount, deleteItem, updateDeliveryOption} from "../cart.js"
import { cart } from "../checkout.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/delivery-options.js";
import { convertCentsToMoney } from '../utils/utils.js'
import { addDays, formatDateToString } from "../utils/date.js";
import { renderCheckout } from "../checkout.js";



export function renderOrderSummary() {
    const cartItemsContainerEl = document.querySelector('.cart-items-container');

    cartItemsContainerEl.innerHTML = '';
    cart.items.forEach(cartItem => {
        const productObj = products[cartItem.productId];
        const cartItemHtml = `
            <div class="js-cart-item cart-item container" data-product-id=${cartItem.productId}>
                <img src=".${productObj.imagePath}" alt="Product image" class="product-image">
                <div class="product-info">
                    <p class="product-name highlight-text">${productObj.title}</p>
                    <p class="product-price"><span>R$</span>${convertCentsToMoney(productObj.priceCents)}</p>
                    <div class="product-quantity">
                        <p>Quantity: <span>${cartItem.quantity}</span></p>
                    </div>
                    <div class="product-cart-update">
                        <span class="js-cart-increase-product material-symbols-outlined">add</span>
                        <span class="js-cart-decrease-product material-symbols-outlined">remove</span>
                        <span class="js-cart-delete-product product-delete-button">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <p class="delivery-options-title highlight-text">Choose a delivery option</p>
                    ${getDeliveryOptionsHtml(cartItem.productId, cartItem.deliveryOptionId)}
                </div>
            </div>
        `
        cartItemsContainerEl.innerHTML += cartItemHtml;
        addEventListeners();
    });
}

function getDeliveryOptionsHtml(productId, itemDeliveryOptionId) {
    const currentDate = new Date();

    let deliveryOptionsHtml = '';
    Object.entries(deliveryOptions).forEach(([deliveryOptionId, deliveryOption]) => {        
        const deliveryDate = addDays(currentDate, deliveryOption.days); // Add 10 days
        const deliveryDateString = formatDateToString(deliveryDate);
        const deliveryPrice = deliveryOption.priceCents > 0
            ? `R$${convertCentsToMoney(deliveryOption.priceCents)}`
            : 'FREE';
        const isChecked = Number(itemDeliveryOptionId) === Number(deliveryOptionId);

        deliveryOptionsHtml += `
            <div class="delivery-option js-delivery-option" data-delivery-option-id="${deliveryOptionId}">
                <input type="radio" ${isChecked ? 'checked' : ''} name="delivery-option-${productId}" class="delivery-option-input">
                <div>
                    <p class="delivery-option-date">${deliveryDateString}</p>
                    <p class="delivery-option-price">${deliveryPrice}</p>
                </div>
            </div>
        `
    })
    return deliveryOptionsHtml;
}

function addEventListeners() {
    document.querySelectorAll('.js-cart-item')
        .forEach((cartItemEl) => {
        const productId = cartItemEl.dataset.productId;

        cartItemEl.querySelector('.js-cart-increase-product')
            .addEventListener('click', () => {
                cart.increaseItemCount(productId);
                renderCheckout();
            });
        cartItemEl.querySelector('.js-cart-decrease-product')
            .addEventListener('click', () => {
                cart.decreaseItemCount(productId);
                renderCheckout();
            });
        cartItemEl.querySelector('.js-cart-delete-product')
            .addEventListener('click', () => {
                cart.deleteItem(productId);
                renderCheckout();
            });

        cartItemEl.querySelectorAll('.js-delivery-option').forEach((element) => {
            const deliveryOptionId = element.dataset.deliveryOptionId;
            element.addEventListener('click', () => {
                cart.updateDeliveryOption(productId, deliveryOptionId);
                renderCheckout();
            })
        })
    })
}