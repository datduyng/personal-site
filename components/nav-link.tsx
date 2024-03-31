import Link from "next/link";
import { useRouter } from "next/router";
import cn from 'classnames';

interface NavLinkProps {
  href: string;
  active?: boolean;
}
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href} className={cn("px-3 py-2 rounded-lg transition-all md:inline-block hover:bg-gray-800", isActive ? 'font-semibold text-text' : "font-normal text-secondary",)}>
      {children}
    </Link >
  )
}

export default NavLink;