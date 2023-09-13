 const validations =(values) => {
  let errors = {};
  const soloLetrasEspacios = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/; //letras y espacios
  const soloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/; //letras sin espacios
  const esMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //mails
  const longitudMinima = 8;
  const tieneNumero = /\d/;
  const tieneMayuscula = /[A-Z]/;
  const tieneMinuscula = /[a-z]/;
  const tieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const esNumero = /^[0-9]+$/;

  if (!values.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio";
  } else if (!soloLetrasEspacios.test(values.nombre)) {
    errors.nombre = "El nombre solo puede contener letras";
  }
  if (!values.apellido) {
    errors.apellido = "El apellido es obligatorio";
  } else if (!soloLetrasEspacios.test(values.apellido)) {
    errors.apellido = "El apellido solo puede contener letras";
  }
  if (!values.usuario) {
    errors.usuario = "El usuario es obligatorio";
  } else if (!soloLetras.test(values.usuario)) {
    errors.usuario = "El usuario solo puede contener letras sin espacios";
  }
  if (!values.legajo) {
    errors.legajo = "El campo es obligatorio";
  }else if (!esNumero.test(values.legajo)) {
    errors.legajo = "El legajo solo puede contener números";
  }
  if (!values.pass) {
    errors.pass = "El campo es obligatorio";
  } else if (values.pass.length < longitudMinima) {
    errors.pass = "La contraseña debe tener al menos 8 caracteres";
  } else if (!tieneMayuscula.test(values.pass)) {
    errors.pass = "La contraseña debe tener al menos 1 letra mayúscula";
  } else if (!tieneNumero.test(values.pass)) {
    errors.pass = "La contraseña debe tener al menos 1 número";
  } else if (!tieneMinuscula.test(values.pass)) {
    errors.pass = "La contraseña debe tener al menos 1 letra minúscula";
  } else if (!tieneCaracterEspecial.test(values.pass)) {
    errors.pass = "La contraseña debe tener al menos 1 caracter especial";
  }
  if (values.pass !== values.pass2) {
    errors.pass2 = "Las contraseñas no coinciden";
  }
  if (!values.mail) {
    errors.mail = "El mail es obligatorio";
  } else if (!esMail.test(values.mail)) {
    errors.mail = "Debe ingresar un mail válido";
  }
  return errors;
}
export default validations