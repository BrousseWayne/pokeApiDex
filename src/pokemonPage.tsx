import { useState } from "react";
import { MyForm } from "./components/mainContent/searchForm";
import { TableDemo } from "./components/mainContent/dataTable";

export function Search() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <div className="center-box">
        <MyForm setTableData={setTableData} />
      </div>
      <div>{<TableDemo tableData={tableData} />}</div>
    </>
  );
}
