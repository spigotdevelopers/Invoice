import "./App.css";
import Invoive from "./component/invoive";
import InvoiceTablel from "./component/invoiceTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<InvoiceTablel />}>
        </Route>
        <Route path="/createinvoice/:id" element={<Invoive />}>
        </Route>
        <Route path="/createinvoice" element={<Invoive />}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
