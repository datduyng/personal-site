//@ts-ignore
import letterboxd from 'letterboxd';

const LETTERBOX_USER = process.env.LETTERBOX_USER;

if (!LETTERBOX_USER) {
  throw new Error('LETTERBOX_USER environment variable is not set');
}

const LIMIT = 4;// client only support 4 movies being displayed atm

export async function getMyRecentWatch() {
  const movies: LetterboxRssItem[] | null = await letterboxd(LETTERBOX_USER);
  return movies?.filter((movie) => movie?.type?.toLocaleLowerCase() === 'diary').slice(0, LIMIT) || [];
}

export interface LetterboxRssItem {
  type: string
  date: {
    published: number
    watched?: number
  };
  film?: {
    title: string
    year: string
    image: {
      tiny: string
      small: string
      medium: string
      large: string
    }
  }
  rating?: {
    text: string
    score: number
  }
  review?: string
  spoilers?: boolean
  isRewatch?: boolean
  uri: string
  title?: string
  description?: string
  ranked?: boolean
  films?: Film2[]
  totalFilms?: number
}

export interface Film2 {
  title: string
  uri: string
}
