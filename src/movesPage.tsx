import { useState } from "react";
import { MoveSearchFilters } from "./components/mainContent/searchForm";
import { MoveTableDemo } from "./components/mainContent/dataTable copy";

const conf = [{
  machin: 
}]

export function Moves() {
  const [tableData, setTableData] = useState([]);

  //mettre le fetch ici
  const handleSubmit = useHandleSubmit()
  return (
    <>
      <div className="center-box">
        <MoveSearchFilters setTableData={setTableData} handleSubmit={handleSubmit}/>
      </div>
      <div>{<MoveTableDemo tableData={tableData} />}</div>
    </>
  );
}
