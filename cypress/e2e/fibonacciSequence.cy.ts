import { TEST_URL } from "../../src/constants/forTest";
import { buttonSubmitSelector } from "../../src/constants/forTest";

describe("fibonacciSequence", () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/fibonacci`);
  });

  it("should disable the button when input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get(buttonSubmitSelector).should("be.disabled");
  });

  it("numbers should be generated correctly", function () {
    cy.get("input").type("3");
    cy.contains("Расчитать").click();

    const testSequnce = [0, 1, 1];
    cy.get("[class^=circle_circle]")
      .should("have.length", testSequnce.length)
      .each((element, index) => {
        const expectedNumber = testSequnce[index];
        expect(element).to.contain(expectedNumber.toString());
      });
  });
});
