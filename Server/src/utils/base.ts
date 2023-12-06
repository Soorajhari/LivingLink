const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/LivingLinkData', {
      
    });
        console.log('Connected to MongoDB hi every');
  } catch (error:any) {
    console.error('Failed to connect to MongoDB', error);
  }
}

export {connectToMongoDB }