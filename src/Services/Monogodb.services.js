import { MongoClient, ObjectId } from "mongodb";
class MongoDB {
  async connect(baseUrl) {
    try {
      this.client = new MongoClient(baseUrl);
      await this.client.connect();
      this.db= this.client.db('project')
      console.log("Database Connected Successful");
      return true;
    } catch (e) {
      console.log("BD ERROR: " + e);
      return false;
    }
  }

  async register(data){
   return await this.db.collection('user').insertOne(data)
  }

  async login(email){
    return  await  this.db.collection('user').findOne({email})
  }

  async cartcount(id){
    return  this.db.collection('user').aggregate([{$match:{_id:new ObjectId(id)}},{$count:"countall"}]) 
  }
}

const mongodb = new MongoDB();
// mongodb.connect().then(()=>{
//     mongodb.register()

// })
export default mongodb;
