import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import UserContext from "../../contexts/UserContext";

const columns = [
  { field: "id_usuario", headerName: "ID", width: 30},
  { field: "nombre", headerName: "Nombre", width: 130, editable: true },
  { field: "apellido", headerName: "Apellido", width: 130, editable: true },
  { field: "usuario", headerName: "Usuario", width: 130, editable: true },
  {
    field: "legajo",
    headerName: "Legajo",
    type: "number",
    width: 90,
    editable: true,
  },
  { field: "mail", headerName: "Mail", width: 130, editable: true },
  {
    field: "activo",
    headerName: "Activo",
    type: "boolean",
    width: 90,
    editable: true,
    valueGetter: (params) => {
      if (params.value === 1) {
        return true;
      }
      return false;
      // Convierte el 1 en true y el 0 en false
    },
  },
  {
    field: "nivel_permiso",
    headerName: "Nivel de permiso",
    type: 'singleSelect',
    valueOptions: ['USR', 'USRF', 'ADM'],
    width: 90,
    editable: true,
  },
];

const rows = [
  {id_usuario: 0, nombre: "Esperando datos...", apellido: "Esperando datos...", usuario: "Esperando datos...", legajo: 1234, mail: "Esperando datos...", activo: 1, nivel_permiso: 1}
]

export default function ListarUsuarios() {
  const { state: userList, getAllUsers } = React.useContext(UserContext);
  
  React.useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id_usuario} //con esta linea le digo a data grid que mi id unico es id_usuario, por defecto espera que se llame id
        rows={userList || rows}
        columns={columns}
        loading={!userList}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
