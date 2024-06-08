import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URL;

const connect  = () =>{
    const connnectionStatus = mongoose.connection.readyState;
    if(connnectionStatus ===1){
        console.log('Already connected!');
        return
    }else if(connnectionStatus ===2){
        console.log('Connecting ...');
    }
    try {
    mongoose.connect(MONGO_URI!,{
        dbName:'restapi-nextjs',
        bufferCommands:true
    })
       console.log('Connected'); 
    } catch (error:any) {
        console.log('Error',error);
        throw new Error('Error',error);
        
    }
}

export default connect;