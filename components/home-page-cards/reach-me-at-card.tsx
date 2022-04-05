import { HomePageCard } from '../stateless/card';
import FullSizeButton from './full-size-button';

export default function ReachMeAtCard() {
  return <HomePageCard>
    <h3 className="text-lg self-center">You can reach me at 👇</h3>
    <FullSizeButton href={`https://twitter.com/domnguyen5653`} value={`Twitter`} newTab/>
    <FullSizeButton href={`https://www.linkedin.com/in/datdnguyen/`} value={`LinkedIn`} newTab/>
    <FullSizeButton href={`https://github.com/datduyng`} value={`Github`} newTab/>
  </HomePageCard>
}

