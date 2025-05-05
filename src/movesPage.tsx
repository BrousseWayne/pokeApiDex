import { useState } from "react";
import { TableDemo } from "./components/dataTable";

export function Moves() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        {/* <MyForm setTableData={setTableData} /> */}
      </div>
      <div>{<TableDemo tableData={tableData} />}</div>
    </>
  );
}
