class note {
  goPrevResource() {
    return cy.get('[aria-label="previous resource"]');
  }
  goNextResource() {
    return cy.get('[aria-label="next resource"]');
  }
  noteResourceCount() {
    return cy.get('[data-testid="metadata-section"]').first();
  }
  goPrevParagraph() {
    return cy.get('[aria-label="previous paragraph"]');
  }
  goNextParagraph() {
    return cy.get('[aria-label="next paragraph"]');
  }
  resourceParagraphCount() {
    return cy.get('[data-testid="paragraph-counter"]');
  }
}

export default note;
