import React from "react";
import { useContext } from "react";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserContext from "../../contexts/UserContext";
import { useFormik } from "formik";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Informática
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function CrearUsuario() {
  const { createUser } = useContext(UserContext);

  const {handleChange, handleSubmit, errors, values} = useFormik({
    initialValues:{
      nombre:"",
      apellido:"",
      legajo:"",
      usuario:"",
      pass:"",
      email:"",
      
    },
    validationSchema: Yup.object({
        nombre: Yup.string().required("Debes ingresar un nombre"),
        apellido: Yup.string().required("Debes ingresar un apellido"),
        usuario: Yup.string()
        .matches(/^\S*$/, 'El usuario no puede contener espacios')
        .required('El campo usuario es obligatorio'),
        email: Yup.string().required("Debes ingresar un email").email("Debes ingresar un email válido"),
        pass: Yup.string().required("Debes ingresar una contraseña").min(8, "La contraseña debe tener al menos 8 caracteres").matches(/\d/,"La contraseña debe contener al menos un número"),
      }),
    onSubmit:(values, { resetForm }) => {
      createUser(values);
      resetForm();
    }
  })

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Agregar Usuario
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nombre"
                  type="text"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                  autoComplete="off"
                  value={values.nombre}
                  error={errors.nombre? true : false}
                  helperText={errors.nombre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="off"
                  value={values.apellido}
                  error={errors.apellido ? true : false}
                  helperText={errors.apellido}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  name="usuario"
                  required
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  autoFocus
                  autoComplete="off"
                  error={errors.usuario ? true : false}
                  helperText={errors.usuario}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="legajo"
                  label="Legajo"
                  name="legajo"
                  autoComplete="off"
                  error={errors.legajo ? true : false}
                  helperText={errors.legajo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mail"
                  label="Email"
                  name="mail"
                  autoComplete="off"
                  type="email"
                  error={errors.mail ? true : false}
                  helperText={errors.mail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pass"
                  label="Contraseña"
                  type="password"
                  id="pass"
                  autoComplete="off"
                  error={errors.pass ? true : false}
                  helperText={errors.pass}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pass2"
                  label="Repetir contraseña"
                  type="password"
                  id="pass2"
                  autoComplete="off"
                  error={errors.pass2 ? true : false}
                  helperText={errors.pass2}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="nivelPermiso">Nivel de Permiso</InputLabel>
                    <Select
                      name="nivel_permiso"
                      labelId="nivelPermiso"
                      id="nivelPermiso"
                      value={nivel_permiso}
                      label="Nivel de Permiso"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem name="nivel_permiso" value="ADM">Administrador</MenuItem>
                      <MenuItem name="nivel_permiso" value="USR">Usuario</MenuItem>
                      <MenuItem name="nivel_permiso" value="USRF">Usuario Full</MenuItem>
                    </Select>
                  </FormControl>
                </Box> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Agregar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
