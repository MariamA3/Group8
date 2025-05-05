// cypress/integration/login.spec.js

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('lets me log in when I use valid credentials', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');

    cy.get('input[name="username"]').type('john.doe');
    cy.get('input[name="password"]').type('S3cr3t!');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, john.doe');
  });

  it('shows an error message when the password is wrong', () => {
    cy.contains('Login').click();

    cy.get('input[name="username"]').type('john.doe');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
    cy.get('.error').should('be.visible')
                    .and('contain', 'Invalid credentials');
  });

  it('displays validation warnings if I submit an empty form', () => {
    cy.contains('Login').click();

    cy.get('button[type="submit"]').click();
    cy.get('.validation').should('contain', 'Username is required');
    cy.get('.validation').should('contain', 'Password is required');
  });

  it('redirects me to login if I try to visit a protected route unauthenticated', () => {
    // go straight to dashboard without logging in
    cy.visit('/dashboard');
    // should bounce back to login
    cy.url().should('include', '/login');
    cy.contains('Please log in to continue');
  });
});
