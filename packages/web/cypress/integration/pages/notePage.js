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
  noteApproveButton() {
    return cy.contains("Approve");
  }
  noteRejectButton() {
    return cy.contains("Reject");
  }
  resourceApproveButton() {
    return cy.get("button").contains("approve");
  }
  resourceRejectButton() {
    return cy.get("button").contains("reject");
  }
  resourceUnreadButton() {
    return cy.get("button").contains("unread");
  }
  notesSection() {
    return cy.get('[data-testid="menu-link"]').contains("Notes");
  }

  resourcesSection() {
    return cy.contains("Resources");
  }
  approvedListItem() {
    return cy.get(".title").contains("approved");
  }
  rejectedListItem() {
    return cy.get(".title").contains("rejected");
  }
  listCounters() {
    return cy.get(".counter");
  }
  listIsEmptyMessage() {
    return cy.get("div").contains("List is empty.");
  }
}

export default note;
