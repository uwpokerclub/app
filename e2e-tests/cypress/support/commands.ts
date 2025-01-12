/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    login(username: string, password: string): Chainable<void>;
    setupLogin(username: string, password: string): Chainable<void>;
    resetDB(): Chainable<void>;
  }
}

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-qa=${selector}]`);
});

Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://localhost:5000/session", {
    username,
    password,
  });
  cy.getCookie("uwpsc-dev-session-id").should("exist");
});

Cypress.Commands.add("setupLogin", (username, password) => {
  cy.request("POST", "http://localhost:5000/login", {
    username,
    password,
  });
});

Cypress.Commands.add("resetDB", () => {
  cy.request("POST", "http://localhost:5000/database/reset");
});
