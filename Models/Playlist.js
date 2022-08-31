const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
   
}
const PlaylistSchema = mongoose.Schema({
    email:reqString,
    playlistname:{
        type: String,
        required: true,
    },
    access:reqString,
    lists:[String],
    
    
})

module.exports = mongoose.model('playlist',PlaylistSchema);