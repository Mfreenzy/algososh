import { TEST_URL, buttonSubmitSelector, circleCircleSelector } from "../../src/constants/forTest";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("StringComponent", () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/recursion`);
  });

  it("should disable the button when input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get(buttonSubmitSelector).should("be.disabled");
  });

  it("should reversed correctly", function () {
    cy.get("input").type("abc");
    cy.contains("Развернуть").click();

    cy.get(circleCircleSelector).as("circle");

    cy.get("@circle").each((el, index) => {
      if (index === 0 || index === 2) {
        cy.wrap(el).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
      if (index === 0) expect(el).to.contain("a");
      if (index === 2) expect(el).to.contain("c");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle").each((el, index) => {
      cy.wrap(el).should("have.css", "border", "4px solid rgb(127, 224, 81)");

      if (index === 0) expect(el).to.contain("c");
      if (index === 1) expect(el).to.contain("b");
      if (index === 2) expect(el).to.contain("a");
    });
  });
});
