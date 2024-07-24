const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve the static HTML page
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Invalid numbers");
  }

  const result = num1 + num2;
  res.send(`The result is ${result}`);
});

app.post("/calculate", (req, res) => {
  const { operation, num1, num2 } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Invalid numbers");
  }

  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num1 / num2;
      break;
    default:
      return res.status(400).send("Invalid operation");
  }

  res.send(`The result is ${result}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
