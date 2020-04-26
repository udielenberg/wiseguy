import React, { useState } from "react";
import { Input, InputOnChangeData } from "semantic-ui-react";
import styled from "styled-components";

interface Props {
  add(note: any): void;
}
export const AddNote = ({ add }: Props) => {
  const [note, setNote] = useState<string>();

  const handleChange = (_: any, data: InputOnChangeData) => {
    setNote(data.value);
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
      <Input
        size="huge"
        icon="add"
        value={note}
        placeholder="Add note..."
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-top: 50px;
`;
