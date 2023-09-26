import { useContext, useState, useEffect, useRef, useCallback } from "react";
import UserContext from "../../contexts/UserContext";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import CancelIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

const useFakeMutation = () => {
  return useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.nombre?.trim() === "") {
            reject();
          } else {
            resolve(user);
          }
          if (user.apellido?.trim() === "") {
            reject();
          } else {
            resolve(user);
          }
          if (user.usuario?.trim() === "") {
            reject();
          } else {
            resolve(user);
          }
          if (!isNaN(user.legajo) && user.legajo > 0) {
            resolve(user);
          } else {
            reject();
          }
          if (user.mail?.trim() === "") {
            reject();
          } else {
            resolve(user);
          }
        }, 200);
      }),
    []
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow !== oldRow) {
    return "¿Quiere guardar los cambios?";
  }
  return null;
}

export default function ListarUsuarios() {
  const { state, getAllUsers, updateUser, deleteUser } =
    useContext(UserContext);

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    getAllUsers();
  }, [state.isLoaded]);

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
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const mutateRow = useFakeMutation();
  const noButtonRef = useRef(null);
  const [promiseArguments, setPromiseArguments] = useState(null);

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      const newRowOk = {
        ...newRow,
        activo: newRow.activo ? 1 : 0,
      };
      //pasar el updateUser con el id y el newRow
      updateUser(newRowOk.id_usuario, newRowOk);

      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({
        children: "Usuario modificado exitosamente",
        severity: "success",
      });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({
        children: "El campo no puede estar vacío",
        severity: "error",
      });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Modificar usuario</DialogTitle>
        <DialogContent dividers>{`${mutation}`}</DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Si</Button>
        </DialogActions>
      </Dialog>
    );
  };
  //funcionalidades para borrar usuarios

  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const handleDeleteClick = (id) => () => {
    setOpen(true);
    setIdToDelete(id);
    renderConfirmDelete();
  };
  const renderConfirmDelete = () => {
    if (!open) {
      return null;
    }
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={open}
      >
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent dividers>
          ¿Está seguro que quiere eliminar el usuario?
        </DialogContent>
        <DialogActions>
          <Button
            ref={noButtonRef}
            onClick={() => {
              setOpen(false);
              setIdToDelete(null);
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              deleteUser(idToDelete);
              setOpen(false);
              setIdToDelete(null);
            }}
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    );
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
          <NavLink to={`/editarPass/${id}`}>
            <GridActionsCellItem
              icon={<KeyOutlinedIcon />}
              label="EditPass"
              color="black"
            />
          </NavLink>,
        ];
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {renderConfirmDialog()}
      {renderConfirmDelete()}

      <DataGrid
        getRowId={(row) => row.id_usuario} //con esta linea le digo a data grid que mi id unico es id_usuario, por defecto espera que se llame id
        rows={state.users}
        columns={columns}
        loading={!state.isLoaded}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
