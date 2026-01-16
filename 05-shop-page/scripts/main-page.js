import { products } from './products.js';
import { addToCart, updateCartCountElements } from './cart.js'

initializeProducts();
updateCartCountElements();

function initializeProducts(){
    let productsContainer = document.querySelector('.js-products-container');
    productsContainer.innerHTML = '';
    products.forEach((item) => {
        const productItemHtml = `
        <div class="product-item"">
            <img src=".${item.imagePath}" alt="Product image" class="product-item-image">
            <div class="product-item-description">
                <h2>${item.title}</h2>
                <div class="product-item-price">
                    <p><span class="currency">R$</span> ${item.price}</p>
                    <span class="js-add-to-cart material-symbols-outlined add-to-cart" data-product-id="${item.id}">shopping_bag</span>
                </div>
                
            </div>
        </div>
        `;
        productsContainer.innerHTML += productItemHtml;
    })
}

document.querySelectorAll(".js-add-to-cart")
    .forEach((item) => {
        item.addEventListener('click', () => {
            const productId = item.dataset.productId;
            addToCart({
                productId: productId, quantity: 1
            });
        })
    });