require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // Importer le module mongoose
const cors = require("cors");
const app = express();

const cityController = require("./controllers/CityController");
const zoneController = require("./controllers/ZoneController");
const pharmacyController = require("./controllers/PharmacyController");

mongoose
  .connect(process.env.MONGO_URI, {
    // Configurer la connexion à la base de données
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use("/api/cities", cityController);
app.use("/api/zones", zoneController);
app.use("/api/pharmacies", pharmacyController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
