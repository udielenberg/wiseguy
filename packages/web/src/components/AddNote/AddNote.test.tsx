import React from "react";
import { AddNote } from "./AddNote";
import { render, fireEvent } from "@testing-library/react";

describe("AddNote component", () => {
  it.skip("should clear text after enter", () => {
    const { getByTestId } = render(<AddNote />);
    const element = getByTestId("addNote").children[0];
    const inputValue = "blabla";
    fireEvent.change(element, { target: { value: inputValue } });
    expect(element.value).toBe(inputValue);

    fireEvent.keyDown(element, { key: "Enter", code: "Enter" });
    expect(element.value).toBe("");
  });
});
