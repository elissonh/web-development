import { products } from './data/products.js';
import { Cart } from './cart.js';
import { convertCentsToMoney } from './utils/utils.js'
import { getItemsCostCents } from './utils/math.js';

const cart = new Cart();

const sidebarEl = document.querySelector('.js-nav-sidebar');
const sidebarItemsContainerEl = document.querySelector('.js-sidebar-items');

renderProducts();
renderPage();

function renderPage() {
    updateCartCountElement();
    renderCartSidebar();
    addEventListeners();
}

function updateCartCountElement() {
    const cartTotalCount = cart.getItemsCount()
    const productCountEl = document.querySelector(".js-cart-product-count");

    if (cartTotalCount > 0) {
        productCountEl.classList.remove('display-none');
        productCountEl.innerHTML = cartTotalCount > 9 ? '9+' : cartTotalCount;
    } else {
        productCountEl.classList.add('display-none');
        productCountEl.innerHTML = '';
    }
}

function renderProducts() {
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
    })

    document.querySelectorAll(".js-add-to-cart")
        .forEach((item) => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                cart.addToCart(productId, 1);
                renderPage();
            })
        });
}

function renderCartSidebar() {
    const cartCount = cart.getItemsCount();
    const sidebarCartCountEl = document.querySelector('.js-sidebar-cart-count');
    const sidebarOrderCostEl = document.querySelector('.js-sidebar-order-cost');
    const itemsCostCents = getItemsCostCents(cart);

    sidebarCartCountEl.innerHTML = cartCount;
    sidebarOrderCostEl.innerHTML = convertCentsToMoney(itemsCostCents);

    if (cartCount <= 0) {
        sidebarItemsContainerEl.innerHTML = 'Carrinho vazio :(';
        return
    }
    sidebarItemsContainerEl.innerHTML = '';
    cart.items.forEach((cartItem) => {
        const productObj = products[cartItem.productId]
        const sidebarItemHtml = `
        <div class="js-sidebar-item sidebar-item" data-product-id="${cartItem.productId}">
            <img src=".${productObj.imagePath}" alt="" class="sidebar-item-image">
            <div class="side-item-details">
                <div class="product-title">
                    <p class="bold two-lines-text">${productObj.title}</p>
                    <span class="js-cart-delete-product product-cart-delete material-symbols-outlined">delete</span>
                </div>
                <p class="dimmed-text">R$<span>${convertCentsToMoney(productObj.priceCents)}</span></p>
                <div class="cart-item-update-options">
                    <span class="js-cart-decrease-product product-cart-update material-symbols-outlined">remove</span>
                    <span class="js-cart-item-quantity cart-item-quantity dimmed-text">${cartItem.quantity}</span>
                    <span class="js-cart-increase-product product-cart-update material-symbols-outlined">add</span>
                </div>
            </div>
        </div>
        `
        sidebarItemsContainerEl.innerHTML += sidebarItemHtml;
    })
}

function addEventListeners() {
    document.querySelectorAll('.js-open-cart-sidebar')
        .forEach((element) => {
            element.addEventListener('click', () => {
                openSideBar();
            })
        })
    document.querySelectorAll('.js-close-cart-sidebar')
        .forEach((element) => {
            element.addEventListener('click', () => {
                closeSideBar();
            })
        })
    document.getElementById('overlay')
        .addEventListener('click', () => {
            closeSideBar();
        })

    document.querySelectorAll('.js-sidebar-item')
        .forEach((element) => {
            const productId = element.dataset.productId;
            element.querySelector('.js-cart-increase-product')
                    .addEventListener('click', () => {
                        cart.increaseItemCount(productId);
                        renderPage();
                    });
            element.querySelector('.js-cart-decrease-product')
                .addEventListener('click', () => {
                    cart.decreaseItemCount(productId);
                    renderPage();
                });
            element.querySelector('.js-cart-delete-product')
                .addEventListener('click', () => {
                    cart.deleteItem(productId);
                    renderPage();
                });
        })
}

function openSideBar() {
    sidebarEl.classList.add('show');
    removeBodyScroll();
}

function closeSideBar() {
    sidebarEl.classList.remove('show');
    addBodyScroll();
}

function removeBodyScroll() {
    document.body.style.overflow = 'hidden';
}

function addBodyScroll() {
    document.body.style.overflow = 'auto';
}