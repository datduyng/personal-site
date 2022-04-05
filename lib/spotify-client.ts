const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;


const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const TOP_ARTIST_LIMIT = 8;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN || "",
    }).toString(),
  });

  return response.json();
};

export const getTopArtist = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${TOP_TRACKS_ENDPOINT}?limit=${TOP_ARTIST_LIMIT}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json?.items) as Promise<SpotifyArtist[]>;
};

export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}

export const getSpotifyPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }).then(async res => {
    if (res.status === 204) {
      return { is_playing: false }
    }
    return res.json() as Promise<Partial<SpotifyPlaying>>;
  });
};

export interface SpotifyPlaying {
  is_playing: boolean;
}
