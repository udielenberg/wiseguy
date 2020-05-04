import React, { useState } from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";

const colourOptions: any = [];

interface Props {
  add(words: { label: string; value: string }[]): void;
}

export const AddIncludeWords = (props: Props) => {
  const { add } = props;
  const [words, setWords] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (options: any) => {
    setWords(options);
  };

  const handleInputChange = (input: any) => {
    setInputValue(input);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const validInput = !!inputValue;

    if (validInput && (event.key === "Enter" || event.key === "Tab")) {
      const newWord = { value: inputValue, label: inputValue };
      const updatedWords = [...words, newWord];
      setWords(updatedWords);
      setInputValue("");
      add(updatedWords);
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
        inputValue={inputValue}
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
