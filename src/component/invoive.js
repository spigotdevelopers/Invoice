/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { showNotification } from "./notification";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import useStyles from "./style";

export default function invoive() {
  const classes = useStyles();
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState();
  console.log(invoiceList.length, invoiceNumber);
  const [customerName, setCustomerName] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const [invoiceDate, setInvoiceDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [inputList, setInputList] = useState([
    {
      itemName: "",
      itemPrice: 650,
    },
  ]);

  function subtotal(items) {
    return items
      .map(({ itemPrice }) => itemPrice)
      .reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(inputList);

  const handleChangeRowData = (e, index) => {
    const newState = [...inputList];
    newState[index].itemName = e.target.value;
    setInputList(newState);
  };

  const fetchData = () => {
    fetch("https://nodemongodbdemo.herokuapp.com/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          setInvoiceList(data.message);
          setInvoiceNumber(data.message.length + 1);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ref = React.createRef();

  const windowPrint = () => {
    if (!customerName) {
      alert("Customer Name is requird");
    } else {
      window.print();
    }
  };

  const createInvoice = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: uuidv4(),
        invoiceNo: JSON.stringify(invoiceNumber),
        customerName: customerName,
        customerAddress: address,
        items: inputList,
        total: invoiceSubtotal,
        invoiceDate: invoiceDate,
      }),
    };
    fetch("https://nodemongodbdemo.herokuapp.com/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          showNotification(data.status, "success");
          alert(data.status, "success");
        }
      });
  };

  const handleAddRows = () => {
    setInputList([
      ...inputList,
      {
        itemName: "",
        itemPrice: 650,
      },
    ]);
  };
  const handleRemoveRows = () => {
    setInputList(inputList.slice(0, -1));
  };
  return (
    <>
      <br />
      <div ref={ref} className={classes.invoive}>
        <Card className={classes.root}>
          <CardContent>
            <Typography color="primary" variant="h4" className={classes.title}>
              <ArrowBackIosIcon
                onClick={() => navigate("/")}
                style={{ fontSize: 25 }}
              />
              Grow Up Consultancy
            </Typography>
            <Typography variant="h5" color="primary" className={classes.titles}>
              Mobile No : 9081733862
            </Typography>
          </CardContent>
          <CardContent className={classes.details}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <Typography
                  style={{ float: "left" }}
                  color="primary"
                  variant="body1"
                >
                  Address :
                </Typography>
                <Typography variant="body1">
                  201, Ambica Pinacle, Lajamani Chowk, Mota Varachha, Surat -
                  39410
                </Typography>
              </Grid>
              <Grid item md={5} xs={12} />
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  value={invoiceNumber}
                  disabled
                  InputLabelProps={{ shrink: invoiceNumber }}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  variant="outlined"
                  type="text"
                  label="Bill no :"
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
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
                            value={item.itemName}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="center">{item.itemPrice}</TableCell>
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
          </CardContent>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography
                  style={{ float: "left" }}
                  color="primary"
                  variant="body1"
                >
                  Customer Signature :
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  style={{ float: "center" }}
                  color="primary"
                  variant="body1"
                >
                  Recived by :
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <Button
        className={classes.Button}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => createInvoice()}
      >
        Save
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
