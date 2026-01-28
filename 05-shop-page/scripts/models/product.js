import { convertCentsToMoney } from "../utils/utils.js";

export class Product {
    id;
    title;
    priceCents;
    imagePath;

    constructor({id, title, price, images}) {
        this.id = id;
        this.title = title;
        this.priceCents = Math.round(price * 100);
        this.imagePath = images ? images[0] : 'sem-imagem';
    }

    getPriceMoney() {
        const priceMoney = convertCentsToMoney(this.priceCents);
        return `${priceMoney}`;
    }
}