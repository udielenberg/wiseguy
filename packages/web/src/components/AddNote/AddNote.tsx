import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { AddIncludeWords } from "components/AddIncludeWords";
import { NotesContext } from "context/Notes/";
export interface WordOption {
  label: string;
  value: string;
}

export const AddNote = () => {
  const { actions } = useContext(NotesContext);
  const { addNote } = actions;
  const [noteText, setNoteText] = useState<string>();
  const [includeWords, setIncludeWords] = useState<any[]>([]);
  const [wordValue, setWordValue] = useState("");

  const cleanedWordsList = includeWords.reduce((agg, option: WordOption) => {
    if (option.label) {
      return [...agg, option.label];
    }
    return agg;
  }, [] as string[]);

  const newNote = {
    search: noteText,
    includeWords: cleanedWordsList,
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNoteText(event.target.value);
    },
    []
  );

  const handleEnter = useCallback(
    (event: any) => {
      const value = noteText && noteText.trim();
      if (event.key === "Enter" && value) {
        addNote(newNote);
        setNoteText("");
        setIncludeWords([]);
      }
      if (event.key === "Tab") {
        // add use case
      }
    },
    [addNote, newNote, noteText]
  );

  const handleAddIncludeWords = useCallback((words: WordOption[]) => {
    setIncludeWords(words);
  }, []);

  const handleAddClick = () => {
    addNote(newNote);
    setNoteText("");
    setIncludeWords([]);
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
      <AddIncludeWords
        noteText={noteText}
        addNote={handleAddClick}
        words={includeWords}
        setWords={handleAddIncludeWords}
        word={wordValue}
        setWord={setWordValue}
      />

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
