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
    if (input === ",") return;
    setWord(input);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // condition: word is not empty
    const validInput = !!word;
    // condition: means there are no more new words to add cuz "validInput" is empty, so Enter can finally Add a Note
    const readyToSubmit = !validInput && event.key === "Enter" && noteText;
    // condition: new word is not unique
    const isUniqueNewWord = !Boolean(
      words.find((_word) => _word.value === word)
    );
    // condition: new word is valid and ready to be added
    const validNewWordToAdd =
      validInput &&
      (event.key === "Enter" || event.key === "Tab" || event.key === ",");

    if (readyToSubmit) {
      addNote();
    }

    if (validNewWordToAdd) {
      // Prevent from adding a word that already exists
      if (isUniqueNewWord) {
        const newWord = { value: word, label: word };
        const updatedWords: WordOption[] = [...words, newWord];
        setWords(updatedWords);
        setWord("");
      }
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
  margin: 20px 0;
`;
