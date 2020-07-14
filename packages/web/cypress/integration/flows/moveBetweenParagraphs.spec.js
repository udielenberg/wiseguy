import NewNote from "../pages/mainPage";
import NoteData from "../pages/notePage";
import range from "lodash/range";
const newNote = new NewNote();
const noteData = new NoteData();
context("Move between resources", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("move between note's paragraphs", () => {
    newNote.firstNote().click();
    noteData.resourceParagraphCount().then((el) => {
      console.log("first counter:", el.text());
      expect(el).to.have.text("1 / 7");
    });
    noteData.goNextParagraph().click();
    noteData.resourceParagraphCount().then((el) => {
      expect(el).to.have.text("2 / 7");
    });
    range(6).forEach(() => {
      noteData.goNextParagraph().click();
    });
    noteData.resourceParagraphCount().then((el) => {
      cy.log("counter:", el.text());
      expect(el).to.have.text("1 / 7");
    });
    noteData.goPrevParagraph().click();
    noteData.resourceParagraphCount().then((el) => {
      expect(el).to.have.text("7 / 7");
    });
  });
});
