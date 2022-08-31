describe('Home page', () => {
  beforeEach(() => {
    cy.fixture('courses.json').as('courseJSON');
    cy.server();
    cy.route('/api/courses', '@courseJSON').as('courses');
    cy.visit('/');
  });
  it('should display a list of Beginner courses', () => {
    cy.contains('All Courses');
    // cy.wait('@courses');
    cy.get('[data-test="course-card"]').should('have.length', 9);
  });
  it('should display a list of Advanced courses', () => {
    cy.get('.mat-tab-label').should('have.length', 2);
    cy.get('.mat-tab-label').last().click();
    cy.get('[data-test="course-card"]').should('have.length', 3);
    cy.get('[data-test="course-card"] .mat-card-title').its('length').should('be.gt', 1);
    cy.get('[data-test="course-card"] .mat-card-title').first().should('contain', 'Angular Security Course');
  });
});
