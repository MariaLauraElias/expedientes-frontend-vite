import * as React from "react";
import { useContext } from "react";
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
  const {createUser} = useContext(UserContext);
  
  const [nivelPermiso, setNivelPermiso] = React.useState("");

  const handleChange = (event) => {
    setNivelPermiso(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const values = {
      nombre: data.get("nombre"),
      apellido: data.get("apellido"),
      legajo: data.get("legajo"),
      usuario: data.get("usuario"),
      nivel_permiso: data.get("nivelPermiso"),
      activo: 1,
      mail: data.get("mail"),
      pass: data.get("pass"),
    }
    createUser(values);
    
  };

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
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="usuario"
                  required
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  autoFocus
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="legajo"
                  label="Legajo"
                  name="legajo"
                  autoComplete="off"
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
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="nivelPermiso">Nivel de Permiso</InputLabel>
                    <Select
                      name="nivelPermiso"
                      labelId="nivelPermiso"
                      id="nivelPermiso"
                      value={nivelPermiso}
                      label="Nivel de Permiso"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="ADM">Administrador</MenuItem>
                      <MenuItem value="USR">Usuario</MenuItem>
                      <MenuItem value="USRF">Usuario Full</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
