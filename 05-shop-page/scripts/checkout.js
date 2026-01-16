import { cart, updateCartCountElements, increaseItemCount, decreaseItemCount, deleteItem, getItemsOnlyCost, cartIsEmpty} from "./cart.js"
import { products } from "./products.js";
import { convertCentsToMoney } from './utils/utils.js'

const cartTextPercentEl = document.querySelector('.js-cart-tax-percentage');
const cartItemsCostEl = document.querySelector('.js-cart-items-cost');
const cartsShippingCostEl = document.querySelector('.js-cart-shipping-cost');
const cartTotalNoTaxEl = document.querySelector('.js-cart-total-no-tax');
const cartTaxCostEl = document.querySelector('.js-cart-tax-cost');
const cartTotalCostEl = document.querySelector('.js-cart-total-cost');
const taxPercentageValue = 10;
const cartItemsContainerEl = document.querySelector('.cart-items-container');
const mainEl = document.querySelector('main');

loadPage();

function loadPage() {
    if (cartIsEmpty()) {
        mainEl.style = 'display: flex; align-items: center;';
        mainEl.innerHTML = '<h1>Carrinho vazio :(</h1>'
        return
    }
    updateOrderSummary();
    updateCartCountElements();
    updateCartItems();
    addEventListeners();
}

function updateOrderSummary() {
    cartTextPercentEl.innerHTML = taxPercentageValue;
    cartItemsCostEl.innerHTML = getItemsOnlyCost();
}

function updateCartItems() {
    cartItemsContainerEl.innerHTML = '';
    cart.forEach(cartItem => {
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
                        <span class="js-cart-increase-product  material-symbols-outlined">add</span>
                        <span class="js-cart-decrease-product  material-symbols-outlined">remove</span>
                        <span class="js-cart-delete-product product-delete-button">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <p class="delivery-options-title highlight-text">Choose a delivery option</p>
                    <div class="delivery-option">
                        <input type="radio" name="delivery-option-${cartItem.productId}" class="delivery-option-input">
                        <div>
                            <p class="delivery-option-date">Tuesday, 13 January</p>
                            <p class="delivery-option-price">FREE</p>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" name="delivery-option-${cartItem.productId}" class="delivery-option-input">
                        <div>
                            <p class="delivery-option-date">Friday, 9 January</p>
                            <p class="delivery-option-price"><span class="currency">R$</span>4.99</p>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" name="delivery-option-${cartItem.productId}" class="delivery-option-input">
                        <div>
                            <p class="delivery-option-date">Wednesday, 7 January</p>
                            <p class="delivery-option-price"><span class="currency">R$</span>9.99</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        cartItemsContainerEl.innerHTML += cartItemHtml;
    });
}

function addEventListeners() {
    document.querySelectorAll('.js-cart-item')
        .forEach((cartItemEl) => {
        const productId = cartItemEl.dataset.productId;

        cartItemEl.querySelector('.js-cart-increase-product')
            .addEventListener('click', () => {
                increaseItemCount(productId);
                loadPage();
            });
        cartItemEl.querySelector('.js-cart-decrease-product')
            .addEventListener('click', () => {
                decreaseItemCount(productId);
                loadPage();
            });
        cartItemEl.querySelector('.js-cart-delete-product')
            .addEventListener('click', () => {
                deleteItem(productId);
                loadPage();
            });
})
}