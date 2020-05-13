import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { AddIncludeWords } from "components/AddIncludeWords";
import { NotesContext } from "context/Notes/";
import { cleanedWordsList } from "utils/noteUtils";
import { WordOption } from "models/Note";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";

const whatIsAllThisText = "Add a note and I will do the research for you!";

export const AddNote = () => {
  const { actions } = useContext(NotesContext);
  const { addNote } = actions;
  const [noteText, setNoteText] = useState<string>();
  const [includeWords, setIncludeWords] = useState<any[]>([]);
  const [wordValue, setWordValue] = useState("");

  const newNote = {
    search: noteText,
    includeWords: cleanedWordsList(includeWords),
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const handleEnter = (event: any) => {
    const value = noteText && noteText.trim();
    if (event.key === "Enter" && value) {
      addNote(newNote);
      setNoteText("");
      setIncludeWords([]);
    }
    if (event.key === "Tab") {
      // add use case
    }
  };

  const handleAddIncludeWords = useCallback((words: WordOption[]) => {
    setIncludeWords(words);
  }, []);

  const handleAdd = useCallback(() => {
    addNote(newNote);
    setNoteText("");
    setIncludeWords([]);
  }, [addNote, newNote]);

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          value={noteText}
          label="add note..."
          variant="outlined"
          autoFocus
          onKeyDown={handleEnter}
          onChange={handleChange}
        />
        <StyledTooltip
          title={
            <div style={{ padding: 15, fontSize: "1.2rem", lineHeight: 2 }}>
              {whatIsAllThisText}
            </div>
          }
          placement="right-start"
        >
          <HelpIcon />
        </StyledTooltip>
      </div>
      <AddIncludeWords
        noteText={noteText}
        addNote={handleAdd}
        words={includeWords}
        setWords={handleAddIncludeWords}
        word={wordValue}
        setWord={setWordValue}
      />

      <Button onClick={handleAdd} variant="contained" color="primary">
        Add
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-top: 50px;
`;

const StyledTooltip = styled(Tooltip)`
  margin-left: 15px;
`;
