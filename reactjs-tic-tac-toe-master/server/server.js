const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
// { roomNamess: "", roomMember: [], maxMember:[], mode: "", spectators: [] }
const general = [];
//Array'in için 15 eleman varsa 15 oda var anlamına gelmesi gerek, her biri sırayla gezilip sırayla rooms , roomMember , mode yazdırılacak
const players = [];
// const empty = { names: "", count: "", tür: "", boş: null };
// const rooms = []
const server = http.createServer(app);

const loop = (array, oda) => {
  for (let i = 0; i < list.length; i++) {
    if (array[i]["oda"] === oda) return i;
  }
  return false;
};
// if(rooms[i]["oda"]===room) {    //aynı isimde bir oda varsa
//     if(rooms[i]["member"]===2){
//         console.log("Oda dolu");
//         //emitle göndericez
//     }
//     if(rooms[i]["member"] <=2){
//         rooms[i]["member"]++
//         //emitle odanın sayısının arttığını göstericez
//     }
// } else {    //aynı isimde bir oda yoksa
//     rooms = [...rooms, {"oda": room, "member": 0}]

//     //Yeni bi oda oluşturulduğunu emitle göndericez
// }
// if(rooms[i]["member"]===0){
//     rooms[i].
// }


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", " POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected`);
  socket.emit("oyuncular", players.length);
  //Oyuna her hangi biri bağlandığında görünmesini istediğim port

  socket.on("placement", (data, char) => {
    socket.broadcast.emit("yeniveri", data, char);
    socket.emit("yeniveri", data, char);
  });

  // socket.on("doldur", (transfer)=>{
  //     socket.broadcast.emit("aktar", transfer)
  // })
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  socket.on("getRooms", () => {
    socket.emit("setRooms", general)
  })

  socket.on("sure", () => {
    socket.broadcast.emit("yenile");
    socket.emit("yenile");
  });
  // socket.on("sendName",(name)=>{
  //     socket.broadcast.emit("Katıldı",name)
  // })
  //   socket.on("sendRoom", (room) => {
  //     // rooms[0]["oda"]= room
  //     // rooms.push(room);
  //     socket.emit("roomList", rooms);
  //     socket.broadcast.emit("roomList", rooms);
  //     socket.emit("joinSuccessful", room);
  //     socket.join(room);
  //   });
  socket.on("nicknames", (names) => {
    players.push(names);
    socket.broadcast.emit("oyuncular", players.length);
    socket.emit("oyuncular", names); //kendimiz farklı görünebiliriz o yüzden bunun style ı için farklı bir isimde gönderilebilir
    //oyuncular değil de abc olsun abc ye özel css çıkarılabilir
    console.log(names);
    console.log(players);
    console.log("kullanıcılar geldi");
    
    
  });
  socket.on("odaİsmi", ({name, count, choise}) => {
    if(name && count && choise){
      console.log(name,count,choise);
    //general.push({rooms:odaAdı})
    general.unshift({ roomNames: name, roomMember: [], maxMember:count, mode: choise, spectators: [] })
    console.log(general);
    }
    
    
  });
  
  socket.on("max", (maxPlayer) => {
    console.log(maxPlayer);
    
  });
  socket.on("against", (choise) => {
    console.log(choise);
    
  });
  

  socket.on("joinRequest", (roomName) => {
    const index = loop(rooms, roomName);
    console.log(index);
    console.log("1515");
    if (!index) {
      if (rooms[index]["member"] === 2) {
        socket.emit("full", true);
      }
    } else {
      socket.emit("full", false);
      rooms[index]["member"]++;
      socket.join(roomName);
    }
    // rooms[index][member]++
    //aynı odaya iki kişiden fazla girebilmeli
    //aynı odada iki kişi var ise oda listesinde gri olmalı
    //oda boş ise array listesindne kaldırılmalı
  });
  // socket.on("memberJoined", (newMemberCount)=>{
  //     socket.broadcast.emit("oyuncuKatıldı", newMemberCount)
  //     socket.emit("oyuncuKatıldı",newMemberCount)
  //     console.log(rooms);
  //     console.log("1");
  //     rooms.push(newMemberCount);
  //     console.log(rooms);
  //     console.log("3");

  // } )
});

server.listen(3001, () => {
  console.log("Server running");
  // rooms.map(item=>{if(Object.values(item)[1]==="asd") item[members]=1})
});
