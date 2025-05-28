describe('Settings Page', () => {
  beforeEach(() => {
    // Mock authentication
    cy.window().then((win) => {
      win.sessionStorage.setItem('supabase.auth.token', 'fake-token');
    });
    cy.visit('/settings');
  });

  it('allows access to the settings page', () => {
    cy.contains('Settings').should('be.visible');
    cy.contains('Integrations').should('be.visible');
  });

  it('allows saving integration settings', () => {
    cy.get('#boltApiKey').type('test-api-key');
    cy.get('#boltDeviceId').type('test-device-id');
    cy.get('#googleAnalyticsViewId').type('test-view-id');
    cy.contains('Save Settings').click();
    cy.contains('Settings saved successfully!').should('be.visible');
  });

  it('validates required fields', () => {
    cy.get('#boltApiKey').clear();
    cy.get('#boltDeviceId').clear();
    cy.get('#googleAnalyticsViewId').clear();
    cy.contains('Save Settings').click();
    cy.contains('Please fill in all required fields').should('be.visible');
  });

  it('masks sensitive information', () => {
    cy.get('#boltApiKey').should('have.attr', 'type', 'password');
  });
});