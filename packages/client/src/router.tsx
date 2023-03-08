import { createMemoryRouter, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { Header } from "./components/header";
import { Content } from "./components/content";
import { Indavideo } from "./pages/indavideo";
import { IndavideoPlayer } from "./pages/indavideo-player";

export const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-slate-800 text-white">
        <Header />
        <Content />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/indavideo",
        element: <Indavideo />,
      },
      {
        path: "/indavideo-player",
        element: <IndavideoPlayer />,
      },
      {
        path: "/online-filmek",
        element: (
          <>
            <div>online-filmek</div>
            <Link to="/">Home</Link>
          </>
        ),
      },
    ],
  },
]);
