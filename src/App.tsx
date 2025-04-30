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
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { json } from "stream/consumers";
import { TypeButton } from "./components/ui/typeButton";

type PokemonData = {
  name: string;
  types: string;
  sprite: string;
};

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function TableDemo({ tableData }) {
  return (
    <Table>
      <TableBody>
        {tableData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>No data found</TableCell>
          </TableRow>
        ) : (
          tableData.map((pokemon) => (
            <TableRow key={pokemon.name}>
              <TableCell className="font-medium">
                {capitalizeFirstLetter(pokemon.name)}
              </TableCell>
              <TypeButton type={pokemon.types} />
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export function AppSidebar() {
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

export function Breadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

  async function handleSubmit(e) {
    e.preventDefault();

    const reponse = await fetch(
      `http://localhost:3000/search?type=${inputValue}`
    );
    const jsonData = await reponse.json();
    console.log(jsonData);
    const ret = [];
    for (const pkmn of jsonData) {
      ret.push({
        name: pkmn.name,
        types: pkmn.types[0].type.name,
        sprite: pkmn.sprites.front_default,
      });
    }

    setTableData(ret);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
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
    <>
      <SidebarProvider>
        <div className="app-layout">
          <AppSidebar />
          <div className="app-header">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>

          <main className="app-content">
            <MyForm setTableData={setTableData} />
            <div>{<TableDemo tableData={tableData} />}</div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
