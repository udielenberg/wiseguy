import Note from "../../fixtures/pages/mainPage";

const note = new Note();
context("Add Note", () => {
  const newTaskValue = "Covid19";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("add/remove a new note", () => {
    note.newNoteInput().type(`${newTaskValue} {enter}`);
    note.firstNewNote().contains(newTaskValue);
    note.deleteNewNoteButton().click();
    note.notesTable().contains(newTaskValue).should("not.exist");
  });
});
