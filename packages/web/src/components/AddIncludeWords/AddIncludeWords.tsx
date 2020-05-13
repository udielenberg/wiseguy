import React from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";
import { WordOption } from "models/Note";
const colourOptions: any = [];

interface Props {
  setWord(word: string): void;
  word: string;
  setWords(words: WordOption[]): void;
  words: WordOption[];
  addNote(): void;
  noteText: string | undefined;
}

export const AddIncludeWords = (props: Props) => {
  const { words, word, setWord, setWords, addNote, noteText } = props;

  const handleInputChange = (input: string) => {
    setWord(input);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const validInput = !!word;
    if (!validInput && event.key === "Enter" && noteText) {
      addNote();
    }
    if (validInput && (event.key === "Enter" || event.key === "Tab")) {
      const newWord = { value: word, label: word };
      const updatedWords: WordOption[] = [...words, newWord];
      setWords(updatedWords);
      setWord("");
    }
  };

  return (
    <Wrapper>
      <CreatableSelect
        placeholder="Add words that should be included in the article"
        isMulti
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        options={colourOptions}
        value={words}
        inputValue={word}
        menuIsOpen={false}
        isClearable
        components={{ DropdownIndicator: null }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  padding: 10px;
  text-align: center;
`;
