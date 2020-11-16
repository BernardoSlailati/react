import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/product";
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
  name: "",
  unity: "",
  quantity: 1,
};

const ProductForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Campo obrigatório.";
    if ("unity" in fieldValues)
      temp.unity = fieldValues.unity ? "" : "Campo obrigatório.";
    if ("quantity" in fieldValues)
      temp.quantity = fieldValues.quantity ? "" : "Campo obrigatório.";

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
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (props.currentId === 0) {
        const onSuccessCreate = () => {
          resetForm();
          addToast("Produto cadastrado com sucesso!", {
            appearance: "success",
          });
        };

        props.createProduct(values, onSuccessCreate);
      } else {
        const onSuccessUpdate = () => {
          resetForm();
          addToast("Produto atualizado com sucesso!", {
            appearance: "success",
          });
        };

        props.updateProduct(props.currentId, values, onSuccessUpdate);
      }
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.productsList.find((x) => x.id === props.currentId),
      });
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid items xs={6}>
          <TextField
            className={classes.smMargin}
            name="name"
            variant="outlined"
            label="Nome"
            value={values.name}
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          ></TextField>
          <TextField
            name="unity"
            variant="outlined"
            label="Unidade"
            value={values.unity}
            onChange={handleInputChange}
            {...(errors.unity && { error: true, helperText: errors.unity })}
          ></TextField>
          <TextField
            name="quantity"
            type="number"
            variant="outlined"
            label="Quantidade"
            value={values.quantity}
            InputProps={{
              inputProps: { min: 1, defaultValue: 1 },
            }}
            onChange={handleInputChange}
            {...(errors.quantity && {
              error: true,
              helperText: errors.quantity,
            })}
          ></TextField>
          <div>
            <Button
              variant="contained"
              className={classes.smMargin}
              color="primary"
              type="submit"
            >
              {props.currentId === 0 ? "Cadastrar" : "Atualizar"}
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              color="secondary"
              onClick={resetForm}
            >
              Resetar
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({ productsList: state.product.list });
const mapActionsToProps = {
  createProduct: actions.create,
  updateProduct: actions.update,
  deleteProduct: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProductForm));
