import { TEST_URL } from "../../src/constants/forTest";

describe("app works correctly with routes", function () {
  before(function () {
    cy.visit(TEST_URL);
  });

  it("should be open string page", function () {
    cy.visit(`${TEST_URL}/recursion`);
    cy.contains("Строка");
    cy.contains("К оглавлению").click();
  });

  it("should be open fibonacci page", function () {
    cy.visit(`${TEST_URL}/fibonacci`);
    cy.contains("Последовательность Фибоначчи");
    cy.contains("К оглавлению").click();
  });

  it("should be open sorting page", function () {
    cy.visit(`${TEST_URL}/sorting`);
    cy.contains("Сортировка массива");
    cy.contains("К оглавлению").click();
  });

  it("should be open stack page", function () {
    cy.visit(`${TEST_URL}/stack`);
    cy.contains("Стек");
    cy.contains("К оглавлению").click();
  });

  it("should be open queue page", function () {
    cy.visit(`${TEST_URL}/queue`);
    cy.contains("Очередь");
    cy.contains("К оглавлению").click();
  });

  it("should be open list page", function () {
    cy.visit(`${TEST_URL}/list`);
    cy.contains("Связный список");
    cy.contains("К оглавлению").click();
  });
});
