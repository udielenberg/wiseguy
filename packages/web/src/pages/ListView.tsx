import React from "react";
import { useParams } from "react-router-dom";
import { Resource } from "models/Note";

interface Props {
  data: Resource[];
  type: string;
}

export const ListView: React.FC<Props> = ({ data, type }) => {
  const { type: viewType } = useParams();

  return (
    <div>
      <h1>ListView</h1>
      {viewType}
    </div>
  );
};
