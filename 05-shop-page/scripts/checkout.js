import { isCartEmpty } from "./cart.js"
import { renderOrderSummary } from "./checkout/order-summary.js"
import { renderPaymentSummary } from "./checkout/payment-summary.js";

const mainEl = document.querySelector('main');

export function renderCheckout() {
    if (isCartEmpty()) {
        mainEl.style = 'display: flex; align-items: center;';
        mainEl.innerHTML = '<h1>Carrinho vazio :(</h1>'
        return
    }
    renderOrderSummary();
    renderPaymentSummary();
    mainEl.style.visibility = 'visible';
}

renderCheckout();

