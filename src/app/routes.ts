import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { TrackShipmentPage } from "./pages/TrackShipmentPage";
import { GetQuotePage } from "./pages/GetQuotePage";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "track-shipment", Component: TrackShipmentPage },
      { path: "get-quote", Component: GetQuotePage },
    ],
  },
]);
