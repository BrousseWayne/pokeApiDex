import "./index.css";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Button } from "./components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";

import { Input } from "./components/ui/input";
import { useState } from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TypeButton } from "./components/ui/typeButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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

type PokemonData = {
  name: string;
  types: string;
  sprite: string;
};

function TableElement({ pokemon }) {
  return (
    <>
      <TableCell className="font-medium">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-15 h-15 object-contain"
        />
        {capitalizeFirstLetter(pokemon.name)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <TypeButton key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </TableCell>
    </>
  );
}
function TableDemo({ tableData }) {
  return (
    <Table>
      <TableBody>
        {!Array.isArray(tableData) ? (
          <TableRow>
            <TableCell>
              <TableElement pokemon={tableData} />
            </TableCell>
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
        });
      }

      setTableData(ret);
    } else {
      setTableData({
        name: jsonData.name,
        types: jsonData.types,
        sprite: jsonData.sprites.front_default,
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
