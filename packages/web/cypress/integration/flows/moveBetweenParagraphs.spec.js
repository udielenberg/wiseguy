import NewNote from "../pages/mainPage";
import NoteData from "../pages/notePage";
import range from "lodash/range";

const newNote = new NewNote();
const noteData = new NoteData();

context("Move between resources", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should move between note's paragraphs", () => {
    newNote.firstNote().click();
    noteData.resourceParagraphCount().then((el) => {
      expect(el.text()).to.include("1 / 7");
    });
    noteData.goNextParagraph().click();
    noteData.resourceParagraphCount().then((el) => {
      expect(el.text()).to.include("2 / 7");
    });
    range(6).forEach(() => {
      noteData.goNextParagraph().click();
    });
    noteData.resourceParagraphCount().then((el) => {
      expect(el.text()).to.include("1 / 7");
    });
    noteData.goPrevParagraph().click();
    noteData.resourceParagraphCount().then((el) => {
      expect(el.text()).to.include("7 / 7");
    });
  });
});
