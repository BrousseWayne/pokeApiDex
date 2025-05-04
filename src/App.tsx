import "./index.css";
import { Input } from "./components/ui/input";
import { forwardRef, SVGProps, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TypeButton } from "./components/ui/typeButton";
import { Button } from "./components/ui/button";
import { Disc2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet, useLocation } from "react-router";

interface CustomIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const CustomIcon = forwardRef<SVGSVGElement, CustomIconProps>(
  ({ size = 24, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`inline-block fill-current ${className}`}
      {...props}
    >
      <path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z" />
    </svg>
  )
);

export function DropdownMenuRadioGroupPoke({ query, onValueChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Search by</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={query} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="type">Type</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const sideBarData = [
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

function StatsArray({ stats }) {
  return (
    <div className="pokemon-stats">
      <div className="stat-row">
        <span>HP</span>
        <span>Atk</span>
        <span>Def</span>
        <span>SpA</span>
        <span>SpD</span>
        <span>Spe</span>
      </div>
      <div className="value-row">
        {stats.map((stat) => (
          <span key={stat.stat.name}>{stat.base_stat}</span>
        ))}
      </div>
    </div>
  );
}

type PokemonData = {
  name: string;
  types: string;
  sprite: string;
  // stats:
};

function TableElement({ pokemon }) {
  return (
    <>
      <TableCell className="font-medium test2">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-15 h-15 object-contain"
        />
        {capitalizeFirstLetter(pokemon.name)}
      </TableCell>
      <TableCell>
        <div className="flex">
          {pokemon.types.map((type) => (
            <TypeButton key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <StatsArray stats={pokemon.stats} />
      </TableCell>
    </>
  );
}
function TableDemo({ tableData }) {
  return (
    <Table>
      <TableBody>
        {!Array.isArray(tableData) ? (
          <TableRow className="test">
            <TableElement pokemon={tableData} />
          </TableRow>
        ) : (
          tableData.map((pokemon) => (
            <TableRow key={pokemon.name}>
              <TableElement pokemon={pokemon} />
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarData.map((data) => (
                <SidebarMenuItem key={data.name}>
                  <SidebarMenuButton asChild>
                    <Link to={data.url}>
                      {data.icon}
                      <span>{data.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// function Breadcrumbs() {
//   console.log(useLocation());
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink href="/">Home</BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }

function Breadcrumbs() {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  // Update state when pathname changes
  useEffect(() => {
    if (pathname !== location.pathname) {
      setPathname(location.pathname); // Manually update the state
    }
  }, [location.pathname]);

  const pathParts = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathParts.map((part, index) => ({
    name: capitalizeFirstLetter(part),
    path: "/" + pathParts.slice(0, index + 1).join("/"),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem key={breadcrumb.path}>
            <BreadcrumbLink href={breadcrumb.path}>
              {breadcrumb.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function MyForm({ setTableData }) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const reponse = await fetch(
      `http://localhost:3000/search?${query}=${inputValue.toLowerCase()}`
    );
    const jsonData = await reponse.json();
    console.log(jsonData);
    if (Array.isArray(jsonData)) {
      const ret = [];
      for (const pkmn of jsonData) {
        ret.push({
          name: pkmn.name,
          types: pkmn.types,
          sprite: pkmn.sprites.front_default,
          stats: pkmn.stats,
        });
      }

      setTableData(ret);
    } else {
      setTableData({
        name: jsonData.name,
        types: jsonData.types,
        sprite: jsonData.sprites.front_default,
        stats: jsonData.stats,
      });
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <DropdownMenuRadioGroupPoke query={query} onValueChange={setQuery} />
      <Input
        type="text"
        placeholder="Enter a type or a pokemon"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit">Query</Button>
    </form>
  );
}

function Layout() {
  return (
    <SidebarProvider>
      <div className="app-layout">
        <AppSidebar />
        <div className="content-area">
          <div className="app-header">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <main className="app-content">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function Search() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        <MyForm setTableData={setTableData} />
      </div>
      <div>{<TableDemo tableData={tableData} />}</div>
    </>
  );
}

export function Moves() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        <MyForm setTableData={setTableData} />
      </div>
      <div>{<TableDemo tableData={tableData} />}</div>
    </>
  );
}

export default Layout;

// TODO: add a default paramater for the search
// TODO: add a placeholder if no sprite
// TODO: Add types
// TODO: Add router
// TODO: Refacto variable names
// TODO: filter longer names
// TODO: add a page for the forms clickable
//TODO: modal if no search by ?
//TODO: animation while fetching
//TODO: add details for moves and individual poke
//TODO: refacto the search ?
