/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment";

export default function invoiceTable() {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      label: "Customer Name",
      name: "customerName",
      options: {
        filter: true,
      },
    },
    {
      label: "Address",
      name: "customerAddress",
      options: {
        filter: true,
      },
    },
    {
      label: "Date",
      name: "invoiceDate",
      options: {
        filter: true,
        customBodyRender: (res) => (
          <label htmlFor="date">
            {res ? moment(res).local().format("ddd, MMM DD, YYYY h:mm A") : " "}
          </label>
        ),
      },
    },
    {
      label: "Price",
      name: "total",
      options: {
        filter: true,
      },
    },
  ];

  const fetchData = () => {
    fetch("https://nodemongodbdemo.herokuapp.com/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvoiceList(data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    customToolbar: () => (
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/createinvoice")}
        >
          Create Invoice
        </Button>
    ),
  };
  return (
    <div style={{ padding: 35 }}>
      <MUIDataTable
        title={"Grow Up Consultancy"}
        data={invoiceList}
        columns={columns}
        options={options}
      />
    </div>
  );
}
