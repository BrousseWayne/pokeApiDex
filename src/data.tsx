import { Disc2 } from "lucide-react";
import { CustomIcon } from "./components/customIcon";

export const sideBarData = [
  {
    name: "Pokemon",
    icon: <CustomIcon size={32} className="white-blue-500" />,
    url: "/search",
    // icon: <Disc2 color="#3e9392" style={{ height: 32 }} />,
  },
  {
    name: "Moves",
    icon: <Disc2 color="#3e9392" style={{ height: 32 }} />,
    url: "/moves",
  },
];
