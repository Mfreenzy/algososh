import { TEST_URL, circleChangingSelector, circleContentSelector, circleDefaultSelector, circleModifiedSelector, circleSmallSelector } from "../../src/constants/forTest";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe("list", () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/list`);
  });

  const values = ["0", "34", "8", "1"];

  it("should default list rendering correctly", () => {
    const circles = cy.get(circleContentSelector).should("have.length", 4);

    values.forEach((value, idx) => {
      circles.each((el, index) => {
        index === idx && expect(el).contain(value);
      });
    });

    cy.get(circleContentSelector)
      .should("have.length", 4)
      .eq(0)
      .should("contain", "head");

    cy.get(circleContentSelector)
      .should("have.length", 4)
      .eq(3)
      .should("contain", "tail");
  });

  it("should add to head correctly", () => {
    cy.get("input").first().type("42");
    cy.contains("button", "Добавить в head").click();
    cy.get(circleModifiedSelector).contains("42");
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector)
      .should("have.length", 5)
      .each((el, index) => {
        index === 0 && expect(el).contain("42");
        index === 0 && expect(el).contain("head");
        index === 4 && expect(el).contain("tail");
      });
    cy.get(circleDefaultSelector).contains("42");
  });

  it("should add to tail correctly", () => {
    cy.get("input").first().type("42");
    cy.contains("button", "Добавить в tail").click();
    cy.get(circleModifiedSelector).contains("42");
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector)
      .should("have.length", 5)
      .each((el, index) => {
        index === 4 && expect(el).contain("42");
        index === 4 && expect(el).contain("tail");
      });
    cy.get(circleDefaultSelector).contains("42");
  });

  it("should add by index correctly", () => {
    cy.get("input").first().type("42");
    cy.get("input").eq(1).type("1");
    cy.contains("button", "Добавить по индексу").click();

    cy.get(circleContentSelector).should("have.length", 5);
    cy.get(circleChangingSelector).contains("42");
    cy.get(circleModifiedSelector).contains("42");
    cy.get(circleDefaultSelector).contains("42");
    cy.get(circleContentSelector).eq(1).contains("42");
  });

  it("should remove from head correctly", () => {
    cy.contains("button", "Удалить из head").click();
    cy.get(circleSmallSelector).should("exist");
    cy.contains(values[0]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentSelector).first().contains("head");
    cy.get(circleContentSelector).should("have.length", 3);
  });

  it("should remove from tail correctly", () => {
    cy.contains("button", "Удалить из tail").click();
    cy.get(circleSmallSelector).contains(values[3]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentSelector).last().contains("tail");
    cy.get(circleContentSelector).last().contains(values[2]);
    cy.get(circleContentSelector).should("have.length", 3);
  });

  it("should remove by index correctly", () => {
    cy.get("input").eq(1).type("1");
    cy.contains("button", "Удалить по индексу").click();
    cy.get(circleContentSelector).eq(0).find(circleChangingSelector);
    cy.get(circleSmallSelector).contains(values[1]);
    cy.get(circleContentSelector).should("have.length", 3);
  });
});
