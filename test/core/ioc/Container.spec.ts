import Container, { rootContainer } from "../../../lib/core/ioc/Container";
describe("IoC Container test suite", () => {
  const container = new Container();
  it("should be able to create an instance of Container", () => {
    expect(container).toBeTruthy();
  });

  it("should have a default rootContainer", 
  ()=>{
    expect(rootContainer).toBeTruthy();
  })

  describe("register / has / get test suite", () => {
    const method = ()=>{};
    const dataTest = [
      {
        key: "dummy",
        factoryMethod: method,
        testKey: "dummy",
        expected: method
      },
      {
        key: "dummy",
        factoryMethod: method,
        testKey: "unknown",
        expected: null,
      },
    ];

    it("should be able to store a pair key/factory method and retrieve it", () => {
      dataTest.forEach((test) => {
        // given
        container.register(test.key, test.factoryMethod);

        // when
        const method = container.get(test.testKey);

        // then
        expect(method).toBe(test.expected);
      });
    });
  });

  describe("resolve test suite", () => {
    const dataTest = [
      {
        key: "dummy",
        factoryMethod: () => "dummy",
        expected: "dummy",
      },
      {
        key: "dummy",
        factoryMethod: () => "another dummy",
        expected: "another dummy",
      },
    ];

    it("should resolve the request and execute the right factory method", () => {
      dataTest.forEach((test) => {
        // given
        container.register(test.key, test.factoryMethod);

        // when
        const result = container.resolve(test.key);

        // then
        expect(result).toEqual(test.expected);
      });
    });
  });

  describe("resolve singleton test suite", () => {
    it("should be able to return the same instance if we register with singleton", () => {
      // given
      container.register("dummy", () => {
        return { name: "unique" };
      }, true);

      // when
      const result1 = container.resolve("dummy");
      const result2 = container.resolve("dummy");

      // then
      expect(result1).toBe(result2);
    });

    it("should return different instances", () => {
      // given
      container.register("dummy", () => {
        return { name: "unique" };
      });

      // when
      const result1 = container.resolve("dummy");
      const result2 = container.resolve("dummy");

      // then
      expect(result1).not.toBe(result2);
    });
  });
});
