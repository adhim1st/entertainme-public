const express = require("express");
const app = express();
const port = 4000;
const routes = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`connected to ${port}`);
});
