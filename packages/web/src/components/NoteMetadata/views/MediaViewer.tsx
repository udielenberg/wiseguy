import React from "react";
import styled from "styled-components";
import Info from "shared/Info";

interface Props {
  images: string[];
}

export const MediaViewer: React.FC<Props> = (props) => {
  const { images } = props;

  if (images.length) {
    return (
      <Wrapper>
        <Info
          title="images"
          content={
            <ImageContainer>
              {images.map((img: string) => (
                <img key={img} src={img} alt="blabla" />
              ))}
            </ImageContainer>
          }
        />
      </Wrapper>
    );
  } else return null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: block;
  flex: 1;
  margin-top: 10px;
  padding: 10px;
  background: lightgray;
  border-radius: 5px;

  img {
    margin-right: 10px;
    width: 100px;
    height: 100px;
  }
`;
