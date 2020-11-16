import React from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/login";
import { Grid, TextField, Button, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      minWidth: 230,
    },
  },
  smMargin: {
    margin: theme.spacing(2),
  },
});

const initialFieldValues = {
  userName: "",
  email: "",
  password: "",
  loginEmail: "",
  loginPassword: "",
};

const Login = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validateRegister = (fieldValues = values) => {
    let temp = { ...errors };

    if ("userName" in fieldValues)
      temp.userName = fieldValues.userName ? "" : "Campo obrigatório.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "Campo obrigatório.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Campo obrigatório.";

    setErrors({ ...temp });

    // Checks if all fields are valid
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validateRegister, props.setCurrentId);

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (validateRegister()) {
      const onSuccessCreate = () => {
        resetForm();
        addToast("Usuário cadastrado com sucesso!", {
          appearance: "success",
        });
      };

      props.registerUser(values, onSuccessCreate);
    }
  };

  const validateLogin = (fieldValues = values) => {
    let temp = { ...errors };

    if ("email" in fieldValues)
      temp.loginEmail = fieldValues.loginEmail ? "" : "Campo obrigatório.";
    if ("password" in fieldValues)
      temp.loginPassword = fieldValues.loginPassword
        ? ""
        : "Campo obrigatório.";

    setErrors({ ...temp });

    // Checks if all fields are valid
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (validateLogin()) {
      const onSuccessCreate = () => {
        addToast("Usuário logado com sucesso!", {
          appearance: "success",
        });
      };

      props.loginUser(values, onSuccessCreate);
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmitLogin}
    >
      <Grid items xs={6}>
        <TextField
          name="loginEmail"
          variant="outlined"
          label="Email"
          value={values.loginEmail}
          onChange={handleInputChange}
          {...(errors.loginEmail && {
            error: true,
            helperText: errors.loginEmail,
          })}
        ></TextField>
        <TextField
          name="loginPassword"
          type="password"
          variant="outlined"
          label="Senha"
          value={values.loginPassword}
          onChange={handleInputChange}
          {...(errors.loginPassword && {
            error: true,
            helperText: errors.loginPassword,
          })}
        ></TextField>
        <div>
          <Button
            variant="contained"
            className={classes.smMargin}
            color="primary"
            type="submit"
          >
            Entrar
          </Button>
        </div>
      </Grid>
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmitRegister}
      >
        <Grid items xs={6}>
          <TextField
            className={classes.smMargin}
            name="userName"
            variant="outlined"
            label="Nome de Usuário"
            value={values.userName}
            onChange={handleInputChange}
            {...(errors.userName && {
              error: true,
              helperText: errors.userName,
            })}
          ></TextField>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          ></TextField>
          <TextField
            name="password"
            type="password"
            variant="outlined"
            label="Senha"
            value={values.password}
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          ></TextField>
          <div>
            <Button
              variant="contained"
              className={classes.smMargin}
              color="primary"
              type="submit"
            >
              Cadastrar
            </Button>
          </div>
        </Grid>
      </form>
    </form>
  );
};

const mapStateToProps = (state) => ({ productsList: state.product.list });
const mapActionsToProps = {
  registerUser: actions.register,
  loginUser: actions.login,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
