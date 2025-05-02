import "./index.css";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TypeButton } from "./components/ui/typeButton";
import { Button } from "./components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
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
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function Breadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
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

function App() {
  const [tableData, setTableData] = useState([]);

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
            <div className="center-box">
              <MyForm setTableData={setTableData} />
            </div>
            <div>{<TableDemo tableData={tableData} />}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;

// TODO: add a default paramater for the search
// TODO: add a placeholder if no sprite
// TODO: Add types
// TODO: Add router
// TODO: Refacto variable names
// TODO: filter longer names
// TODO: add a page for the forms clickable
//TODO: modal if no search by ?
