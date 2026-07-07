// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// dotenv.config();

// const port = process.env.PORT || 8000;

// // Create HTTP server
// const httpServer = createServer();

// // Create Socket.IO server with proper CORS
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         credentials: true
//     },
//     transports: ['websocket', 'polling'],
//     allowEIO3: true,
//     pingTimeout: 60000,
//     pingInterval: 25000
// });

// // Connection handler
// io.on("connection", (socket) => {
//     console.log(`✅ New client connected: ${socket.id}`);
//     console.log(`📊 Total clients: ${io.engine.clientsCount}`);
    
//     // Send a welcome message to the client
//     socket.emit("welcome", { 
//         message: "Connected to server!", 
//         id: socket.id 
//     });

//     io.on("connection", (socket) => {
//         console.log(socket.id);
//         socket.on("name",(data)=>{
//             console.log(data)
//         })
//     })

//     // Handle disconnect
//     socket.on("disconnect", (reason) => {
//         console.log(`❌ Client disconnected: ${socket.id}, Reason: ${reason}`);
//         console.log(`📊 Total clients: ${io.engine.clientsCount}`);
//     });
    

//     // Handle errors
//     socket.on("error", (error) => {
//         console.error(`⚠️ Socket error for ${socket.id}:`, error);
//     });
// });

// // Server error handling
// httpServer.on('error', (error) => {
//     console.error('Server error:', error);
// });

// // Start server
// httpServer.listen(port, () => {
//     console.log(`🚀 Socket.IO server running on port ${port}`);
//     console.log(`📍 Server URL: http://localhost:${port}`);
// });


import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import {v4 as uuid} from "uuid";

dotenv.config();

const server = http.createServer()
const port=process.env.PORT || 5000;

const io=new Server(server,{cors:{ origin:"*"  }});
const waitingQueue=[]
const activePairs=new Map();//[usera ,user b]

io.on("connection",(socket)=>{



console.log(socket.id);

if(waitingQueue.includes(socket.id)) return
socket.on("start",()=>{
    if(waitingQueue.length >0){
    const partner=waitingQueue.shift()
    const roomId=uuid()
    activePairs.set(socket.id,partner)
    activePairs.set(partner,socket.id)
    socket.emit("matched",{roomId})
     socket.to(partner).emit("matched",{roomId})
    



    }else{
        waitingQueue.push(socket.id);
    }
})

}); 

server.listen(port,()=>{
console.log(`Server is running on port ${port}`);
}

);
