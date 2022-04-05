import Card, { HomePageCard } from "../stateless/card";

export default function FeaturedProjectCard() {
  return (<HomePageCard className="gap-4 accent-body-bg">
    <div className="self-center text-5xl">
      🛠️
    </div>
    <p>
      {`I am working on Scriptbar a browser spotlight tool that allow developer to
      execute handy snippet with a few shortcut. Developer can explore and download
      snippets from SnippetStore`}
    </p>
  </HomePageCard>)
}