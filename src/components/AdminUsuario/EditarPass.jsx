import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from "react";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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

const schema = Yup.object().shape({
   pass: Yup.string()
    .required("Debes ingresar una contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/\d/, "La contraseña debe contener al menos un número")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Debe contener al menos un carácter especial"
    ),
    retypepass: Yup.string()
    .required("Debes ingresar otra vez la contraseña")
    .oneOf([Yup.ref("pass"), null], "Las contraseñas no coinciden"),
});

export default function EditarPass() {
  const {id} = useParams();
  const { editarPass } = useContext(UserContext);

  const { handleChange, handleSubmit, errors, values, setFieldValue, touched } =
    useFormik({
      initialValues: {
        pass: "",
        retypepass: "",
      },
      validationSchema: schema,

      onSubmit: (values, { resetForm }) => {
        editarPass(id, values);
        resetForm();
      },
    });

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
            <LockResetOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar Contraseña
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pass"
                  label="Contraseña"
                  type="password"
                  id="pass"
                  autoComplete="off"
                  error={touched.pass && errors.pass ? true : false}
                  helperText={touched.pass && errors.pass}
                  value={values.pass}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="retypepass"
                  label="Repetir contraseña"
                  type="password"
                  id="retypepass"
                  autoComplete="off"
                  error={touched.retypepass && errors.retypepass ? true : false}
                  helperText={touched.retypepass && errors.retypepass}
                  value={values.retypepass}
                  onChange={handleChange}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modificar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
