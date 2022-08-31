const mongoose = require('mongoose');
const colors = require('colors');

// 2JQyOws5xOrLzGnL

const connectdb = async() =>{
     const MONGO_URI = 'mongodb+srv://shubhampandey:2JQyOws5xOrLzGnL@cluster0.fxk5vjb.mongodb.net/?retryWrites=true&w=majority'
     try {
        const db_connection = await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log(`db connection host is: ${db_connection.connection.host}`.red.bold);
        
     } catch (error) {
         console.log(error);
         process.exit;
     }


}

module.exports = connectdb;



