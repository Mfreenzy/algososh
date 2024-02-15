import { TEST_URL, buttonSubmitSelector, circleChangingSelector, circleCircleSelector, circleContentSelector, circleDefaultSelector } from "../../src/constants/forTest";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const addingElement = (value: string) => {
  cy.get("input").type(value);
  cy.contains("button", "Добавить").click();
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(circleDefaultSelector).contains(value);
};

const removingElement = (value: string) => {
  cy.contains("button", "Удалить").click();
  cy.get(circleChangingSelector).contains(value);
};

const values = ["a", "b", "c"];

describe("queue", () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/queue`);
  });

  it("button should be disabled if string is empty", function () {
    cy.get("input").should("be.empty");
    cy.get(buttonSubmitSelector).should("be.disabled");
  });

  it("should adding correctly", function () {
    addingElement(values[0]);
    cy.get(circleContentSelector).as("circle");
    cy.get("@circle")
      .eq(0)
      .should("contain", values[0])
      .and("contain", "head")
      .and("contain", "tail");

    addingElement(values[1]);
    cy.get("@circle").each((el, Index) => {
      Index === 1 && expect(el).to.contain(values[1]);
      Index === 1 && expect(el).to.contain("tail");
      Index === 0 && expect(el).to.contain("head");
    });
  });

  it("should removing correctly", function () {
    addingElement(values[0]);
    addingElement(values[1]);
    cy.get(circleContentSelector).as("circle");
    removingElement(values[0]);
    cy.get("@circle").each((el, Index) => {
      Index === 0 && expect(el).to.contain(values[0]);
      if (Index === 1) {
        expect(el).to.contain(values[1]);
        expect(el).to.contain("tail");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(1).should("contain", "head");
  });

  it("should clear correctly", () => {
    values.forEach((value) => addingElement(value));
    cy.contains("Очистить").click();
    cy.get(circleCircleSelector).should("have.text", "");
  });
});
