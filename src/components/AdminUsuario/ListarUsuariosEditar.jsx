import { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";


export default function ListarUsuariosEditar() {

  const { state, getAllUsers, deleteUser, updateUser } = useContext(UserContext);
  useEffect(() => {
    getAllUsers();
  }, [state.isLoaded]);
 

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {

    
    deleteUser(id);
  
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    
    const newRowOk = {
      ...newRow,
      activo: newRow.activo ? 1 : 0,
    }
    //pasar el updateUser con el id y el newRow
    updateUser(newRowOk.id_usuario, newRowOk);
    return newRowOk;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id_usuario", headerName: "ID", width: 30 },
    { field: "nombre", headerName: "Nombre", width: 150, editable: true },
    { field: "apellido", headerName: "Apellido", width: 150, editable: true },
    { field: "usuario", headerName: "Usuario", width: 130, editable: true },
    {
      field: "legajo",
      headerName: "Legajo",
      type: "number",
      width: 90,
      align: "right",
      headerAlign: "left",
      editable: true,
    },
    { field: "mail", headerName: "Mail", width: 150, editable: true },
    {
      field: "activo",
      headerName: "Activo",
      type: "boolean",
      width: 90,
      editable: true,
      valueGetter: (params) => {
        if (params.value == 1) {
          return true;
        } else if (params.value == 0) {
          return false;
          // Convierte el 1 en true y el 0 en false
        }
      },
    },
    {
      field: "nivel_permiso",
      headerName: "Nivel de permiso",
      type: "singleSelect",
      valueOptions: ["USR", "USRF", "ADM"],
      width: 130,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<KeyOutlinedIcon />}
            label="EditPass"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.id_usuario} //con esta linea le digo a data grid que mi id unico es id_usuario, por defecto espera que se llame id
        rows={state.users }
        columns={columns}
        loading={!state.isLoaded}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
       
      />
    </Box>
  );
}





