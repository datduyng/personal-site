import ReactTooltip from "react-tooltip";
import Image from "next/image";
import NoSsr from "./stateless/no-ssr";
import styles from "./grid-hex-image.module.css";
import { SpotifyArtist } from "../lib/spotify-client";
import * as gtag from '../lib/gtag.client';

export function HexImage({ favArtist }: { favArtist: SpotifyArtist }) {
  const imageLink = favArtist.images?.[0].url;
  return (
    <div
      className={styles["hex"]}
      data-tip={favArtist.name}
      data-for="fav-artists"
      onClick={() => {
        window.open(favArtist?.external_urls?.spotify, "_blank");
        gtag.event('click on artist', { value: favArtist.name });
      }}
    >
      <Image
        className={styles["img-hex"]}
        src={imageLink}
        alt={`Favorite artist ${favArtist.name}`}
        height={90}
        width={90}
      />
    </div>
  );
}

export default function GridHexImage({
  favArtists,
}: {
  favArtists: SpotifyArtist[];
}) {
  return (
    <>
      <section className={styles["hexagon-gallery"]}>
        {favArtists?.map((artist, index) => (
          <HexImage key={artist.id} favArtist={artist} />
        ))}
      </section>
      <NoSsr>
        <ReactTooltip id="fav-artists" />
      </NoSsr>
    </>
  );
}
