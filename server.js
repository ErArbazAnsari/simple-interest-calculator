const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS
app.use(cors());

// Route to handle Simple Interest calculation
app.get("/get-si", (req, res) => {
    const { principle, rate, time } = req.query;

    if (!principle || !rate || !time) {
        return res
            .status(400)
            .send(
                "Missing required query parameters: principle, rate, and time"
            );
    }

    const principleNum = parseFloat(principle);
    const rateNum = parseFloat(rate);
    const timeNum = parseFloat(time);

    if (isNaN(principleNum) || isNaN(rateNum) || isNaN(timeNum)) {
        return res.status(400).send("Query parameters must be valid numbers");
    }

    const result = (principleNum * rateNum * timeNum) / 100;
    res.status(200).send(result.toString());
});

// Serve the index.html file at the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
});
