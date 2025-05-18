import { capitalizeFirstLetter } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { TypeButton } from "../ui/typeButton";
import { StatsArray } from "../ui/statsArray";

function TableElement2({ move }) {
  return (
    <>
      <TableCell className="font-medium test2">
        {/* <img
          src={move.sprite}
          alt={move.name}
          className="w-15 h-15 object-contain"
        /> */}
        {capitalizeFirstLetter(move.name)}
      </TableCell>
      <TableCell>
        <div className="flex">
          <TypeButton key={move.name} type={move.type} />
        </div>
      </TableCell>
      <TableCell>{/* <StatsArray stats={move.stats} /> */}</TableCell>
    </>
  );
}
export function TableDemo2({ tableData }) {
  return (
    <Table>
      <TableBody>
        {!Array.isArray(tableData) ? (
          <TableRow className="test">
            <TableElement2 move={tableData} />
          </TableRow>
        ) : (
          tableData.map((pokemon) => (
            <TableRow key={pokemon.name}>
              <TableElement2 move={pokemon} />
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
