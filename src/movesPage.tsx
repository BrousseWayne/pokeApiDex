import { useState } from "react";
import { MoveSearchFilters } from "./components/mainContent/searchForm";
import { MoveTableDemo } from "./components/mainContent/dataTable copy";

export function Moves() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        <MoveSearchFilters setTableData={setTableData} />
      </div>
      <div>{<MoveTableDemo tableData={tableData} />}</div>
    </>
  );
}
