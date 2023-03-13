import { Link } from "react-router-dom";
import { trpc } from "../utils/trpc";

export function Indavideo() {
  const { data, isLoading, error } = trpc.getIndavideoSearch.useQuery("asd");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>
      <div>{error.message}</div>
      <div>{error.data?.path}</div>
      <div>{error.data?.code}</div>
      <div>{error.data?.stack}</div>
      <div>{error.data?.httpStatus}</div>
      <div>{error.shape?.message}</div>
    </>;
  }

  return (
    <div className="gap col-span-1 w-full">
      <div className="">
        <input />
        <button>Search</button>
      </div>
      <ul>
        {data.map((d) => (
          <li>
            <Link to={"/indavideo-player" + "?video=" + d.href}>{d.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
