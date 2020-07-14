import Note from "../pages/mainPage";
import NoteData from "../pages/notePage";
const noteData = new NoteData();
const note = new Note();
describe("View Note", () => {
  before(() => {
    cy.visit("/");
  });

  it("should read note", () => {
    note.firstNote().click();
    cy.url().should("include", "/note/");
  });
  it("should accept/reject resources", () => {
    noteData.noteApproveButton().click();
    noteData.noteRejectButton().click();
    cy.contains("No metadata.");
  });
  it("should update resources lists", () => {
    noteData.resourcesSection().click();
    noteData.listCounters().each((el) => {
      expect(el.text()).to.include("1");
    });
  });
  it.skip("should have the current Note set as watched", () => {});
  it("should update resources to their right list", () => {
    noteData.approvedListItem().click();
    noteData.resourceRejectButton().click();
    noteData.listIsEmptyMessage();
    noteData.listCounters().each((el, index) => {
      if (el.parent().text().includes("approved")) {
        expect(el.text()).to.include("0");
      } else {
        expect(el.text()).to.include("2");
      }
    });
    noteData.rejectedListItem().click();
    noteData.resourceApproveButton().click();
    noteData.resourceUnreadButton().click();
    noteData.listCounters().each((el, index) => {
      if (el.parent().text().includes("approved")) {
        expect(el.text()).to.include("1");
      } else {
        expect(el.text()).to.include("0");
      }
    });
    noteData.listIsEmptyMessage();
    noteData.notesSection().click();
    note.firstNote().click();
    noteData.noteResourceCount().then((el) => {
      expect(el.text()).to.include("1 / 1");
    });
  });
});
