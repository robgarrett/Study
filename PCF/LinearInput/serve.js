const express = require('express');
const path = require('path');
const port = process.env.PORT || 7777;

const app = express();

// Replace 'public' with the folder you want to serve
const staticFolder = path.join(__dirname, 'out/controls/LinearInputControl');
app.use(express.static(staticFolder));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
