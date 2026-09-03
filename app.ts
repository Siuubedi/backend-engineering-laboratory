import "dotenv/config";
import express, { Request, Response } from "express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { routeNotFound } from "./middleware/routeNotFound";

const PORT = env.PORT
const app = express();

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

// No route matched above
app.use(routeNotFound)

// Error handler must come after routes
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})