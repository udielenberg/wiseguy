import React from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";
import { WordOption } from "components/AddNote";
const colourOptions: any = [];

interface Props {
  setWord(word: string): void;
  word: string;
  setWords(words: WordOption[]): void;
  words: WordOption[];
}

export const AddIncludeWords = (props: Props) => {
  const { words, word, setWord, setWords } = props;
  const handleChange = (options: any) => {
    setWords(options);
  };

  const handleInputChange = (input: any) => {
    setWord(input);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const validInput = !!word;

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
        isMulti
        onChange={handleChange}
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
