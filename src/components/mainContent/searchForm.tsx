import { ReactNode, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const types = [
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "grass", label: "Grass" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "poison", label: "Poison" },
  { value: "ground", label: "Ground" },
  { value: "flying", label: "Flying" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
  { value: "curse", label: "Curse" },
];

export function TypeFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? types.find((framework) => framework.value === value)?.label
            : "Select type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <Input className="hidden" name="type" />
              {types.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {type.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type TextWithChildrenProps = {
  text?: string; // Optional text prop
  children?: ReactNode; // Optional children
  // className?: string; // For additional styling
};

export function GenericTooltip({ text, children }: TextWithChildrenProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function NumberFilter() {
  const [operator, setOperator] = useState<"=" | ">" | "<">("=");

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            <span id="operator-display">{operator}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1">
          <Input
            type="radio"
            name="operator"
            value="="
            id="operator-eq"
            className="hidden"
            defaultChecked
          />
          <Input
            type="radio"
            name="operator"
            value=">"
            id="operator-gt"
            className="hidden"
          />
          <Input
            type="radio"
            name="operator"
            value="<"
            id="operator-lt"
            className="hidden"
          />
          <GenericTooltip text="Equal">
            <DropdownMenuItem onClick={() => setOperator("=")}>
              <Label htmlFor="operator-eq">=</Label>
            </DropdownMenuItem>
          </GenericTooltip>

          <GenericTooltip text="Greater than">
            <DropdownMenuItem onClick={() => setOperator(">")}>
              <Label htmlFor="operator-gt">&gt;</Label>
            </DropdownMenuItem>
          </GenericTooltip>

          <GenericTooltip text="Less than">
            <DropdownMenuItem onClick={() => setOperator("<")}>
              <Label htmlFor="operator-lt">&lt;</Label>
            </DropdownMenuItem>
          </GenericTooltip>
        </DropdownMenuContent>
      </DropdownMenu>

      <Input type="number" name="value" className="w-24" />
    </div>
  );
}
//TODO: Fill at least one field

//pp: input field with button to select '>' or '<'
//power: slider
//type: input or popup ?
//damage-class radio

export function MoveSearchFilters() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    console.log(formData);
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid items-center gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="move-name">Name</Label>
        </div>
        <Input id="move-name" type="text" placeholder="Enter a move name" />
        <Label htmlFor="move-power">Move Power</Label>
        <NumberFilter />
        <Label htmlFor="move-type">Type</Label>
        <TypeFilter />
      </div>
      <Button type="submit">Query</Button>
    </form>
  );
}

export function MyForm({ setTableData }) {
  const [query, setQuery] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const reponse = await fetch(
      `http://localhost:3000/pokemon?${query}=${formData
        .get("input")
        .toLowerCase()}`,
      {}
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
      <Input type="text" name="input" placeholder="Enter a type or a pokemon" />
      <Button type="submit">Query</Button>
    </form>
  );
}
