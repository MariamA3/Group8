// cypress/integration/login.spec.js
describe('Login Flow', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('logs in with valid credentials and lands on dashboard', () => {
      cy.get('a').contains('Login').click();
      cy.url().should('include', '/login');
  
      cy.get('input[name="username"]').type('john.doe');
      cy.get('input[name="password"]').type('S3cr3t!');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, john.doe');
    });
  
    it('shows error on invalid credentials', () => {
      cy.get('a').contains('Login').click();
      cy.get('input[name="username"]').type('john.doe');
      cy.get('input[name="password"]').type('wrong');
      cy.get('button[type="submit"]').click();
  
      cy.get('.error').should('contain', 'Invalid credentials');
      cy.url().should('include', '/login');
    });
  });
  