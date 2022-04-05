import type { NextPage, GetStaticProps } from "next";
import DefaultLayout from "../../components/default-layout";
import NoteList from "../../components/note-list";
import {
  getMyNotionNoteListData,
  NoteListSchema,
} from "../../lib/notion-api-client";

const NoteIndex: NextPage<NoteIndexProps> = ({ notes, archivedNotes }) => {
  return (
    <DefaultLayout>
      <NoteHeaderCard
        title={`📝 Featured Notes`}
        desc={`This is a space for me to keep notes and share my weekly learning
        process. I write about web developments and tech careers. Hope you
        enjoy!`}
      />
      <NoteList notes={notes} />
      <div className="divide-y divide-y-reverse divide-white" />
      <NoteHeaderCard title={`🗄 Archives`} desc={``} />
      <NoteList notes={archivedNotes} />
    </DefaultLayout>
  );
};

const NoteHeaderCard = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="px-5 pt-8 pb-5">
      <h1 className="text-4xl font-bold text-left">{title}</h1>
      <p className="font-normal text-secondary mt-3">{desc}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let allNotes = (await getMyNotionNoteListData()) || [];
  const notes = allNotes.filter((n) => n?.published && !n?.archived && n?.name);
  const archivedNotes = allNotes.filter(
    (n) => n?.published && n?.archived && n?.name
  );
  return {
    props: {
      notes,
      archivedNotes,
    } as NoteIndexProps,
    revalidate: 60,
  };
};

interface NoteIndexProps {
  notes: NoteListSchema[];
  archivedNotes: NoteListSchema[];
}

export default NoteIndex;
