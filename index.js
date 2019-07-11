const app = require("./server");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

module.exports = app;
