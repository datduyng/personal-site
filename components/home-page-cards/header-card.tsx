import Image from "next/image";
import Card from "../stateless/card";

export default function HeaderCard() {
  return (
    <Card className="flex flex-row flex-wrap-reverse sm:flex-nowrap px-5 py-8">
      <div>
        <h1 className="text-4xl font-bold">Dominic Nguyen</h1>
        <h3 className="text-2xl font-bold mt-2">Tech @ Microsoft</h3>
        <p className="font-normal text-secondary mt-2">
          I'm a passionate Tech Lover from Seattle, WA. Apart from that, I'm an
          opensource enthusiast. Love ⛷️ 🧗 🏃‍♂️
        </p>
      </div>
      <div className="self-center flex-shrink-0">
        <Image src="/avatar.png" width={120} height={120} alt="Dominic Nguyen Avatar"/>
      </div>
    </Card>
  );
}
