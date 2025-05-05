import { capitalizeFirstLetter } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { TypeButton } from "../ui/typeButton";
import { StatsArray } from "../ui/statsArray";

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
export function TableDemo({ tableData }) {
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
