const server = require("./server");

// local variables
const PORT = 3000;

//Respond with "hello world" for requests that hit our root "/"
server.get(‘/’, function (req, res) {
 res.send(‘hello world’);
});

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
