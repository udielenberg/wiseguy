// @ts-ignore
import React from "react";
import { Note as TNote } from "dummydata/notes";
// import { Note } from "components/Note";
import MaterialTable from "material-table";

interface BaseHeaders {
  type: string;
  header: string;
}
export const baseHeaders: BaseHeaders[] = [
  { type: "search", header: "search" },
  { type: "tags", header: "tags" },
  { type: "date", header: "last time visited" },
  { type: "open", header: "open" },
  { type: "remove", header: "remove" },
  { type: "date", header: "created" },
];

const renderTags = ({ tags }: any) =>
  tags.map((tag: any) => (
    <span
      style={{
        display: "inline-block",
        background: "lightgray",
        borderRadius: 10,
        margin: 10,
        padding: 5,
      }}
      key={tag}
    >
      {tag}
    </span>
  ));

const renderDate = ({ date }: any) => {
  return <span>{date.toDateString()}</span>;
};
const renderSearch = ({ search }: any) => {
  return <span>{search}</span>;
};

function toMaterialUiColumns(headers: BaseHeaders[]) {
  return headers.map(({ type, header }) => {
    const base = {
      title: header,
      field: type,
    };
    if (type === "tags") {
      return {
        ...base,
        render: renderTags,
      };
    }
    if (type === "date") {
      return {
        ...base,
        render: renderDate,
      };
    }
    if (type === "search") {
      return {
        ...base,
        render: renderSearch,
      };
    }
    return { title: header, field: type };
  });
}

const columns = toMaterialUiColumns(baseHeaders);
interface Props {
  notes: TNote[];
  remove?(id: string): void;
  open?(id: string): void;
}

export const NotesTable = ({ notes }: Props) => {
  return <MaterialTable data={notes} columns={columns} />;
};
