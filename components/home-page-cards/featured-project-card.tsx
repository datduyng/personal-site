import Card, { HomePageCard } from "../stateless/card";

export default function FeaturedProjectCard() {
  return (<HomePageCard className="gap-4 accent-body-bg">
    <div className="self-center text-5xl">
      🛠️
    </div>
    <p>
      {`I am working on `}
      <a className="underline" href="https://figbaros.domng.net/" target={'_blank'}>
        FigbarOS
      </a> {` (only work well on MacOS at the moment)`}
      {`, a fresh approach to the web browser. Imagine a worksplace where you can browse the web spatially and mindmap without having to switch context to multiple app.`}
    </p>
  </HomePageCard>)
}
