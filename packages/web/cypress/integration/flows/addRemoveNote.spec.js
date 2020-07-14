import Note from "../pages/mainPage";

const note = new Note();
context("Add Note", () => {
  const newTaskValue = "Covid19";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should add/remove a new note", () => {
    note.newNoteInput().type(`${newTaskValue} {enter}`);
    note.firstNote().contains(newTaskValue);
    note.deleteNewNoteButton().click();
    note.notesTable().contains(newTaskValue).should("not.exist");
  });
});
