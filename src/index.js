const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
userList = [];
idNum = 0;
app.post("/users", (req, res) => {
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    id: idNum,
  };
  idNum++;
  userList.push(userInfo);
  res.status(201).send(userInfo);
});

app.get("/users/:id", (req, res) => {
  const user = userList.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Can't find user" });
  } else {
    res.status(200).send(user);
  }
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  const user = userList.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Can't find user" });
  } else {
    user.name = req.body.name;
    user.email = req.body.email;
    res.status(200).send(user);
  }
  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  const index = userList.findIndex((user) => user.id == req.params.id);

  if (index == -1) {
    return res.status(404).json({ error: "No content" });
  }

  userList.splice(index, 1);
  res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing
