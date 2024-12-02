import type { Event } from "../../../src/sdk/events";
import type { Semester } from "../../../src/sdk/semesters";
import type { Structure } from "../../../src/sdk/structures";

describe("Events", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.login("e2euser", "password");
    // Seed the semester
    cy.fixture("semester.json").then((semester) => {
      cy.request("POST", "http://localhost:5000/semesters", semester).as("semester");
    });
    cy.visit("/admin/events");
  });

  afterEach(() => {
    cy.resetDB();
  });

  context("Create Event", () => {
    context("No existing blind structure", () => {
      it("should create a new event and structure", () => {
        cy.intercept("POST", "http://localhost:5000/events").as("createEvent");

        // Click the create event button
        cy.getByData("create-event-btn").click();

        // Ensure the page is redirected to the creation page
        cy.location("pathname").should("eq", "/admin/events/new");

        // Input data into the form
        cy.getByData("input-name").type("Winter 2025 Event #1");
        cy.getByData("select-semester").select("Winter 2025");
        cy.getByData("input-date").type("2025-01-06T19:00");
        cy.getByData("select-format").select("No Limit Hold'em");
        cy.getByData("input-points-multiplier").type("1");
        cy.getByData("input-additional-details").type("E2E Test Run");

        // Create the structure
        cy.getByData("input-structure-name").type("Structure A");
        cy.getByData("blind-0-small").type("10");
        cy.getByData("blind-0-big").type("20");
        cy.getByData("blind-0-ante").type("20");
        cy.getByData("blind-0-time").type("5");

        // Create 5 levels based on the inputed level
        cy.getByData("add-level-btn").click();
        cy.getByData("add-level-btn").click();
        cy.getByData("add-level-btn").click();
        cy.getByData("add-level-btn").click();

        // Submit the form
        cy.getByData("submit-btn").click();

        // Ensure the user is redirected back to the events list
        cy.location("pathname").should("eq", "/admin/events/");

        // Ensure the new event is listed
        cy.wait<Cypress.RequestBody, Event>("@createEvent").then(({ response }) => {
          cy.getByData(`${response.body.id}-name`).should("contain", "Winter 2025 Event #1");
          cy.getByData(`${response.body.id}-format`).should("contain", "No Limit Hold'em");
          cy.getByData(`${response.body.id}-date`).should("contain", "Monday, January 6, 2025 at 7:00 PM");
          cy.getByData(`${response.body.id}-additional-details`).should("contain", "E2E Test Run");
        });
      });
    });

    context("With existing blind structure", () => {
      beforeEach(() => {
        cy.request("POST", "http://localhost:5000/structures", {
          name: "Structure B",
          blinds: [
            { small: 10, big: 20, ante: 20, time: 5 },
            { small: 20, big: 40, ante: 40, time: 5 },
            { small: 30, big: 60, ante: 60, time: 5 },
            { small: 40, big: 80, ante: 80, time: 5 },
            { small: 50, big: 100, ante: 100, time: 5 },
          ],
        });
      });

      it("should create a new event with an existing structure", () => {
        cy.intercept("POST", "http://localhost:5000/events").as("createEvent");

        // Click the create event button
        cy.getByData("create-event-btn").click();

        // Ensure the page is redirected to the creation page
        cy.location("pathname").should("eq", "/admin/events/new");

        // Input data into the form
        cy.getByData("input-name").type("Winter 2025 Event #1");
        cy.getByData("select-semester").select("Winter 2025");
        cy.getByData("input-date").type("2025-01-06T19:00");
        cy.getByData("select-format").select("No Limit Hold'em");
        cy.getByData("input-points-multiplier").type("1");
        cy.getByData("input-additional-details").type("E2E Test Run");

        // Select the structure
        cy.getByData("select-structure").select("Structure B");

        // Submit the form
        cy.getByData("submit-btn").click();

        // Ensure the user is redirected back to the events list
        cy.location("pathname").should("eq", "/admin/events/");

        // Ensure the new event is listed
        cy.wait<Cypress.RequestBody, Event>("@createEvent").then(({ response }) => {
          cy.getByData(`${response.body.id}-name`).should("contain", "Winter 2025 Event #1");
          cy.getByData(`${response.body.id}-format`).should("contain", "No Limit Hold'em");
          cy.getByData(`${response.body.id}-date`).should("contain", "Monday, January 6, 2025 at 7:00 PM");
          cy.getByData(`${response.body.id}-additional-details`).should("contain", "E2E Test Run");
        });
      });
    });
  });

  context("Event Management", () => {
    beforeEach(() => {
      cy.get<Cypress.Response<Semester>>("@semester").then((semResponse) => {
        // Seed the structure
        cy.fixture("structure.json").then((structure) => {
          cy.request<Structure>("POST", "http://localhost:5000/structures", structure).then((structResponse) => {
            // Seed the event
            cy.fixture("event.json").then((event) => {
              cy.request("POST", "http://localhost:5000/events", {
                ...event,
                structureId: structResponse.body.id,
                semesterId: semResponse.body.id,
              });
            });
          });
        });

        // Seed the members
        cy.fixture("users.json").then((users) => {
          cy.request("POST", "http://localhost:5000/users", users[0]).as("user0");
          cy.request("POST", "http://localhost:5000/users", users[1]).as("user1");
          cy.request("POST", "http://localhost:5000/users", users[2]).as("user2");
        });
      });
    });

    it("should register members for the event");
  });
});
