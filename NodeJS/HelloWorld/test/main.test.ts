/// <reference path="../src/interfaces.d.ts" />
import { expect } from "chai";
import Greeter from "../src/greeter";

/**
 * Our test set.
 */
describe("Greeter Class", () => {
    /**
     * Test Method
     */
    it("Should set msg when an instance is created", () => {
        let expected = "world!";
        let greater = new Greeter(expected);
        expect(greater.greeting).eql(expected);
    });

    /**
     * Another Test Method
     */
    it("Should greet", () => {
        let greet = "world!";
        let greater = new Greeter(greet);
        let actual = greater.greet();
        let expected = `Hello, ${greet}`;
        expect(actual).eql(expected);
    });
});
