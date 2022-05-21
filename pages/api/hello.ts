// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getMyRecentWatch } from "../../lib/letterboxd-client";
import { getTopArtist } from "../../lib/spotify-client";
import { getMyArchivedNotionNoteListData, getMyNotionNoteListData, getMyPublicNotionNoteListData } from "../../lib/notion-api-client";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const artists = await getTopArtist();
  const movies = await getMyRecentWatch();
  const notes = await getMyNotionNoteListData();
  const publicNotes = await getMyPublicNotionNoteListData();
  const archivedNotes = await getMyArchivedNotionNoteListData();

  res.status(200).json({
    // name: 'John Doe', artists, movies, notionPage,
    // notionColleciton,
    publicNotes,
    archivedNotes,
    notes,
  });
}
