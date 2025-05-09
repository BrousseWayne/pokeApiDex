import { useState } from "react";
import { TableDemo } from "./components/mainContent/dataTable";
import { MoveSearchFilters } from "./components/mainContent/searchForm";

export function Moves() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        {/* <MyForm setTableData={setTableData} /> */}
        <MoveSearchFilters />
      </div>
      <div>{<TableDemo tableData={tableData} />}</div>
    </>
  );
}
