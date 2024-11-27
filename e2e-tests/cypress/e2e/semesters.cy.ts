import type { Semester } from "../../../src/sdk/semesters";

describe("Semesters page", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.login("e2euser", "password");
    cy.visit("/admin/semesters");
  });

  afterEach(() => {
    cy.resetDB();
  });

  it("should show the page", () => {
    cy.getByData("semesters-header").should("exist");
  });

  it("should create a new semester", () => {
    cy.getByData("create-semester-btn").click();
    cy.location("pathname").should("eq", "/admin/semesters/new");

    cy.getByData("name").type("Winter 2025");
    cy.getByData("start-date").type("2025-01-01");
    cy.getByData("end-date").type("2025-04-30");
    cy.getByData("starting-budget").type("1000");
    cy.getByData("membership-fee").type("10");
    cy.getByData("discounted-membership-fee").type("7");
    cy.getByData("rebuy-fee").type("2");
    cy.getByData("additional-details").type("Integration test run");
    cy.getByData("form-submit").click();

    // Check that the page is redirected back to the semesters list
    cy.location("pathname").should("eq", "/admin/semesters/");

    // Check that the new semester is visible in the page
    cy.getByData("semester-name").should("exist").contains("Winter 2025");
  });

  context("view a semester", () => {
    beforeEach(() => {
      cy.fixture("semester.json").then((semester) => {
        cy.request("POST", "http://localhost:5000/semesters", semester).as("semester");
        cy.reload();
      });
    });

    it("should show the semester info page", () => {
      cy.get<Cypress.Response<Semester>>("@semester").then((response) => {
        const semesterId = response.body.id;

        cy.getByData(`view-semester-${semesterId}`).click();
        cy.location("pathname").should("eq", `/admin/semesters/${semesterId}`);
      });
    });
  });
});
