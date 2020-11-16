import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/product";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
  withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProductForm from "./ProductForm";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
});

const Products = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllProducts();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Deseja realmente deletar esse produto?"))
      props.deleteProduct(id, () =>
        addToast("Produto deletado com sucesso!", { appearance: "info" })
      );
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <Grid container>
        <Grid item xs={4}>
          <ProductForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={8}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Usuário</TableCell>
                  <TableCell>Criado em</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Unidade</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.productsList.map((record, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{record.userName}</TableCell>
                      <TableCell>{record.date.toLocaleString()}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.unity}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => {
                                onDelete(record.id);
                              }}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({ productsList: state.product.list });
const mapActionsToProps = {
  fetchAllProducts: actions.fetchAll,
  deleteProduct: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Products));
