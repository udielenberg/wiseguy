import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

interface Props {
  add(note: any): void;
}
export const AddNote = ({ add }: Props) => {
  const [note, setNote] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  const handleEnter = (event: any) => {
    const value = note && note.trim();
    if (event.key === "Enter" && value) {
      add(note);
      setNote("");
    }
  };
  return (
    <Wrapper>
      <TextField
        value={note}
        label="add note..."
        variant="outlined"
        autoFocus
        onKeyDown={handleEnter}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-top: 50px;
`;
