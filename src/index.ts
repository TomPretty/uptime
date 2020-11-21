import express from "express";

const app = express();
const port = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ timestamp: Date.now() });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
