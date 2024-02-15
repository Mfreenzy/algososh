import { TEST_URL } from "../../src/constants/forTest";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("list", () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/list`);
  });

  const values = ["0", "34", "8", "1"];

  it("should default list rendering correctly", () => {
    const circles = cy.get("[class*=circle_content]").should("have.length", 4);

    values.forEach((value, idx) => {
      circles.each((el, index) => {
        index === idx && expect(el).contain(value);
      });
    });

    cy.get("[class*=circle_content]")
      .should("have.length", 4)
      .eq(0)
      .should("contain", "head");

    cy.get("[class*=circle_content]")
      .should("have.length", 4)
      .eq(3)
      .should("contain", "tail");
  });

  it("should add to head correctly", () => {
    cy.get("input").first().type("42");
    cy.contains("button", "Добавить в head").click();
    cy.get("[class*=circle_modified]").contains("42");
    cy.wait(DELAY_IN_MS);
    cy.get("[class*=circle_content]")
      .should("have.length", 5)
      .each((el, index) => {
        index === 0 && expect(el).contain("42");
        index === 0 && expect(el).contain("head");
        index === 4 && expect(el).contain("tail");
      });
    cy.get("[class*=circle_default]").contains("42");
  });

  it("should add to tail correctly", () => {
    cy.get("input").first().type("42");
    cy.contains("button", "Добавить в tail").click();
    cy.get("[class*=circle_modified]").contains("42");
    cy.wait(DELAY_IN_MS);
    cy.get("[class*=circle_content]")
      .should("have.length", 5)
      .each((el, index) => {
        index === 4 && expect(el).contain("42");
        index === 4 && expect(el).contain("tail");
      });
    cy.get("[class*=circle_default]").contains("42");
  });

  it("should add by index correctly", () => {
    cy.get("input").first().type("42");
    cy.get("input").eq(1).type("1");
    cy.contains("button", "Добавить по индексу").click();

    cy.get("[class*=circle_content]").should("have.length", 5);
    cy.get("[class*=circle_changing]").contains("42");
    cy.get("[class*=circle_modified]").contains("42");
    cy.get("[class*=circle_default]").contains("42");
    cy.get("[class*=circle_content]").eq(1).contains("42");
  });

  it("should remove from head correctly", () => {
    cy.contains("button", "Удалить из head").click();
    cy.get("[class*=circle_small]").should("exist");
    cy.contains(values[0]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").first().contains("head");
    cy.get("[class*=circle_content]").should("have.length", 3);
  });

  it("should remove from tail correctly", () => {
    cy.contains("button", "Удалить из tail").click();
    cy.get("[class*=circle_small]").contains(values[3]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").last().contains("tail");
    cy.get("[class*=circle_content]").last().contains(values[2]);
    cy.get("[class*=circle_content]").should("have.length", 3);
  });

  it("should remove by index correctly", () => {
    cy.get("input").eq(1).type("1");
    cy.contains("button", "Удалить по индексу").click();
    cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");
    cy.get("[class*=circle_small]").contains(values[1]);
    cy.get("[class*=circle_content]").should("have.length", 3);
  });
});
