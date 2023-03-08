import { Link } from "react-router-dom";
import { trpc } from "../utils/trpc";

export function Indavideo() {
  const { data, isLoading } = trpc.getIndavideoSearch.useQuery("asd");

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gap col-span-1 w-full">
      <div className="">
        <input />
        <button>Search</button>
      </div>
      <ul>
        {data?.map((d) => (
          <li>
            <Link to={"/indavideo-player" + "?video=" + d.href}>{d.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
