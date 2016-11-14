
export abstract class Coin {

    protected imagePath = "img/";

    constructor(private value: number) {
        this.value = value;
    }

    abstract getImageUrl(): string;

    get Value(): number {
        return this.value;
    }
}

export class Quarter extends Coin {

    constructor() {
        super(0.25);
    }

    getImageUrl(): string {
        return this.imagePath + "Quarter.png";
    }
}

export class Dime extends Coin {

    constructor() {
        super(0.1);
    }

    getImageUrl(): string {
        return this.imagePath + "Dime.png";
    }
}

export class Half extends Coin {

    constructor() {
        super(0.5);
    }

    getImageUrl(): string {
        return this.imagePath + "Half.png";
    }
}

export class Dollar extends Coin {

    constructor() {
        super(1);
    }

    getImageUrl(): string {
        return this.imagePath + "Dollar.jpg";
    }
}
