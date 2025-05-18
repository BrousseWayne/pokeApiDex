import { useState } from "react";
import { MoveSearchFilters } from "./components/mainContent/searchForm";
import { TableDemo2 } from "./components/mainContent/dataTable copy";

export function Moves() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        <MoveSearchFilters setTableData={setTableData} />
      </div>
      <div>{<TableDemo2 tableData={tableData} />}</div>
    </>
  );
}
