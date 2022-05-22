const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PostDB', (err)=>{
    if(err) {
        console.log('Conection has ended with error'+err);
    } else{
        console.log('Connection is successful');
    }
});

module.exports = mongoose;