/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, Tooltip, IconButton } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";

export default function invoiceTable() {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();

  const deleteInvoice = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`https://nodemongodbdemo.herokuapp.com/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert(data.status, "success");
          fetchData();
        }
      });
  };
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
    {
      label: "Action",
      name: "_id",
      options: {
        filter: true,
        customBodyRender: (res, rowData) => (
          <>
            <Tooltip title="Edit Invoice">
              <IconButton
                color="primary"
                size="medium"
                component="span"
                title="Edit Invoice"
                onClick={() =>
                  navigate(`/createinvoice/${rowData.rowData[4]}`)
                }
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Invoice">
              <IconButton
                color="secondary"
                size="medium"
                component="span"
                title="Delete Invoice"
                onClick={() => {
                  deleteInvoice(rowData.rowData[4])
                }}
              >
                <DeleteOutline color="secondary" />
              </IconButton>
            </Tooltip>
          </>
        ),
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
