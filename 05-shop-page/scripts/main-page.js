import { products } from './products.js';
import { addToCart, getCartCount } from './cart.js'
import { convertCentsToMoney } from './utils/utils.js'

renderProducts();

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

function renderProducts(){
    let productsContainer = document.querySelector('.js-products-container');
    productsContainer.innerHTML = '';

    // Loop through items in products object
    Object.entries(products).forEach(([_, item]) => {
        const productItemHtml = `
        <div class="product-item"">
            <img src=".${item.imagePath}" alt="Product image" class="product-item-image">
            <div class="product-item-description">
                <h2>${item.title}</h2>
                <div class="product-item-price">
                    <p><span class="currency">R$</span> ${convertCentsToMoney(item.priceCents)}</p>
                    <span class="js-add-to-cart material-symbols-outlined add-to-cart" data-product-id="${item.id}">shopping_bag</span>
                </div>
            </div>
        </div>
        `;
        productsContainer.innerHTML += productItemHtml;

    updateCartCountElement();

    document.querySelectorAll(".js-add-to-cart")
        .forEach((item) => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                addToCart(productId, 1);
                updateCartCountElement();
            })
        });
    })
}
