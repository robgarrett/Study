class Quarter {
    private value: number = 0.25;

    get Value(): number {
        return this.value;
    }

    getImageUrl(): string {
        return "img/Quarter.png";
    }
}
