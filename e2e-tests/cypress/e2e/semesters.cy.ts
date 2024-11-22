describe("Semesters page", () => {
  beforeEach(() => {
    cy.setupLogin("e2euser", "password");
    cy.login("e2euser", "password");
  });

  afterEach(() => {
    cy.resetDB();
  });

  it("should show page", () => {
    cy.visit("/admin");
  });
});
