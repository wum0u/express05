import express from "express";
import data1 from "./singers.json" assert { type: "json" };
const { singers } = data1.singers;

const app = express();

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/singer/:id.html", (req, res) => {
  const { id } = req.params;
  let result = singers.find((singer) => singer.id === parseInt(id));
  if (!result) {
    res.status(404);
    res.json({ error: "見つからん" });
    return false;
  }
  res.json(result);
  res.send(`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${result.singer_name}のページ</title>
</head>

<body>
  <h1>${result.singer.name}のページ</h1>
  <img src="${result.singer_name}" alt="">
</body>

</html>
  `)
});

app.listen(3000, () => {
  console.log("running at http://localhost:3000");
});
