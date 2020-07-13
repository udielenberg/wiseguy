import NewNote from "../../fixtures/pages/mainPage";
import NoteData from "../../fixtures/pages/notePage";

const newNote = new NewNote();
const noteData = new NoteData();
context("Move between resources", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("move between resources", () => {
    newNote.firstNewNote().click();
    noteData.noteResourceCount().then((el) => {
      expect(el).to.have.text("(1 / 2)");
    });
    noteData.goRightResource().click();
    noteData.noteResourceCount().then((el) => {
      expect(el).to.have.text("(2 / 2)");
    });
    noteData.goRightResource().click();
    noteData.noteResourceCount().then((el) => {
      expect(el).to.have.text("(2 / 2)");
    });
    noteData.goLeftResource().click();
    noteData.noteResourceCount().then((el) => {
      expect(el).to.have.text("(1 / 2)");
    });
  });
});
