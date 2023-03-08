import { Link } from "react-router-dom";

const ELEMENTS = [
  {
    to: "/",
    title: "home",
  },
  {
    to: "/indavideo",
    title: "indavideo",
  },
  {
    to: "/online-filmek",
    title: "online-filmek",
  },
];

export function Header() {
  return (
    <header className="bg-slate-800 text-white px-4 py-8 text-xl">
      <ul className="flex">
        {ELEMENTS.map((e) => (
          <li key={e.title}>
            <Link className="p-4" to={e.to}>
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
