import express from "express";

const app = express();
const port = 3000;

function getFakeData() {
  function addMinutes(date: Date, minutes: number) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getMinutes() + minutes
    ).getTime();
  }

  const date = new Date(2020, 10, 1);

  return [...Array(90).keys()].map((index) => ({
    timestamp: addMinutes(date, 15 * index),
    status: 100,
  }));
}

app.get("/api/v1/status", (req: express.Request, res: express.Response) => {
  res.json({
    projects: [
      {
        id: 1,
        displayName: "Weather display",
        data: getFakeData(),
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
