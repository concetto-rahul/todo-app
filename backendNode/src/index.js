const { port, view_engine } = require("./config/index");

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const db = require("./config/db");

const userRouter = require("./router/user");

app.set("view engine", view_engine);

app.get("/", async (req, res) => {
  try {
    const [result] = await db.execute(
      "select * from test where name=? and status=?",
      ["b", 2]
    );
    console.log(result);
  } catch (err) {
    console.log("errr", err.message);
  }
  res.render("home");
});

app.use("/user", userRouter);

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, messageData }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        messageData,
      });
    });
  });

  socket.on("callUser", ({ toIDs, signalData, fromID, name }) => {
    toIDs.forEach((id) => {
      socket.broadcast.to(id).emit("callUser", {
        signal: signalData,
        fromID: fromID,
        name: name,
      });
    });
  });

  socket.on("answerCall", ({ signal, toID }) => {
    socket.broadcast.to(toID).emit("callAccepted", signal);
  });

  socket.on("rejectCall", (userId) => {
    socket.broadcast.to(userId).emit("callRejected", userId);
  });

  socket.on("endCall", (userId) => {
    socket.broadcast.to(userId).emit("callDisconnect", userId);
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

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
