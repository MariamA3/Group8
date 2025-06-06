//handle db connection 
import { config } from 'dotenv';
import { connect } from 'mongoose';


/// Load environment variables from .env file
config();

//getting env variable in a string
const connectionString = process.env.MONGO_URI;

if (!connectionString) {
  throw new Error('MONGO_URI environment variable is not defined');
}

const dbConnection = async () => {
    try {
      await connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }
  };
  

export default dbConnection;