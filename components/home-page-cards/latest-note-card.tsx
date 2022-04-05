import { HomePageCard } from "../stateless/card";
import { NoteListSchema } from "../../lib/notion-api-client";
import FullSizeButton from "./full-size-button";

export default function LatestNoteCard({ note }: { note?: NoteListSchema }) {
  if (!note) {
    return null;
  }
  
  return (
    <HomePageCard>
      <h3 className="text-lg self-center">📝 Latest note</h3>
      <div className="h-[1px] bg-secondary-reallight my-4" />
      <h5 className="font-semibold">{note?.name}</h5>
      <p className="text-secondary mt-3">{note?.previewDesc}</p>
      <FullSizeButton primary href={`/notes`} value={'Explore all notes'}/>
    </HomePageCard>
  );
}
