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
import { ChevronDown, ChevronRight } from "lucide-react";

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

//TODO: should spread in the box

const POKEMON_TYPES = [
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

type DamageClass = "Status" | "Physical" | "Special" | "";

type DamageClassSelectProps = {
  value: DamageClass;
  onChange: (newValue: DamageClass) => void;
};

type TypeFilterProps = {
  value: string;
  onChange: (newValue: string) => void;
};

type Operator = "=" | ">" | "<" | "";

type OperatorSelectProps = {
  value: Operator;
  onChange: (newValue: Operator) => void;
};

type GenericTooltipProps = {
  text?: string;
  children: ReactNode;
};

type ActiveFilterBadgeProps = {
  content: string;
  onChange: () => void;
  variant?: "move" | "power" | "type" | "damage";
};

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

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedLabel =
    POKEMON_TYPES.find((type) => type.value === value)?.label ||
    "Select type...";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {selectedLabel}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." className="h-9" />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=""
                onSelect={() => {
                  onChange("");
                  setIsOpen(false);
                }}
              >
                <span className="text-muted-foreground">None</span>
              </CommandItem>
              {POKEMON_TYPES.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(selectedValue) => {
                    onChange(selectedValue === value ? "" : selectedValue);
                    setIsOpen(false);
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

export function GenericTooltip({ text, children }: GenericTooltipProps) {
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

export function OperatorSelect({ value, onChange }: OperatorSelectProps) {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            {value || "None"}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-1">
          <DropdownMenuItem onClick={() => onChange("")}>
            <Label className="text-muted-foreground">None</Label>
          </DropdownMenuItem>

          <GenericTooltip text="Equal">
            <DropdownMenuItem onClick={() => onChange("=")}>
              <Label>=</Label>
            </DropdownMenuItem>
          </GenericTooltip>

          <GenericTooltip text="Greater">
            <DropdownMenuItem onClick={() => onChange(">")}>
              <Label>&gt;</Label>
            </DropdownMenuItem>
          </GenericTooltip>

          <GenericTooltip text="Less">
            <DropdownMenuItem onClick={() => onChange("<")}>
              <Label>&lt;</Label>
            </DropdownMenuItem>
          </GenericTooltip>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function DamageClassSelect({ value, onChange }: DamageClassSelectProps) {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            {value || "None"}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onChange("")}>
            <Label className="text-muted-foreground">None</Label>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onChange("Status")}>
            <Label>Status</Label>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onChange("Physical")}>
            <Label>Physical</Label>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onChange("Special")}>
            <Label>Special</Label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ActiveFilterBadge({
  content,
  onChange,
  variant = "move",
}: ActiveFilterBadgeProps) {
  const colorMap = {
    move: "bg-green-200 text-green-900 hover:bg-green-300",
    power: "bg-yellow-200 text-yellow-900 hover:bg-yellow-300",
    type: "bg-blue-200 text-blue-900 hover:bg-blue-300",
    damage: "bg-purple-200 text-purple-900 hover:bg-purple-300",
  };

  return (
    <div
      className={` flex items-center gap-1 border rounded px-2 py-1 text-sm ${colorMap[variant]}`}
    >
      {content}
      <button type="button" onClick={onChange}>
        ✖
      </button>
    </div>
  );
}

export function MoveSearchFilters() {
  const [isOpen, setIsOpen] = useState(true);
  const [moveName, setMoveName] = useState("");
  const [powerOperator, setPowerOperator] = useState<Operator>("=");
  const [damageClass, setDamageClass] = useState<DamageClass>("");
  const [movePower, setMovePower] = useState("");
  const [moveType, setMoveType] = useState("");

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = {
      moveName,
      powerOperator,
      movePower,
      moveType,
      damageClass,
    };

    console.log(JSON.stringify(query));

    const response = await fetch(`http://localhost:3000/moves`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(query),
    });

    console.log(response);
  }

  return (
    <div className="border rounded p-4 space-y-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-lg font-semibold">Move Search Filters</h2>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>
      <div
        className={`transition-all duration-50 overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {isOpen && (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid items-center gap-2">
              <Label htmlFor="move-name">Move Name</Label>
              <Input
                id="move-name"
                type="text"
                placeholder="Enter a move name"
                value={moveName}
                onChange={(e) => setMoveName(e.target.value)}
              />

              <Label>Move Power</Label>
              <div className="flex gap-2">
                <OperatorSelect
                  value={powerOperator}
                  onChange={setPowerOperator}
                />
                <Input
                  type="number"
                  placeholder="Power"
                  value={movePower}
                  onChange={(e) => setMovePower(e.target.value)}
                  className="w-24"
                />
              </div>

              <Label>Type</Label>
              <TypeFilter value={moveType} onChange={setMoveType} />

              <Label>Damage class</Label>
              <DamageClassSelect
                value={damageClass}
                onChange={setDamageClass}
              />
            </div>

            {(moveName || movePower || moveType || damageClass) && (
              <div className="flex flex-wrap gap-2">
                {moveName && (
                  <ActiveFilterBadge
                    content={`Move: ${moveName}`}
                    onChange={() => setMoveName("")}
                    variant="move"
                  />
                )}
                {movePower && (
                  <ActiveFilterBadge
                    content={`Power: ${powerOperator} ${movePower}`}
                    onChange={() => {
                      setMovePower("");
                      setPowerOperator("=");
                    }}
                    variant="power"
                  />
                )}
                {moveType && (
                  <ActiveFilterBadge
                    content={`Type: ${moveType}`}
                    onChange={() => setMoveType("")}
                    variant="type"
                  />
                )}
                {damageClass && (
                  <ActiveFilterBadge
                    content={`Damage Class: ${damageClass}`}
                    onChange={() => setDamageClass("")}
                    variant="damage"
                  />
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between gap-2 mt-4">
              <Button
                type="button"
                variant="secondary"
                className="hover:bg-red-500 hover:text-white transition-colors transform active:scale-95"
                onClick={() => {
                  setMoveName("");
                  setMovePower("");
                  setPowerOperator("=");
                  setMoveType("");
                  setDamageClass("");
                }}
              >
                Reset Filters
              </Button>

              <Button
                type="submit"
                variant="secondary"
                className="hover:bg-green-600 transition-colors transform active:scale-95"
              >
                Query
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
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
