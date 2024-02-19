import { TEST_URL } from "../../src/constants/forTest";

describe("App", () => {
  it("should be up and running", () => {
    cy.visit(TEST_URL);
  });
});
