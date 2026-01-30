import { convertCentsToMoney } from "../utils/utils.js";

export class Product {
    id;
    title;
    priceCents;
    imagePath;
    rating;

    constructor({id, title, price, images, rating}) {
        this.id = id;
        this.title = title;
        this.priceCents = Math.round(price * 100);
        this.imagePath = images ? images[0] : 'image-not-found';
        this.rating = rating
    }

    getPriceMoney() {
        const priceMoney = convertCentsToMoney(this.priceCents);
        return `${priceMoney}`;
    }
}