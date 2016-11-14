import * as categories from "./ProductCategory";

export interface Product {
    name: string;
    price: number;
    category?: categories.ProductCategory;
}

export class Initial implements Product {
    name = "Please select a product";
    price = 0;
}

export class CocaCola implements Product {
    name = "Coca-cola";
    price = 2.30;
    category = new categories.SodaCategory();
}

export class Fanta implements Product {
    name = "Fanta";
    price = 2.30;
    category = new categories.SodaCategory();
}

export class Sprite implements Product {
    name = "Sprite";
    price = 2.30;
    category = new categories.SodaCategory();
}

export class Peanuts implements Product {
    name = "Peanuts";
    price = 1.00;
    category = new categories.NutsCategory();
}

export class Cashews implements Product {
    name = "Cashews";
    price = 1.00;
    category = new categories.NutsCategory();
}

export class Plain implements Product {
    name = "Plain";
    price = 1.00;
    category = new categories.PotatoChipsCategory();
}

export class Cheddar implements Product {
    name = "Cheddar";
    price = 1.00;
    category = new categories.PotatoChipsCategory();
}

export class Mints implements Product {
    name = "Cheddar";
    price = 0.25;
    category = new categories.CandyCategory();
}

export class Gummies implements Product {
    name = "Gummies";
    price = 1.90;
    category = new categories.CandyCategory();
}

export class Hersey implements Product {
    name = "Hersey";
    price = 1.80;
    category = new categories.CandyBarCategory();
}

export class MilkyWay implements Product {
    name = "Milky Way";
    price = 1.80;
    category = new categories.CandyBarCategory();
}
