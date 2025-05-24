import { ReactNode, useState } from "react";
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

// TODO: map over config object for generic composants

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
          <DropdownMenuItem onClick={() => onChange("=")}>
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
            <Check
              className={cn(
                "ml-auto",
                value === "Status" ? "opacity-100" : "opacity-0"
              )}
            />
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onChange("Physical")}>
            <Label>Physical</Label>
            <Check
              className={cn(
                "ml-auto",
                value === "Physical" ? "opacity-100" : "opacity-0"
              )}
            />
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onChange("Special")}>
            <Label>Special</Label>
            <Check
              className={cn(
                "ml-auto",
                value === "Special" ? "opacity-100" : "opacity-0"
              )}
            />
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

//create useSearchFilters
//remove fetch
//only set filters
export function MoveSearchFilters({ setTableData }) {
  // State management
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    moveName: "",
    powerOperator: "=" as Operator,
    movePower: "",
    moveType: "",
    damageClass: "" as DamageClass,
  });

  // Handlers
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFilterChange = (field: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      moveName: "",
      powerOperator: "=",
      movePower: "",
      moveType: "",
      damageClass: "",
    });
  };

  const formatMoveData = (move: any) => ({
    name: move.name,
    type: move.type.name,
    damageClass: move.damage_class.name,
    power: move.power,
    pp: move.pp,
    accuracy: move.accuracy,
    short_desc: move.effect_entries,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/moves`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moveName: filters.moveName,
          moveStats: {
            movePower: filters.movePower,
            powerOperator: filters.powerOperator,
          },
          moveType: filters.moveType,
          damageClass: filters.damageClass,
        }),
      });

      const data = await response.json();
      setTableData(
        Array.isArray(data) ? data.map(formatMoveData) : formatMoveData(data)
      );
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // maybe implement cache maison
  // Derived state
  const hasActiveFilters = Object.values(filters).some(
    (val) => val !== "" && val !== "="
  );

  return (
    <div className="border rounded p-4 w-full">
      <div
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={toggleOpen}
      >
        <h2 className="text-lg font-semibold">Move Search Filters</h2>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>

      {isOpen && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1">
              <Label className="text-sm font-medium">Move Name</Label>
              <Input
                value={filters.moveName}
                onChange={(e) => handleFilterChange("moveName", e.target.value)}
                placeholder="Enter a move name"
                className="w-full h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Move Power</Label>
              <div className="flex gap-2 items-center">
                <OperatorSelect
                  value={filters.powerOperator}
                  onChange={(op) => handleFilterChange("powerOperator", op)}
                />
                <Input
                  type="number"
                  value={filters.movePower}
                  onChange={(e) =>
                    handleFilterChange("movePower", e.target.value)
                  }
                  placeholder="Power"
                  className="w-full h-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Type</Label>
              <TypeFilter
                value={filters.moveType}
                onChange={(type) => handleFilterChange("moveType", type)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Damage Class</Label>
              <DamageClassSelect
                value={filters.damageClass}
                onChange={(dc) => handleFilterChange("damageClass", dc)}
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.moveName && (
                <ActiveFilterBadge
                  content={`Move: ${filters.moveName}`}
                  onChange={() => handleFilterChange("moveName", "")}
                  variant="move"
                />
              )}
              {filters.movePower && (
                <ActiveFilterBadge
                  content={`Power: ${filters.powerOperator} ${filters.movePower}`}
                  onChange={() => {
                    handleFilterChange("movePower", "");
                    handleFilterChange("powerOperator", "=");
                  }}
                  variant="power"
                />
              )}
              {filters.moveType && (
                <ActiveFilterBadge
                  content={`Type: ${filters.moveType}`}
                  onChange={() => handleFilterChange("moveType", "")}
                  variant="type"
                />
              )}
              {filters.damageClass && (
                <ActiveFilterBadge
                  content={`Damage Class: ${filters.damageClass}`}
                  onChange={() => handleFilterChange("damageClass", "")}
                  variant="damage"
                />
              )}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              className="hover:bg-red-500 hover:text-white transition-colors"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="hover:bg-green-600 hover:text-white transition-colors"
            >
              Query
            </Button>
          </div>
        </form>
      )}
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
