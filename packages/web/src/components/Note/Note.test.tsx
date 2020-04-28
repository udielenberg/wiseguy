import React from "react";
import { Note, watchedNoteStyle, unwatchedNoteStyle } from "./Note";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { headers } from "../NotesTable";

const mockedRemove = () => {};
const mockedOpen = () => {};

const setMockedNote = (watched: boolean) => ({
  id: "id",
  date: new Date(),
  search: "search",
  tags: ["tag"],
  lastVisit: new Date(),
  watched,
});

describe("Note component", () => {
  it.each`
    value    | style                 | mode
    ${true}  | ${watchedNoteStyle}   | ${"watched"}
    ${false} | ${unwatchedNoteStyle} | ${"non watched"}
  `("should set note's styles as $mode", ({ value, style, _ }) => {
    const { container } = render(
      <Note
        note={setMockedNote(value)}
        remove={mockedRemove}
        headers={headers}
        open={mockedOpen}
      />
    );

    expect(container.children[0]).toHaveStyle(style);
  });
  it.skip("should update Note's styles after it is being open", () => {
    const { container, getByText } = render(
      <Note
        note={setMockedNote(false)}
        remove={mockedRemove}
        headers={headers}
        open={mockedOpen}
      />
    );
    const openButton = getByText("Open");
    const element = container.children[0];
    expect(element).toHaveStyle(unwatchedNoteStyle);

    fireEvent.click(openButton);

    waitFor(() => {
      fireEvent.keyDown(document.body, { key: "Escape", code: "Escape" });
      waitFor(() => {
        expect(element).toHaveStyle(unwatchedNoteStyle);
      });
    });
  });
});
