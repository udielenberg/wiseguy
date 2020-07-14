class note {
  newNoteInput() {
    return cy.get('[data-testid="new-note"]');
  }
  addButton() {
    return cy.get("body").contains("Add");
  }
  firstNewNote() {
    return cy.get("tbody > tr > td").first();
  }
  deleteNewNoteButton() {
    return cy.get('[aria-label="delete note"]').first();
  }
  notesTable() {
    return cy.get("tbody");
  }
}

export default note;
