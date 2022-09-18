const { Invoice } = require("@axenda/zatca");
const express = require("express");
const app = express();
require("dotenv").config();

// Make a request for a user with a given ID
app.use(express.json());

const port = process.env.PORT || 3007;

app.post("/getqrcode", (req, res) => {
  const val = req.body;
  const {
    sellerName,
    vatRegistrationNumber,
    invoiceTimestamp,
    invoiceTotal,
    invoiceVatTotal,
  } = val;
  if (
    sellerName === "" ||
    vatRegistrationNumber === "" ||
    invoiceTimestamp === "" ||
    invoiceTotal === "" ||
    invoiceVatTotal === ""
  ) {
    return res.send("please provide all fields");
  }

  if (
    !sellerName ||
    !vatRegistrationNumber ||
    !invoiceTimestamp ||
    !invoiceTotal ||
    !invoiceVatTotal
  ) {
    return res.send("Must have all field");
  }
  async function ss() {
    const invoice = new Invoice({
      sellerName: val.sellerName,
      vatRegistrationNumber: val.vatRegistrationNumber,
      invoiceTimestamp: val.invoiceTimestamp,
      invoiceTotal: val.invoiceTotal,
      invoiceVatTotal: val.invoiceVatTotal,
    });

    const imageData = await invoice.render();
    return res.status(200).json({ QRCODE: imageData });
  }
  ss();
});

app.all("*", (req, res) => {
  res.send("you better to use post method instead!");
});

app.listen(port, () => {
  console.log("server is listening....");
});
