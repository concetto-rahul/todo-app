const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log("ididid", id);
  socket.on("send-message", ({ recipients, messageData }) => {
    console.log("recipients, messageData",recipients, messageData);
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        messageData,
      });
    });
  });

  // console.log("user connected", socket.id);
  // socket.emit("me", socket.id);

  // socket.on("message", (data) => {
  //   io.emit("message", data);
  //   // socket.broadcast.emit("message", data);
  // });

  // socket.on("callUser", (data) => {
  //   console.log("callUser",data);
  //   io.to(data.toID).emit("callUser", {
  //     signal: data.signalData,
  //     fromID: data.fromID,
  //     name: data.name,
  //   });
  // });

  // socket.on("answerCall", (data) => {
  //   console.log("answerCall",data);
  //   io.to(data.toID).emit("callAccepted", data.signal);
  // });

  // socket.on("endCall", (data) => {
  //   socket.broadcast.emit("endCall");
  // });

  // socket.on("disconnect", () => {
  //   socket.broadcast.emit("endCall");
  //   console.log("user disconnected", socket.id);
  // });
});

server.listen(5000, () => {
  console.log("server is connecting");
});
