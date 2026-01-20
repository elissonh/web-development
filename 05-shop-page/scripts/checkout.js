import { isCartEmpty } from "./cart.js"
import { renderOrderSummary } from "./checkout/order-summary.js"

const mainEl = document.querySelector('main');

function renderPage() {
    if (isCartEmpty()) {
        mainEl.style = 'display: flex; align-items: center;';
        mainEl.innerHTML = '<h1>Carrinho vazio :(</h1>'
        return
    }
    renderOrderSummary();
    // renderPaymentSummary();
}

renderPage();

