const { Invoice } = require("@axenda/zatca");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3007;

app.get("/test", (req, res) => {
  res.send("Hello Worlds");
});

app.post("/getqrcode", async(req, res) => {
  try{
  const forms = req.body;
    for(let item in forms){
      if(!item){
        return res.send("please provide all fields");
      }
    }
    const invoice = new Invoice({
      sellerName: forms.sellerName,
      vatRegistrationNumber: forms.vatRegistrationNumber,
      invoiceTimestamp: forms.invoiceTimestamp,
      invoiceTotal: forms.invoiceTotal,
      invoiceVatTotal: forms.invoiceVatTotal,
    });

    const imageData = await invoice.render();
    return res.status(200).json({ QRCODE: imageData });
  }catch(err){
   res.send(err.message) 
  }
});

app.all("*", (req, res) => {
  res.send("This route does not exist");
});

app.listen(port, () => {
  console.log("server is listening....");
});
