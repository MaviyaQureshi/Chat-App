import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Map to store users by their socket ID
const usersMap = new Map();

// Function to add a user to the map
const addUser = (userData, socketId) => {
  try {
    if (!usersMap.has(userData.sub)) {
      usersMap.set(userData.sub, { ...userData, socketId });
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Function to remove a user from the map
const removeUser = (socketId) => {
  try {
    for (const [userId, userData] of usersMap.entries()) {
      if (userData.socketId === socketId) {
        usersMap.delete(userId);
        break; // Stop loop after removing the user
      }
    }
  } catch (error) {
    console.error("Error removing user:", error);
  }
};

// Function to get a user from the map
const getUser = (userId) => {
  return usersMap.get(userId);
};

io.on("connection", (socket) => {
  console.log("User connected");

  // Handle new user connection
  socket.on("addUser", (userData) => {
    try {
      addUser(userData, socket.id);
      io.emit("getUsers", Array.from(usersMap.values()));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  });

  // Handle message sending
  socket.on("sendMessage", (data) => {
    try {
      const user = getUser(data.receiverId);
      if (user && user.socketId) {
        io.to(user.socketId).emit("getMessage", data);
      } else {
        console.log(`User ${data.receiverId} is not connected.`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
    io.emit("getUsers", Array.from(usersMap.values()));
  });
});
