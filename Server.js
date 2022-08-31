const express = require('express');
const db = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const Playlist = require('./Models/Playlist');
var cors = require('cors')
const User = require('./Models/User');

db();
app.use(express.json());  
app.use(cors());


app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

// route for signup...
app.post("/signup",async(req,res)=>{
    
    try {
        
        const email = req.body.email;
        const password = req.body.password;
       
        const newuser = new User({
            email:email,
            password:password
        })

        const created_user = await newuser.save();
        res.status(201).send(created_user);
    } catch (error) {
        res.status(400).send(error);
    }
})


//  route for login...
app.post("/login",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne({email:email});
   
    try {
        if(result){
            const user_password = result.password;
            if(user_password === password){
                res.status(201).send(result);
            }
            else{
                res.status(401).send("password invalid"); 
            }
        }
        else{
            res.status(404).send("User Not Found");
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
    
    

})



app.post("/Addtonewplaylist",async(req,res)=>{

    
    try {
        const playlist = req.body.playlistname;
        const movie_id = req.body.movie_id;
        const email = req.body.email;
        const access = req.body.access;

        const newplaylist = new Playlist({
              email:email,
              playlistname:playlist,
              access:access
        })
        newplaylist.lists.push(movie_id);
        const created_playlist = await newplaylist.save();
        res.status(201).send(created_playlist);
   
    } catch (error) {
        res.status(400).send(error);
    }

})

app.post("/Addtoexistingplaylist",async(req,res)=>{

   
    
    try {
        const playlist = req.body.playlistname;
        const movie_id = req.body.movie_id;
        const access = req.body.access;
        const update_post = await Playlist.findOneAndUpdate({playlistname:playlist},
            {
              $addToSet:{
                 lists:movie_id
              },
              access:access
            }
        
        )
        res.status(201).send(update_post);


    } catch (error) {
        res.status(401).send(error);
    }
   
})

//  route to get all the playlist...
// Playlist.jsx
app.post("/getallplaylist",async(req,res)=>{
    try {
        const email = req.body.email;
        const result = await Playlist.find({email:email});
        
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error);
    }
    
})


// route to fetch playlist by name...

app.post("/fetchplaylist",async(req,res)=>{
    try {
        const playlist = req.body.playlistname;
        const email = req.body.email;
        const playList = await Playlist.findOne({playlistname:playlist,email:email})
        res.status(201).send(playList)
    } catch (error) {
        res.status(401).send(error);
    }
   
})

// route for delete playlist movie...

app.post("/removemovie",async(req,res)=>{
    try {
        const playlist = req.body.playlistname;
        const movie_id = req.body.movie_id;
        
        const update_post = await Playlist.findOneAndUpdate({playlistname:playlist},
            {
              $pull:{
                 lists:movie_id
              },
             
            }
        
        )
        res.status(201).send(update_post);


    } catch (error) {
        res.status(401).send(error);
    }
})

app.post("/deleteplaylist",async(req,res)=>{
    try {
        const playlist = req.body.playlistname;
        const playList = await Playlist.findOneAndDelete({playlistname:playlist})
        res.status(201).send(playList)
    } catch (error) {
        res.status(401).send(error);
    }
})

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running")
    
    }                
    else 
        console.log("Error occurred, server can't start", error);
    }
);