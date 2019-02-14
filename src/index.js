const express = require('express');
const app = express();

app.use(require("./routes.js"));
app.listen(3000);