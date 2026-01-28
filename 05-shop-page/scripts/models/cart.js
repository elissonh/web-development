export class Cart {
    items;

    constructor() {
        this.#getFromStorage();
    }

    #getFromStorage() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    #saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
    
    #getCartMatchingItem(productId){
        let matchingItem;
        let matchingItemIndex;
    
        this.items.forEach((cartItem, index) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
                matchingItemIndex = index;
            }
        })
        return [matchingItem, matchingItemIndex]
    }
    
    increaseItemCount(productId, count = 1) {
        const [matchingItem, _] = this.#getCartMatchingItem(productId);
        if (!matchingItem) return;
    
        matchingItem.quantity = matchingItem.quantity + count;
        this.#saveToStorage();
    }
    
    decreaseItemCount(productId, count = 1) {
        const [matchingItem, matchingItemIndex] = this.#getCartMatchingItem(productId);
        if (!matchingItem) return;
    
        const newItemCount = matchingItem.quantity - count;
        if (newItemCount < 1) {
            this.items.splice(matchingItemIndex, 1);
        } else {
            matchingItem.quantity = newItemCount;
        }
        this.#saveToStorage();
    }
    
    deleteItem(productId) {
        const [matchingItem, matchingItemIndex] = this.#getCartMatchingItem(productId);
        if (!matchingItem) return;
    
        this.items.splice(matchingItemIndex, 1);
        this.#saveToStorage();
    }
    
    addToCart(productId, quantity) {
        const [matchingItem, _] = this.#getCartMatchingItem(productId);
    
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.items.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: 1
            });
        }
        this.#saveToStorage();
    }

    updateDeliveryOption(productId, newDeliveryOption) {
        const [matchingItem, _] = this.#getCartMatchingItem(productId);
        if (!matchingItem) return;
    
        matchingItem.deliveryOptionId = newDeliveryOption;
        this.#saveToStorage();
    }
    
    isCartEmpty() {
        if (this.items.length === 0) return true

        this.items.forEach(() => {
            return false;
        });
    }
    
    getItemsCount() {
        if (this.isCartEmpty()) return 0

        let totalCount = 0;
        this.items.forEach((item) => {
            totalCount += item.quantity;
        });
        return totalCount;
    }
}