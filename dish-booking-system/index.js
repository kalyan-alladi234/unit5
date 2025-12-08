require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./docs/swagger");

connectDB();

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/dish", require("./routes/dish.routes"));
app.use("/order", require("./routes/order.routes"));
app.use("/", require("./routes/password.routes"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(process.env.PORT, () => console.log("Server Running"));
