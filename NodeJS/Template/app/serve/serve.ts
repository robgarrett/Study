import * as express from "express";
import * as path from "path";
import * as open from "open";

const port = 3000;
const app = express();

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
