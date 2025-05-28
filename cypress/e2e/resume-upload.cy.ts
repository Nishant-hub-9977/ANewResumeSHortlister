describe('Resume Upload', () => {
  beforeEach(() => {
    // Mock authentication
    cy.window().then((win) => {
      win.sessionStorage.setItem('supabase.auth.token', 'fake-token');
    });
    cy.visit('/');
  });

  it('allows uploading valid resume files', () => {
    cy.get('[data-testid="resume-upload"]').attachFile({
      filePath: 'resume.pdf',
      mimeType: 'application/pdf'
    });
    cy.contains('Upload Resume').click();
    cy.contains('Resume uploaded successfully').should('be.visible');
  });

  it('shows error for invalid file types', () => {
    cy.get('[data-testid="resume-upload"]').attachFile({
      filePath: 'invalid.txt',
      mimeType: 'text/plain'
    });
    cy.contains('Invalid file type').should('be.visible');
  });
});