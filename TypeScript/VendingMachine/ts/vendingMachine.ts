/// <reference path="./coin.ts" />
class VendingMachine {
    private paid = ko.observable(0);
    acceptedCoins: Quarter[] = [new Quarter()];
    acceptCoin = (coin: Quarter) : void => {
        // In arrow functions 'this' is the containing object
        // In non-arrow functions 'this' is the caller class of this method.
        let oldTotal = this.paid();
        this.paid(oldTotal + coin.Value);
    }
}
