import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { AddIncludeWords } from "components/AddIncludeWords";
import { NoteSearchAndWords } from "models/Note";

interface Props {
  add(note: NoteSearchAndWords): void;
}

interface WordOption {
  label: string;
  value: string;
}

export const AddNote = ({ add }: Props) => {
  const [noteText, setNoteText] = useState<string>();
  const [includeWords, setIncludeWords] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };
  const handleEnter = (event: any) => {
    const value = noteText && noteText.trim();
    if (event.key === "Enter" && value) {
      add({
        search: noteText,
        includeWords,
      });
      setNoteText("");
    }
    if (event.key === "Tab") {
      console.log("tab");
    }
  };

  const handleAddIncludeWords = (words: WordOption[]) => {
    const cleanedList = words.reduce((agg, option: WordOption) => {
      if (option.label) {
        return [...agg, option.label];
      }
      return agg;
    }, [] as string[]);

    setIncludeWords(cleanedList);
  };

  const handleAddClick = () => {
    add({
      search: noteText,
      includeWords,
    });
    setNoteText("");
  };

  return (
    <Wrapper>
      <TextField
        value={noteText}
        label="add note..."
        variant="outlined"
        autoFocus
        onKeyDown={handleEnter}
        onChange={handleChange}
      />
      <AddIncludeWords add={handleAddIncludeWords} />

      <Button onClick={handleAddClick} variant="contained" color="primary">
        Add
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-top: 50px;
`;
