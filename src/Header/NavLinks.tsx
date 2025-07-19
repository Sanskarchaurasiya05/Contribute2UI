import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  url: string;
}

const NavLinks: React.FC = () => {
  const links: NavLink[] = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Upload Job", url: "upload-job" },
    { name: "About us", url: "about" },
  ];
  const location = useLocation();

  return (
    <div className="flex gap-5 h-full items-center text-mine-shaft-300">
      {links.map((link) => {
        const isActive = location.pathname === `/${link.url}`;
        return (
          <div
            key={link.url}
            className={`${
              isActive
                ? "border-bright-sun-400 text-bright-sun-400"
                : "border-transparent"
            } border-t-[3px] h-full flex items-center`}
          >
            <Link to={`/${link.url}`}>{link.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
