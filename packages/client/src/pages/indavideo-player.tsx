import { useLocation } from "react-router-dom";
import { trpc } from "../utils/trpc";

export function IndavideoPlayer() {
  const { search } = useLocation();
  const { data, isLoading } = trpc.getIndavideoLinkVideo.useQuery(
    new URLSearchParams(search).get("video") ?? ""
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <iframe
      title="indavideo video player"
      allowFullScreen
      className="indavideo-player"
      id="player-06fc090308"
      width="640"
      height="360"
      src={data?.link}
    ></iframe>
  );
}
