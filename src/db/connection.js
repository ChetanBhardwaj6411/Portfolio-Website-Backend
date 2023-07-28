const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Successfully connected to the MongoDB database :)');
}).catch(()=>{
    console.log('Some error occurred while trying to connect to the MongoDB database :(');
});


