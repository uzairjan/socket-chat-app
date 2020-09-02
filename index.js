const app = require('express')();
const http = require('http').createServer(app);
const io  = require('socket.io')(http);

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname +'/index.html');
});

let users = {};
io.on('connection',(sockect)=> {
    console.log('a user connected');
    //handle user logins
    sockect.on('login',(user)=> {
        users[sockect.id] = user.userId;
    console.log('users: ',users);
    })


    // handle chat section
    sockect.on('new message',(data)=>{
        io.emit('new message',data.message);
        console.log('new message',data);
    });


    sockect.on('disconnect',()=> {
        console.log('a user disconnected');
    })
});


http.listen(3000, ()=> {
    console.log('listening on port 3000');
});