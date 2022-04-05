import type { NextPage, GetStaticProps } from "next";
import { NotionAPI } from 'notion-client';
import type * as notion from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import DefaultLayout from "../../components/default-layout";
import { getMyNotionNoteListData } from "../../lib/notion-api-client";

//@ts-ignore
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

//@ts-ignore
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

const NoteIdPage: NextPage<NoteProps> = ({ recordMap }) => {
  return (
    <DefaultLayout>
      {recordMap && <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        disableHeader={true}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
        }}
        showTableOfContents={true}
        minTableOfContentsItems={1}
        previewImages={!!recordMap.preview_images}
      />}
    </DefaultLayout>
  );
};

export default NoteIdPage;

const notionApi = new NotionAPI();
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    let noteId = (params?.noteId as string)?.split('-')?.[0];
    const recordMap = await notionApi.getPage(noteId);
    if (!recordMap) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        recordMap
      } as NoteProps,
      revalidate: 60,
    };
  } catch (e) {
    console.error('errrrrrreereer', e);
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const allNotes = (await getMyNotionNoteListData()) || [];
  const allNoteIds = allNotes
    .map(n => n?.id.replace(/-/g, ' '))
    .map(id => `/notes/${id}`);
  console.info("Pre-building static site for these note with ids", allNoteIds);
  return {
    paths: [...allNoteIds],
    fallback: true, // false or 'blocking'
  };
}

interface NoteProps {
  recordMap?: notion.ExtendedRecordMap;
}
