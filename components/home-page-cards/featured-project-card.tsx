import Card, { HomePageCard } from "../stateless/card";

export default function FeaturedProjectCard() {
  return (<HomePageCard className="gap-4 accent-body-bg">
    <div className="self-center text-5xl">
      🛠️
    </div>
    <p>
      {`I am working on `}
      <a className="underline" href="https://domnguyen.qstack.us/notes/e21a10d11e404241b4b9495675603097-demoshot-tool-to-create-3d-transform-image-shot" target={'_blank'}>
        DemoShot
      </a>
      {`, a web tool that allow developer to create 3d transformed product thumbnail 
      and cover page with browser border for twitter, producthunt, chrome web store, social media post.`}
    </p>
  </HomePageCard>)
}