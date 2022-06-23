/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
// import { Button } from "@material-ui/core";

// const history = createBrowserHistory();

export default function invoiceTable() {
  const data = [
    ["Gabby George", "Business Analyst", "Minneapolis"],
    [
      "Aiden Lloyd",
      "Business Consultant for an International Company and CEO of Tony's Burger Palace",
      "Dallas",
    ],
    ["Jaden Collins", "Attorney", "Santa Ana"],
    ["Franky Rees", "Business Analyst", "St. Petersburg"],
    ["Aaren Rose", null, "Toledo"],
    ["Johnny Jones", "Business Analyst", "St. Petersburg"],
  ];

  const columns = [
    { name: "Name", options: { filterOptions: { fullWidth: true } } },
    "Title",
    "Location",
  ];

const getAllUsers = async () => {
    console.log('responseed');
    try{
        const response = await fetch('http://localhost:8000/');
        console.log('response', response);
        return await response.json();
    }catch(error) {
        return [];
    }  
}

useEffect(() => {
    getAllUsers();
}, []);

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
  };

  return (
    <div style={{ padding: 50 }}>
      <ThemeProvider theme={createTheme()}>
        {/* <Button onClick={() => history.push()}>Create Invoice</Button> */}
        <MUIDataTable
          title={"Grow Up Consultancy"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}
