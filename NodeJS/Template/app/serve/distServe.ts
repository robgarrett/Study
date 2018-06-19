import * as express from "express";
import * as path from "path";

const port = 3000;
const app = express();

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function(err) {
  if (err) { console.log(err); }
});
