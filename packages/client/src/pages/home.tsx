import clsx from "clsx";
import { Link } from "react-router-dom";

const ITEMS = [
  {
    title: "indavideo",
    href: "/indavideo",
  },
  {
    title: "online-filmek",
    href: "/online-filmek",
  },
];

export function Home() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ITEMS.map((item, index) => (
        <Link
          key={item.title}
          to={item.href}
          tabIndex={0}
          className={clsx(
            "font-bold p-24 text-3xl text-center bg-slate-500 rounded-xl border-black border-2"
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
