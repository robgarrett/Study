
/**
 * Greeter class.
 */
export default class Greeter implements GreeterInterface {
    public greeting: string;

    /**
     * Constructor.
     */
    constructor(message: string) {
        this.greeting = message;
    }

    /**
     * Greet method.
     */
    public greet() {
        return `Hello, ${this.greeting}`;
    }
}

