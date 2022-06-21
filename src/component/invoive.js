/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
  TableContainer,
  TableCell,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import moment from "moment";
import { v4 as uuid } from "uuid";
import useStyles from "./style";

export default function invoive() {
  const classes = useStyles();
  const [invoiceNumber, setInvoiceNumber] = useState(uuid().slice(0, 1));
  const [customerName, setCustomerName] = useState();
  const [invoiceDate, setInvoiceDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [inputList, setInputList] = useState([
    {
      name: "",
      price: 650,
    },
  ]);

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(inputList);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = () => {
    localStorage.setItem("Invoice", JSON.stringify(inputList));
    localStorage.setItem("Invoice Id", invoiceNumber);
    localStorage.setItem("Customer Name", customerName);
    localStorage.setItem("Invoice Date", invoiceDate);
    localStorage.setItem("Total Amount of Invoive", invoiceSubtotal);
  };
  const handleChangeRowData = (e, index) => {
    const newState = [...inputList];
    newState[index].name = e.target.value;
    setInputList(newState);
  };

  const ref = React.createRef();

  const windowPrint = () => {
    if(!customerName){
      alert('Customer Name is requird')
    } else {
    document.body.style.visibility = "hidden";
    document.body.style.visibility = "hidden";
    ref.current.style.visibility = " visible";
    ref.current.style.position = "fixed";
    ref.current.style.top = "50%";
    ref.current.style.left = "50%";
    ref.current.style.width = "100%";
    ref.current.style.visibility = " visible";
    ref.current.style.transform = "translate(-50%, -50%)";
    window.print();
    document.body.style.visibility = "visible";
    ref.current.style.position = "unset";
    ref.current.style.width = "unset";
    ref.current.style.top = "unset";
    ref.current.style.left = "unset";
    ref.current.style.transform = "none";
    }
  };

  const handleAddRows = () => {
    setInputList([
      ...inputList,
      {
        name: "",
        price: 650,
      },
    ]);
  };
  const handleRemoveRows = () => {
    setInputList(inputList.slice(0, -1));
  };
  return (
    <>
      <div ref={ref} className={classes.invoive}>
        <Card className={classes.root}>
          <CardContent>
            <Typography color="primary" variant="h3" className={classes.title}>
              Grow Up
            </Typography>
          </CardContent>
          <CardContent className={classes.details}>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <Typography style={{ float: "left" }} variant="body1">
                  Address : Mini Bajar, Surat - 395006
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} />
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  variant="outlined"
                  type="text"
                  disabled
                  label="#Invoice"
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <TextField
                  id="date"
                  label="Customer Name"
                  type="text"
                  fullWidth
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12} />
              <Grid item md={3} xs={12}>
                <TextField
                  id="date"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Invoice Date"
                  type="date"
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  value={invoiceDate}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <TextField
                  id="date"
                  label="Address"
                  type="text"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid item md={12} xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableCellhead}>
                        Item
                      </TableCell>
                      <TableCell className={classes.TableCellhead} />
                      <TableCell className={classes.TableCellhead} />
                      <TableCell className={classes.TableCellhead} />
                      <TableCell
                        align="center"
                        className={classes.TableCellhead}
                      >
                        Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inputList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <TextField
                            id="date"
                            label="Name"
                            type="text"
                            fullWidth
                            size="small"
                            required
                            variant="outlined"
                            onChange={(e) => {
                              handleChangeRowData(e, index);
                            }}
                            value={item.name}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Tooltip title="Add Row">
                          <IconButton
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => handleAddRows()}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Tooltip>
                        &nbsp;
                        <Tooltip title="Remove Row">
                          <IconButton
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => handleRemoveRows()}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </Tooltip>
                        &nbsp; &nbsp;
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={100} />
                      <TableCell />
                      <TableCell />
                      <TableCell align="right">Subtotal:</TableCell>
                      <TableCell align="center">{invoiceSubtotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={100} />
                      <TableCell />
                      <TableCell align="right">Amount Paid:</TableCell>
                      <TableCell align="center">{invoiceSubtotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={100} />
                      <TableCell align="right">Total:</TableCell>
                      <TableCell align="center">
                        {Number(invoiceSubtotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* <Button
              className={classes.Button}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onSubmit()}
            >
              Submit
            </Button> */}
          </CardContent>
        </Card>
      </div>
      <Button
              className={classes.Button}
              variant="contained"
              color="primary"
              size="small"
              onClick={windowPrint}
            >
              Print
            </Button>
    </>
  );
}
