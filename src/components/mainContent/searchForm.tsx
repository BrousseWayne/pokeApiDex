import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

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

export function MyForm({ setTableData }) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const reponse = await fetch(
      `http://localhost:3000/pokemon?${query}=${inputValue.toLowerCase()}`
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
    <form method="get" onSubmit={handleSubmit}>
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
