import express from "express";
import path from "path";

const __dirname = path.dirname(import.meta.dirname);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});