import { SpotifyArtist } from "../../lib/spotify-client";
import { HomePageCard } from "../stateless/card";
import GridHexImage from "../grid-hex-image";

export default function FavoriteArtistCard({
  favArtists,
}: {
  favArtists: SpotifyArtist[];
}) {
  if (!favArtists || favArtists.length === 0) {
    return <></>;
  }

  return (
    <HomePageCard className="bg-[#EFEFEF]">
      <h3 className="text-lg self-center text-main">
        {`These day I'm jaming to 🎧`}
      </h3>
      <div className="mt-5" />
      <GridHexImage favArtists={favArtists} />
      <div className="mt-5" />
    </HomePageCard>
  );
}
