import cn from "classnames";
import Image from "next/image";
import ReactTooltip from "react-tooltip";
import { HomePageCard } from "../stateless/card";
import NoSsr from "../stateless/no-ssr";
import styles from "./recent-watch-card.module.css";
import { LetterboxRssItem } from "../../lib/letterboxd-client";
import * as gtag from "../../lib/gtag.client";

interface RecentWatchCardProps {
  recentWatch?: LetterboxRssItem[];
}

const RecentWatchCard: React.FC<RecentWatchCardProps> = ({ recentWatch }) => {
  return (
    <HomePageCard className="items-center content-center justify-items-center justify-content-center">
      <h3 className="text-lg self-center">Recently watched 🍿</h3>
      <div className="mt-5" />
      <div
        style={{
          margin: "auto",
          width: "260px",
        }}
      >
        <ul className={cn(styles["gallery"])}>
          {recentWatch?.map((movie, index) => (
            <li
              key={"" + movie?.film?.title + movie?.film?.title + "-" + index}
              className={cn(
                "cursor-pointer",
                styles["gallery-item"],
                styles["pic-" + index]
              )}
              data-tip={`${movie?.film?.title} (${movie?.rating?.text})`}
              data-for="recent-watch"
              onClick={() => {
                window.open(movie.uri, "_blank");
                gtag.event('click on recent watch', { value: movie.uri });
              }}
            >
              <Image
                src={
                  movie?.film?.image?.medium ||
                  movie?.film?.image?.large ||
                  movie?.film?.image?.small ||
                  ""
                }
                alt={`Dominic recently watched movie - ${movie.title}`}
                width={120}
                height={160}
                // placeholder={"blur"}
              />
            </li>
          ))}
        </ul>
      </div>
      <NoSsr>
        <ReactTooltip id="recent-watch" />
      </NoSsr>
    </HomePageCard>
  );
};

export default RecentWatchCard;
