import type { Semester } from "../../../src/sdk/semesters";
import type { Membership } from "../../../src/sdk/memberships";
import type { User } from "../../../src/types";

describe("Memberships", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.login("e2euser", "password");
    cy.fixture("semester.json").then((semester) => {
      cy.request<Semester>("POST", "http://localhost:5000/semesters", semester)
        .as("semester")
        .then((response) => {
          cy.visit(`/admin/semesters/${response.body.id}`);
        });
    });
  });

  afterEach(() => {
    cy.resetDB();
  });

  it("should register new members", () => {
    // Setup intercepts for API requests
    cy.intercept("POST", "http://localhost:5000/users").as("createUser");
    cy.intercept("POST", "http://localhost:5000/memberships").as("createMembership");

    /** Create a new unpaid membership */
    // Open the new membership modal
    cy.getByData("new-member-btn").click();

    // Navigate to new member tab
    cy.getByData("modal").should("be.visible");
    cy.getByData("modal-title").should("contain", "New Membership");
    cy.getByData("modal-new-member-tab").click();

    // Input into form fields
    cy.fixture("users.json").then((users) => {
      cy.getByData("input-firstName").type(users[0].firstName);
      cy.getByData("input-lastName").type(users[0].lastName);
      cy.getByData("input-email").type(users[0].email);
      cy.getByData("select-faculty").select(users[0].faculty);
      cy.getByData("input-questId").type(users[0].questId);
      cy.getByData("input-id").type(users[0].id);

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait("@createUser").should("have.nested.property", "response.statusCode", 201);
      cy.wait<Cypress.RequestBody, Membership>("@createMembership").then(({ response }) => {
        // Reload page to see if data was successfully created
        cy.reload();
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData(`member-userId-${users[0].id}`).should("exist");
          cy.getByData("set-paid-btn").should("contain", "Set Paid");
          cy.getByData("set-discounted-btn").should("contain", "Discount");
        });
      });

      /** Create a new paid but not discounted membership */
      // Open the new membership modal
      cy.getByData("new-member-btn").click();
      cy.getByData("modal-new-member-tab").click();

      // Input into form fields
      cy.getByData("input-firstName").type(users[1].firstName);
      cy.getByData("input-lastName").type(users[1].lastName);
      cy.getByData("input-email").type(users[1].email);
      cy.getByData("select-faculty").select(users[1].faculty);
      cy.getByData("input-questId").type(users[1].questId);
      cy.getByData("input-id").type(users[1].id);
      cy.getByData("checkbox-paid").check();

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait("@createUser").should("have.nested.property", "response.statusCode", 201);
      cy.wait<Cypress.RequestBody, Membership>("@createMembership").then(({ response }) => {
        // Reload page to see if data was successfully created
        cy.reload();
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData(`member-userId-${users[1].id}`).should("exist");
          cy.getByData("set-paid-btn").should("contain", "Set Unpaid");
          cy.getByData("set-discounted-btn").should("contain", "Discount");
        });
      });

      /** Create a new discounted membership */
      // Open the new membership modal
      cy.getByData("new-member-btn").click();
      cy.getByData("modal-new-member-tab").click();

      // Input into form fields
      cy.getByData("input-firstName").type(users[2].firstName);
      cy.getByData("input-lastName").type(users[2].lastName);
      cy.getByData("input-email").type(users[2].email);
      cy.getByData("select-faculty").select(users[2].faculty);
      cy.getByData("input-questId").type(users[2].questId);
      cy.getByData("input-id").type(users[2].id);
      cy.getByData("checkbox-paid").check();
      cy.getByData("checkbox-discounted").check();

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait("@createUser").should("have.nested.property", "response.statusCode", 201);
      cy.wait<Cypress.RequestBody, Membership>("@createMembership").then(({ response }) => {
        // Reload page to see if data was successfully created
        cy.reload();
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData(`member-userId-${users[2].id}`).should("exist");
          cy.getByData("set-paid-btn").should("contain", "Set Unpaid");
          cy.getByData("set-discounted-btn").should("contain", "Remove Discount");
        });
      });
    });
  });

  it("should register an existing member", () => {
    // Setup intercepts for API requests
    cy.intercept("POST", "http://localhost:5000/memberships").as("createMembership");

    cy.fixture("users.json").then((users) => {
      cy.request("POST", "http://localhost:5000/users", users[0]).as("user0");
      cy.request("POST", "http://localhost:5000/users", users[1]).as("user1");
      cy.request("POST", "http://localhost:5000/users", users[2]).as("user2");
    });

    /** Register an existing member as not paid */
    // Open the new membership modal
    cy.getByData("new-member-btn").click();

    // Navigate to new member tab
    cy.getByData("modal").should("be.visible");
    cy.getByData("modal-title").contains("New Membership");
    cy.getByData("modal-existing-member-tab").click();

    // Find the existing member and select them
    cy.get("#react-select-2-input").type("Port");

    // Interact with the custom selector
    cy.get<Cypress.Response<User>>("@user0").then((response) => {
      cy.get("#react-select-2-listbox").within(() => {
        cy.contains(`${response.body.firstName} ${response.body.lastName} (${response.body.id})`).click();
      });

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait<Cypress.RequestBody, Membership>("@createMembership").then(({ response }) => {
        // Reload page to see if data was successfully created
        cy.reload();
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData(`member-userId-${response.body.userId}`).should("exist");
          cy.getByData("set-paid-btn").should("contain", "Set Paid");
          cy.getByData("set-discounted-btn").should("contain", "Discount");
        });
      });
    });

    /** Register existing member as paid but not discounted */
    // Open the new membership modal
    cy.getByData("new-member-btn").click();

    // Navigate to new member tab
    cy.getByData("modal").should("be.visible");
    cy.getByData("modal-title").contains("New Membership");
    cy.getByData("modal-existing-member-tab").click();

    // Find the existing member and select them
    cy.get("#react-select-2-input").type("Gill");

    // Interact with the custom selector
    cy.get<Cypress.Response<User>>("@user1").then((response) => {
      cy.get("#react-select-2-listbox").within(() => {
        cy.contains(`${response.body.firstName} ${response.body.lastName} (${response.body.id})`).click();
      });

      cy.getByData("checkbox-paid").check();

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait<Cypress.RequestBody, Membership>("@createMembership").then(({ response }) => {
        // Reload page to see if data was successfully created
        cy.reload();
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData(`member-userId-${response.body.userId}`).should("exist");
          cy.getByData("set-paid-btn").should("contain", "Set Unpaid");
          cy.getByData("set-discounted-btn").should("contain", "Discount");
        });
      });
    });

    /** Register existing member as paid and discounted */
    // Open the new membership modal
    cy.getByData("new-member-btn").click();

    // Navigate to new member tab
    cy.getByData("modal").should("be.visible");
    cy.getByData("modal-title").contains("New Membership");
    cy.getByData("modal-existing-member-tab").click();

    // Find the existing member and select them
    cy.get("#react-select-2-input").type("Jane");

    // Interact with the custom selector
    cy.get<Cypress.Response<User>>("@user2").then((response) => {
      cy.get("#react-select-2-listbox").within(() => {
        cy.contains(`${response.body.firstName} ${response.body.lastName} (${response.body.id})`).click();
      });

      cy.getByData("checkbox-paid").check();
      cy.getByData("checkbox-discounted").check();

      // Submit the form
      cy.getByData("modal-submit-btn").click();

      // The modal should automatically close
      cy.getByData("modal").should("not.be.visible");

      cy.wait<Cypress.RequestBody, Membership>("@createMembership").then(({ response }) => {
        // Reload page to see if data was successfully created
        cy.reload();
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData(`member-userId-${response.body.userId}`).should("exist");
          cy.getByData("set-paid-btn").should("contain", "Set Unpaid");
          cy.getByData("set-discounted-btn").should("contain", "Remove Discount");
        });
      });
    });
  });

  context("membership exists", () => {
    beforeEach(() => {
      cy.fixture("user.json").then((user) => {
        cy.request("POST", "http://localhost:5000/users", user)
          .as("user")
          .then(() => {
            cy.get<Cypress.Response<Semester>>("@semester").then((response) => {
              cy.request("POST", "http://localhost:5000/memberships", {
                userId: user.id,
                semesterId: response.body.id,
                paid: false,
                discounted: false,
              }).as("membership");
            });
          });
      });
    });

    it("should update a members status to paid", () => {
      cy.get<Cypress.Response<Membership>>("@membership").then((response) => {
        cy.reload();

        cy.getByData(`member-${response.body.id}`).should("be.visible");

        cy.getByData("set-paid-btn").click();

        cy.getByData("set-paid-btn").should("contain", "Set Unpaid");
      });
    });

    it("should update a members status to paid & discounted", () => {
      cy.get<Cypress.Response<Membership>>("@membership").then((response) => {
        cy.reload();

        cy.getByData(`member-${response.body.id}`).should("be.visible");

        cy.getByData("set-paid-btn").click();
        cy.getByData("set-discounted-btn").click();

        cy.getByData("set-paid-btn").should("contain", "Set Unpaid");
        cy.getByData("set-discounted-btn").should("contain", "Remove Discount");
      });
    });
  });
});
