import NewNote from "../pages/mainPage";
import NoteData from "../pages/notePage";

const newNote = new NewNote();
const noteData = new NoteData();

context("Move between resources", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should move between resources", () => {
    newNote.firstNote().click();
    noteData.noteResourceCount().then((el) => {
      expect(el.text()).to.include("1 / 2");
    });
    noteData.goNextResource().click();
    noteData.noteResourceCount().then((el) => {
      expect(el.text()).to.include("2 / 2");
    });
    noteData.goNextResource().click();
    noteData.noteResourceCount().then((el) => {
      expect(el.text()).to.include("2 / 2");
    });
    noteData.goPrevResource().click();
    noteData.noteResourceCount().then((el) => {
      expect(el.text()).to.include("1 / 2");
    });
  });
});
