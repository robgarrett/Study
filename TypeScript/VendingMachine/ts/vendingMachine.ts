/// <reference path="coin.ts" />
/// <reference path="product.ts" />
/// <reference path="productFactory.ts" />
/// <reference path="typings/knockout.d.ts" />

enum VendingMachineSize {
    small = 6,
    medium = 9,
    large = 12
}

class Cell {
    // Use of public in the constructor instructs TS
    // to create a public field of same name
    constructor(public product: CocaCola) {

    }

    stock = ko.observable(3);
    sold = ko.observable(false);
}

class VendingMachine {
    private paid = ko.observable(0);
    cells = ko.observableArray([]);
    selectedCell = ko.observable(new Cell(new CocaCola()));
    acceptedCoins: Quarter[] = [new Quarter()];
    canPay = ko.pureComputed(() => this.paid() - this.selectedCell().product.price >= 0);

    set size(givenSize: VendingMachineSize) {
        this.cells([]);
        for (let index = 0; index < givenSize; index++) {
            let product = productFactory.GetProduct();
            this.cells.push(new Cell(product));
        }
    }

    select = (cell: Cell): void => {
        cell.sold(false);
        this.selectedCell(cell);
    }
ı
    acceptCoin = (coin: Quarter) : void => {
        // In arrow functions 'this' is the containing object
        // In non-arrow functions 'this' is the caller class of this method.
        let oldTotal = this.paid();
        this.paid(oldTotal + coin.Value);
    }

    pay = (): void => {
        if (this.selectedCell().stock() < 1) {
            alert("I'm sorry we're all sold out!");
            return;
        }
        let currentPaid = this.paid();
        this.paid(Math.round(((currentPaid - this.selectedCell().product.price) * 100)) / 100);
        let currentStock = this.selectedCell().stock();
        this.selectedCell().stock(currentStock - 1);
        this.selectedCell().sold(true);
    }
}
