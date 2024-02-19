import { TEST_URL, buttonSubmitSelector, circleChangingSelector, circleCircleSelector, circleContentSelector, circleDefaultSelector } from "../../src/constants/forTest";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const addingElement = (value: string) => {
  cy.get("input").type(value);
  cy.contains("button", "Добавить").click();
  cy.get(circleChangingSelector).contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(circleDefaultSelector).contains(value);
};

const removingElement = (value: string) => {
  cy.contains("button", "Удалить").click();
  cy.get(circleChangingSelector).contains(value);
  cy.get(circleCircleSelector).each((element, index) => {
    if (index === length - 1) {
      expect(element).to.contain(value);
    }
  });
};

const values = ["a", "b", "c"];

describe("stack", () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/stack`);
  });

  it("button should be disabled if string is empty", function () {
    cy.get("input").should("be.empty");
    cy.get(buttonSubmitSelector).should("be.disabled");
  });

  it("element should be adding correctly", function () {
    values.forEach((value, index) => {
      addingElement(value);
      cy.get(circleContentSelector).as("circle");

      cy.get("@circle")
        .should("have.length", index + 1)
        .each((element, Index) => {
          Index === index && expect(element).to.contain(value);
          Index === index && expect(element).to.contain("top");
          Index === index && expect(element).to.contain(index);
        });
    });
  });

  it("element should be removing correctly", function () {
    values.forEach((value) => addingElement(value));
    cy.get(circleContentSelector).as("circle");
    removingElement(values[2]);

    cy.get("@circle")
      .should("have.length", 2)
      .each((element, Index) => {
        Index === 0 && expect(element).to.contain(values[0]);
        if (Index === 1) {
          expect(element).to.contain(values[1]);
          expect(element).to.contain("top");
        }
      });
  });

  it("clear should be correctly", function () {
    values.forEach((value) => addingElement(value));
    cy.contains("button", "Очистить").click();
    cy.get(circleContentSelector).should("have.length", 0);
  });
});
