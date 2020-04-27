import React from "react";
import { Note, watchedNoteStyle, unwatchedNoteStyle } from "./Note";
import { render } from "@testing-library/react";
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
});
