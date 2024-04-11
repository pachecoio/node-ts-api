import { sayHello } from "@/index";

describe("Test", () => {
    it("should say hello with a console log", () => {
        const spy = jest.spyOn(console, "log");
        sayHello();
        expect(spy).toHaveBeenCalledWith("Hello, World!");
    });
});
