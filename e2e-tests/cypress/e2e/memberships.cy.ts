import type { Semester } from "../../../src/sdk/semesters";
import type { User } from "../../../src/types";

describe("Memberships", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.login("e2euser", "password");
    cy.fixture("semester.json").then((semester) => {
      cy.request<Semester>("POST", "http://localhost:5000/semesters", semester).then((response) => {
        cy.visit(`/admin/semesters/${response.body.id}`);
      });
    });
  });

  afterEach(() => {
    cy.resetDB();
  });

  it("should register a new member", () => {
    // Setup intercepts for API requests
    cy.intercept("POST", "http://localhost:5000/users").as("createUser");
    cy.intercept("POST", "http://localhost:5000/memberships").as("createMembership");

    // Open the new membership modal
    cy.getByData("new-member-btn").click();

    // Navigate to new member tab
    cy.getByData("modal").should("be.visible");
    cy.getByData("modal-title").contains("New Membership");
    cy.getByData("modal-new-member-tab").click();

    // Input into form fields
    cy.fixture("user.json").then((user) => {
      cy.getByData("input-firstName").type(user.firstName);
      cy.getByData("input-lastName").type(user.lastName);
      cy.getByData("input-email").type(user.email);
      cy.getByData("select-faculty").select(user.faculty);
      cy.getByData("input-questId").type(user.questId);
      cy.getByData("input-id").type(user.id);

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait("@createUser").should("have.nested.property", "response.statusCode", 201);
      cy.wait("@createMembership").should("have.nested.property", "response.statusCode", 201);

      // Reload page to see if data was successfully created
      cy.reload();
      cy.getByData(`member-userId-${user.id}`).should("exist");
    });
  });

  it("should register an existing member", () => {
    // Setup intercepts for API requests
    cy.intercept("POST", "http://localhost:5000/memberships").as("createMembership");

    cy.fixture("user.json").then((user) => {
      cy.request("POST", "http://localhost:5000/users", user).as("user");
    });

    // Open the new membership modal
    cy.getByData("new-member-btn").click();

    // Navigate to new member tab
    cy.getByData("modal").should("be.visible");
    cy.getByData("modal-title").contains("New Membership");
    cy.getByData("modal-existing-member-tab").click();

    // Find the existing member and select them
    cy.get("#react-select-3-input").type("John");

    // Interact with the custom selector
    cy.get<Cypress.Response<User>>("@user").then((response) => {
      cy.get("#react-select-3-listbox").within(() => {
        cy.contains(`${response.body.firstName} ${response.body.lastName} (${response.body.id})`).click();
      });

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait("@createMembership").should("have.nested.property", "response.statusCode", 201);

      // Reload page to see if data was successfully created
      cy.reload();
      cy.getByData(`member-userId-${response.body.id}`).should("exist");
    });
  });

  it("should update a members status to paid");

  it("should update a members status to paid & discounted");
});
