import { capitalizeFirstLetter } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { TypeButton } from "../ui/typeButton";
import { MoveStatsArray, StatsArray } from "../ui/statsArray";
import { GenericTooltip } from "./searchForm";
import { Label } from "../ui/label";

function MoveTableElement({ move }) {
  const doubleDashIndex = move.name.search("--");
  let moveName: string = move.name;
  const tooltipText = move.short_desc?.[0]?.short_effect;

  if (doubleDashIndex !== -1) {
    moveName = moveName.slice(0, doubleDashIndex);
  }

  moveName = moveName.replaceAll("-", " ");
  moveName = capitalizeFirstLetter(moveName);

  return (
    <>
      <TableCell className="font-medium test2">
        {tooltipText ? (
          <GenericTooltip text={tooltipText}>
            <Label>{moveName}</Label>
          </GenericTooltip>
        ) : (
          moveName
        )}
      </TableCell>
      <TableCell>
        <div className="flex">
          <TypeButton key={move.name} type={move.type} />
        </div>
      </TableCell>
      <TableCell>
        <MoveStatsArray move={move} />
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
