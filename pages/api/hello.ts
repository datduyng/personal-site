// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getMyRecentWatch } from "../../lib/letterboxd-client";
import { getTopArtist } from "../../lib/spotify-client";
import { getMyNotionNoteListData } from "../../lib/notion-api-client";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const artists = await getTopArtist();
  const movies = await getMyRecentWatch();
  const notes = await getMyNotionNoteListData();

  res.status(200).json({
    // name: 'John Doe', artists, movies, notionPage,
    // notionColleciton,
    notes,
  });
}
