import cn from "classnames";
import { useRouter } from "next/router";
import { NoteListSchema } from "../lib/notion-api-client";
import * as gtag from "../lib/gtag.client";

interface NoteListProps {
  notes?: NoteListSchema[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  if (!notes) {
    return <></>;
  }
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 w-full">
      {notes.map((note) => (
        <NoteCardItem
          key={note.id}
          onClick={() => {
            const noteUrl = `notes/${note.id}`;
            router.push(noteUrl);
            gtag.event('click on note', { value: noteUrl, label: note.name });
          }}
        >
          <h3 className="text-2xl font-bold cursor-pointer">
            {note.page_emoji ? note.page_emoji + " " : ""}{note.name || ""}
          </h3>
          <h6 className="text-md text-white mt-1">{note.previewDesc}</h6>
          <p className="text-secondary text-sm mt-1">{note.location ? note.location + " ⸱ " : ""}{note.publishedDate}</p>
        </NoteCardItem>
      ))}
    </div>
  );
};

export const NoteCardItem: React.FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className={cn("flex flex-col px-5 py-6 cursor-pointer")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default NoteList;
