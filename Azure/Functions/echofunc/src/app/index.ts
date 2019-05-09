
// Main entry file.
import * as express from "express";

const port = 3000;
const app = express();

// Default route handler.
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start Express.
app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
