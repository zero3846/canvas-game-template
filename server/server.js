import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(process.cwd(), 'dist')));

// TODO: Define API to act as a controller if the app needs to persist data

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});