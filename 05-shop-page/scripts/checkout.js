import { cart, updateCartCountElements } from "./cart.js"

updateCartCountElements();
console.log(cart);

`
<div class="cart-item container">
    <img src="./assets/products/watch.jpg" alt="Product image" class="product-image">
    <div class="product-info">
        <p class="product-name highlight-text">Product Name</p>
        <p class="product-price"><span>R$</span>9.99</p>
        <div class="product-quantity">
            <p>Quantity: <span>2</span></p>
        </div>
        <div class="product-cart-update">
            <span class="material-symbols-outlined">add</span>
            <span class="material-symbols-outlined">remove</span>
            <span class="product-delete-button">Delete</span>
        </div>
    </div>
    <div class="delivery-options">
        <p class="delivery-options-title highlight-text">Choose a delivery option</p>
        <div class="delivery-option">
            <input type="radio" name="delivery-option-x" class="delivery-option-input">
            <div>
                <p class="delivery-option-date">Tuesday, 13 January</p>
                <p class="delivery-option-price">FREE</p>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" name="delivery-option-x" class="delivery-option-input">
            <div>
                <p class="delivery-option-date">Friday, 9 January</p>
                <p class="delivery-option-price"><span class="currency">R$</span>4.99</p>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" name="delivery-option-x" class="delivery-option-input">
            <div>
                <p class="delivery-option-date">Wednesday, 7 January</p>
                <p class="delivery-option-price"><span class="currency">R$</span>9.99</p>
            </div>
        </div>
    </div>
</div>
`

