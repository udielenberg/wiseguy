class note {
  goLeftResource() {
    return cy.get('[aria-label="previous resource"]');
  }
  goRightResource() {
    return cy.get('[aria-label="next resource"]');
  }
  noteResourceCount() {
    return cy.get('[data-testid="metadata-section"]').first();
  }
}

export default note;
