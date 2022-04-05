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
    <Link href={href}>
      <a className={cn("md:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-all", isActive ? 'text-text font-semibold' : "text-secondary font-normal",)}>
        {children}
      </a>
    </Link >
  )
}

export default NavLink;