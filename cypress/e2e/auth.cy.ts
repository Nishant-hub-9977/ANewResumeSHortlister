describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('shows login page when not authenticated', () => {
    cy.url().should('include', '/login');
    cy.contains('Sign in to your account').should('be.visible');
  });

  it('redirects to dashboard after successful login', () => {
    // Mock successful authentication
    cy.window().then((win) => {
      win.sessionStorage.setItem('supabase.auth.token', 'fake-token');
    });
    cy.visit('/');
    cy.url().should('not.include', '/login');
    cy.contains('Dashboard').should('be.visible');
  });
});