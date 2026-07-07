"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { io, Socket } from "socket.io-client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Globe, Loader2, Shuffle, Sparkle, Video } from "lucide-react";
import VideoRoom from "./components/VideoRoom";

const socket =io(process.env.NEXT_PUBLIC_SOCKET_URL!,{
 transports: ["websocket"],
})


export default function Home() {
  
 

  const [status, setStatus] = useState("idle");
const [roomId,setRoomId]=useState("")
  const startChat = () => {
    socket.emit("start");
    setStatus("waiting");
  };

  useEffect(() => {
  socket.on("matched", ({ roomId }) => {
   setRoomId(roomId)
   setStatus("chatting")
  });

  return () => {
    socket.off("matched");
  };
}, []);



  return (
    <>
      <Navbar />

      <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />


{/* <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
  */}





        <AnimatePresence mode="wait">
          {status === "idle" && 
            <motion.div
              key="idle"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}

              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                <Sparkle />
              </div>

              <div className="text-4xl font-bold tracking-tight">
                Incognito
              </div>

              <p className="text-zinc-400 max-w-md mb-8 mt-4 text-sm sm:text-base">
                Anonymous chat with strangers around the world. Chat with
                people from different countries and cultures without revealing
                your identity.
              </p>

              <motion.button
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.97 }}
                onClick={startChat}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl"
              >
                <Video size={22} />
                Start Chatting
              </motion.button>
            </motion.div>
          }
          {
            status==="waiting" && 
            
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.7}}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6"
            >
              <motion.div
              animate={{rotate:360}}
              transition={{repeat:Infinity,
                duration:1,
                ease:"linear",
              }}
              
              >
                <Loader2 size={56}/>

                
              </motion.div>
              <motion.p
              animate={{opacity:[0.4,1,0.4]}}
              transition={{repeat:Infinity,
                duration:1,
                ease:"linear",
              }}
              className="text-lg sm:text-xl text-zinc-400"
              >
                Matching you with someone new...
              </motion.p>
              
            </motion.div>
          }

          {
            status==="chatting" && roomId &&(
              <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:0.7}}
              className="fixed inset-0 flex flex-col bg-black z-20"
              
              
              >

<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 backdrop-blur bg-black/60">
<div className="flex  items-center gap-2 text-zinc-400 text-sm ">
  <Globe size={20}/>
  Incognito  | connected

</div>
<motion.button
whileHover={{scale:1.05}} 
whileTap={{scale:0.95}}
className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500  text-white font-medium"
>
  <Shuffle size={16}/>
  Next
</motion.button>
</div>

                <div className="flex-1 relative" >
                
                <VideoRoom  roomId={roomId}/>
                </div>
              </motion.div>
            )
          }





        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}



// "use client";

// import { useEffect, useRef } from "react";
// import { motion } from "motion/react";
// import { io, Socket } from "socket.io-client";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { Sparkle, Video } from "lucide-react";

// export default function Home() {
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       transports: ["websocket"],
//     });

//     socketRef.current.on("connect", () => {
//       console.log("✅ Connected:", socketRef.current?.id);
//     });

//     socketRef.current.on("connect_error", (err) => {
//       console.error("❌ Connection Error:", err.message);
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, []);


//   return (
//     <>
//       <Navbar />

//       <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
//         <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

//         <motion.div
//           initial={{ y: -40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
//         >
//           <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
//             <Sparkle />
//           </div>

//           <h1 className="text-4xl font-bold tracking-tight">
//             Incognito
//           </h1>

//           <p className="text-zinc-400 max-w-md mb-8">
//             Anonymous chat with strangers around the world.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.09 }}
//             whileTap={{ scale: 0.97 }}
//             className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold"
//           >
//             <Video />
//             Start Chatting
//           </motion.button>
//         </motion.div>
//       </main>

//       <Footer />
//     </>
//   );
// }





// // "use client";


// // import { motion } from "motion/react";
// // import Navbar from "./components/Navbar";
// // import { Sparkle, Video } from 'lucide-react'
// // import Footer from "./components/Footer";
// // import { io } from "socket.io-client";



// // export default function Home() {


// // const socket=io(process.env.NEXT_PUBLIC_SOCKET_URL,{
// //   transports:['websocket'],
// // });




// //   return (
// //    <>
// //    <Navbar/>
// //    <main className="relative min-h-screen  w-full bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
// //       <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"/>
// //        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"/>
// //        <motion.div
// //       initial={{y:-40, opacity:0}}
// //     animate={{y:0, opacity:1}}
// //     transition={{duration:0.4}}
// //         className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
// // <div  className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
// //   <Sparkle/>
// // </div>
// // <div className="text-4xl sm:text-bold font-bold tracking-tight ">
// //   Incognito
// // </div>
// // <p  className="text-zinc-400 max-w-md mb-8 text-sm sm:text-base">
// //   Anonymus chat with strangers around the world. Chat with people from different countries and cultures without revealing your identity.
// // </p>
// // <motion.button
// //   whileHover={{ scale: 1.09 }}
// //   whileTap={{ scale: 0.97 }}
// //   className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold 
// //   text-lg shadow-xl
// //   ">
// //   <Video/> Start Chatting
// // </motion.button>


// //         </motion.div>
      
// //    </main>
// //    <Footer/>

// //    </>
// //   );
// // }


