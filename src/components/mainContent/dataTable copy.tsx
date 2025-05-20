import { capitalizeFirstLetter } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { TypeButton } from "../ui/typeButton";
import { MoveStatsArray, StatsArray } from "../ui/statsArray";
import { GenericTooltip } from "./searchForm";

function MoveTableElement({ move }) {
  return (
    <>
      <TableCell className="font-medium test2">
        {/* <GenericTooltip text={move.effect_entries[0].short_effect}> */}
        {capitalizeFirstLetter(move.name)}
        {/* </GenericTooltip> */}
      </TableCell>
      <TableCell>
        <div className="flex">
          <TypeButton key={move.name} type={move.type} />
        </div>
      </TableCell>
      <TableCell>
        <MoveStatsArray stats={move} />
      </TableCell>
    </>
  );
}
export function MoveTableDemo({ tableData }) {
  return (
    <Table>
      <TableBody>
        {!Array.isArray(tableData) ? (
          <TableRow className="test">
            <MoveTableElement move={tableData} />
          </TableRow>
        ) : (
          tableData.map((move) => (
            <TableRow key={move.name}>
              <MoveTableElement move={move} />
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
