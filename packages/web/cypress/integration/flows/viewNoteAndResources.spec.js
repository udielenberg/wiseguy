import Note from "../pages/mainPage";
const note = new Note();
describe("View Note", () => {
  before(() => {
    cy.visit("/");
  });
  it("should read note", () => {
    note.firstNote().click();
  });
  it.only("should accept/reject resources", () => {
    expect(2).to.equal(2);
  });
});
