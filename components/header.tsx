import NavLink from "./nav-link";

const Header = () => {
  return (
    <nav className="flex items-center justify-between w-full text-secondary pt-8">
      <div>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/notes">Notes</NavLink>
        <NavLink href="/projects">Projects</NavLink>
      </div>
      <div>
        <NavLink href="https://github.com/datduyng/domnguyen.qstack.us">
          Github
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
