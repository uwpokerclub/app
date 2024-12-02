describe("Login page", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.visit("/admin/login");
  });

  afterEach(() => {
    cy.resetDB();
  });

  it("should successfully login", () => {
    // Input username
    cy.get("input[name=username]").type("e2euser");

    // Input password
    cy.get("input[name=password]").type("password");

    // Click the "Login" button
    cy.getByData("login-submit").click();

    // Check to ensure that a successful login will redirect off the login page
    cy.location("pathname").should("eq", "/admin");

    cy.getCookie("uwpsc-dev-session-id").should("exist");
  });

  it("should show invalid username banner", () => {
    // Input username
    cy.get("input[name=username]").type("unknownuser");

    // Input password
    cy.get("input[name=password]").type("nopassword");

    // Click the "Login" button
    cy.getByData("login-submit").click();

    // Check that the banner is on the page
    cy.getByData("login-error-banner").should("exist").contains("Invalid username or password.");

    cy.getCookie("uwpsc-dev-session-id").should("not.exist");
  });
});
