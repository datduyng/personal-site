import type { NextApiRequest, NextApiResponse } from "next";
import { getSpotifyPlaying } from "../../lib/spotify-client";

type Data = {
  nowPlaying: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const nowPlayingData = await getSpotifyPlaying();
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30'
    );
    if (nowPlayingData.is_playing) {
      return res.json({ nowPlaying: true });
    }
    return res.json({ nowPlaying: false });
  } catch (err) {
    return res.status(500).json({ nowPlaying: false })
  }
}
