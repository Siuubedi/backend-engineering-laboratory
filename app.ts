import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { error } from "node:console";
const app = express();
const PORT = 3001;


app.get("/json", (req: Request, res: Response) => {
    res.status(200).json(
        {
            id: 1,
            name: "Subigya"
        }
    )
})

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"))

// Error handler must come after routes
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})