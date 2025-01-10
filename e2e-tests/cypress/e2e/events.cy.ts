import type { Event } from "../../../src/sdk/events";
import { Membership } from "../../../src/sdk/memberships";
import type { Semester } from "../../../src/sdk/semesters";
import type { Structure } from "../../../src/sdk/structures";
import { User } from "../../../src/types";

describe("Events", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.login("e2euser", "password");
    // Seed the semester
    cy.fixture("semester.json").then((semester) => {
      cy.request("POST", "http://localhost:5000/semesters", semester).as("semester");
    });
  });

  afterEach(() => {
    cy.resetDB();
  });

  context("Create Event", () => {
    beforeEach(() => {
      cy.visit("/admin/events");
    });

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

  context("Edit Event", () => {
    beforeEach(() => {
      cy.get<Cypress.Response<Semester>>("@semester").then((semResponse) => {
        // Seed the members
        cy.fixture("users.json").then((users) => {
          cy.request<User>("POST", "http://localhost:5000/users", users[0]).then((response) => {
            cy.request("POST", "http://localhost:5000/memberships", {
              userId: response.body.id,
              semesterId: semResponse.body.id,
              paid: false,
              discounted: false,
            }).as("member1");
          });
          cy.request("POST", "http://localhost:5000/users", users[1]).then((response) => {
            cy.request("POST", "http://localhost:5000/memberships", {
              userId: response.body.id,
              semesterId: semResponse.body.id,
              paid: false,
              discounted: false,
            }).as("member2");
          });
          cy.request("POST", "http://localhost:5000/users", users[2]).then((response) => {
            cy.request("POST", "http://localhost:5000/memberships", {
              userId: response.body.id,
              semesterId: semResponse.body.id,
              paid: false,
              discounted: false,
            }).as("member3");
          });
        });
        // Seed the structure
        cy.fixture("structure.json").then((structure) => {
          cy.request<Structure>("POST", "http://localhost:5000/structures", structure).then((structResponse) => {
            // Seed the event
            cy.fixture("event.json").then((event) => {
              cy.request<Event>("POST", "http://localhost:5000/events", {
                ...event,
                structureId: structResponse.body.id,
                semesterId: semResponse.body.id,
              })
                .as("event")
                .then(() => cy.visit("/admin/events"));
            });
          });
        });
      });
    });

    it("should edit an event's details", () => {
      cy.get<Cypress.Response<Event>>("@event").then((response) => {
        cy.getByData(`event-${response.body.id}-card`).within(() => {
          cy.getByData("actions")
            .invoke("show")
            .within(() => {
              cy.getByData("edit-event-btn").click();
            });
        });
      });

      cy.location("pathname").should("include", "edit");

      // Change event details
      cy.getByData("input-name").clear().type("Updated Event");
      cy.getByData("input-date").type("2025-01-14T19:00");
      cy.getByData("select-format").select("Pot Limit Omaha");
      cy.getByData("input-points-multiplier").clear().type("2");
      cy.getByData("input-additional-details").clear().type("Updated this event");

      cy.getByData("submit-btn").click();

      cy.location("pathname").should("eq", "/admin/events/");

      cy.get<Cypress.Response<Event>>("@event").then((response) => {
        cy.getByData(`${response.body.id}-name`).should("contain", "Updated Event");
        cy.getByData(`${response.body.id}-format`).should("contain", "Pot Limit Omaha");
        cy.getByData(`${response.body.id}-date`).should("contain", "Tuesday, January 14, 2025 at 7:00 PM");
        cy.getByData(`${response.body.id}-additional-details`).should("contain", "Updated this event");
      });
    });
  });

  context("Event Management", () => {
    beforeEach(() => {
      cy.get<Cypress.Response<Semester>>("@semester").then((semResponse) => {
        // Seed the members
        cy.fixture("users.json").then((users) => {
          cy.request<User>("POST", "http://localhost:5000/users", users[0]).then((response) => {
            cy.request("POST", "http://localhost:5000/memberships", {
              userId: response.body.id,
              semesterId: semResponse.body.id,
              paid: false,
              discounted: false,
            }).as("member1");
          });
          cy.request("POST", "http://localhost:5000/users", users[1]).then((response) => {
            cy.request("POST", "http://localhost:5000/memberships", {
              userId: response.body.id,
              semesterId: semResponse.body.id,
              paid: false,
              discounted: false,
            }).as("member2");
          });
          cy.request("POST", "http://localhost:5000/users", users[2]).then((response) => {
            cy.request("POST", "http://localhost:5000/memberships", {
              userId: response.body.id,
              semesterId: semResponse.body.id,
              paid: false,
              discounted: false,
            }).as("member3");
          });
        });
        // Seed the structure
        cy.fixture("structure.json").then((structure) => {
          cy.request<Structure>("POST", "http://localhost:5000/structures", structure).then((structResponse) => {
            // Seed the event
            cy.fixture("event.json").then((event) => {
              cy.request<Event>("POST", "http://localhost:5000/events", {
                ...event,
                structureId: structResponse.body.id,
                semesterId: semResponse.body.id,
              })
                .as("event")
                .then((eventResponse) => {
                  cy.visit(`/admin/events/${eventResponse.body.id}`);
                });
            });
          });
        });
      });
    });

    it("should register members for the event", () => {
      // Navigate to the event registration page
      cy.getByData("register-members-btn").click();

      // Check that page was redirected
      cy.location("pathname").should("contain", "/register");

      // Sign in each member
      cy.get<Cypress.Response<Membership>>("@member1").then((response) => {
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData("checkbox-selected").check();
        });
      });
      cy.get<Cypress.Response<Membership>>("@member2").then((response) => {
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData("checkbox-selected").check();
        });
      });
      cy.get<Cypress.Response<Membership>>("@member3").then((response) => {
        cy.getByData(`member-${response.body.id}`).within(() => {
          cy.getByData("checkbox-selected").check();
        });
      });

      cy.getByData("sign-in-btn").click();

      cy.get<Cypress.Response<Membership>>("@member1").then((response) => {
        cy.getByData(`entry-${response.body.id}`).should("be.visible");
      });
      cy.get<Cypress.Response<Membership>>("@member2").then((response) => {
        cy.getByData(`entry-${response.body.id}`).should("be.visible");
      });
      cy.get<Cypress.Response<Membership>>("@member3").then((response) => {
        cy.getByData(`entry-${response.body.id}`).should("be.visible");
      });
    });

    context("Event Started", () => {
      beforeEach(() => {
        // Seed event entries
        cy.get<Cypress.Response<Event>>("@event").then((eventResponse) => {
          cy.get<Cypress.Response<Membership>>("@member1").then((memberResponse) => {
            cy.request("POST", "http://localhost:5000/participants", {
              membershipId: memberResponse.body.id,
              eventId: eventResponse.body.id,
            });
          });
          cy.get<Cypress.Response<Membership>>("@member2").then((memberResponse) => {
            cy.request("POST", "http://localhost:5000/participants", {
              membershipId: memberResponse.body.id,
              eventId: eventResponse.body.id,
            });
          });
          cy.get<Cypress.Response<Membership>>("@member3").then((memberResponse) => {
            cy.request("POST", "http://localhost:5000/participants", {
              membershipId: memberResponse.body.id,
              eventId: eventResponse.body.id,
            });
          });
          cy.clock();
          cy.visit(`/admin/events/${eventResponse.body.id}`);
        });
      });

      afterEach(() => {
        cy.clock().then((clock) => clock.restore());
      });

      it("should search for and sign out a user", () => {
        cy.fixture("users.json").then((users) => {
          cy.getByData("input-search").type(users[1].firstName);

          cy.get<Cypress.Response<Membership>>("@member1").then((response) => {
            cy.getByData(`entry-${response.body.id}`).should("not.exist");
          });

          cy.get<Cypress.Response<Membership>>("@member3").then((response) => {
            cy.getByData(`entry-${response.body.id}`).should("not.exist");
          });

          cy.get<Cypress.Response<Membership>>("@member2").then((response) => {
            cy.getByData(`entry-${response.body.id}`).within(() => {
              cy.getByData("sign-out-btn").click();

              cy.getByData("signed-out-at").should("not.contain", "Not Signed Out");
              cy.getByData("sign-in-btn").should("be.visible");
              cy.getByData("sign-out-btn").should("not.exist");
            });
          });
        });
      });

      it("should start the clock and advance a level", () => {
        // Open the tournament clock tab
        cy.getByData("clock-tab").click();

        // Check that we are on the tournament clock page
        cy.getByData("level").should("contain", "Level 1");
        cy.getByData("timer").should("contain", "5:00");

        // Check that the timer works and the level changes at the end of the timer
        cy.getByData("toggle-timer-btn").click();
        cy.tick(1000 * 60 * 5); // Tick 5 minutes;
        cy.getByData("level").should("contain", "Level 2");
        cy.getByData("timer").should("contain", "5:00");

        // Check that the timer can be paused
        cy.getByData("toggle-timer-btn").click();
        cy.tick(1000 * 60); // Advance 1 minute in time
        cy.getByData("timer").should("contain", "5:00");

        // Check that the back button works
        cy.getByData("prev-level-btn").click();
        cy.getByData("level").should("contain", "Level 1");
        cy.getByData("timer").should("contain", "5:00");

        // Check that the next button works
        cy.getByData("advance-level-btn").click();
        cy.getByData("level").should("contain", "Level 2");
        cy.getByData("timer").should("contain", "5:00");

        // Check that you can subtract a minute from the timer
        cy.getByData("sub-btn").click();
        cy.getByData("timer").should("contain", "4:00");

        // Check that you can add a minute to the timer
        cy.getByData("add-btn").click();
        cy.getByData("timer").should("contain", "5:00");
      });

      it("should sign out all entries and end the event", () => {
        cy.clock().then((clock) => clock.restore());

        cy.get<Cypress.Response<Membership>>("@member1").then((response) => {
          cy.getByData(`entry-${response.body.id}`).within(() => {
            cy.getByData("sign-out-btn").click();
          });
        });
        cy.get<Cypress.Response<Membership>>("@member2").then((response) => {
          cy.getByData(`entry-${response.body.id}`).within(() => {
            cy.getByData("sign-out-btn").click();
          });
        });
        cy.get<Cypress.Response<Membership>>("@member3").then((response) => {
          cy.getByData(`entry-${response.body.id}`).within(() => {
            cy.getByData("sign-out-btn").click();
          });
        });

        cy.getByData("end-event-btn").click();

        // Ensure the modal was opened
        cy.getByData("modal").should("be.visible");
        cy.getByData("modal-title").should("contain", "Are you sure you want to end the event?");
        cy.getByData("modal-submit-btn").click();

        cy.getByData("event-ended-banner").should("be.visible");
      });
    });
  });
});
