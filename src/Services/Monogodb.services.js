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

  async addProduct(data,filesCount){
    return this.db.collection('product').insertOne({
      ...data,
      filesCount,
    })
  }
  async basicProductDetails(category){
    return await  this.db.collection('product').find({category},{projection:{id:{$toString:"$_id"},title:"$short_title",price:1,_id:0}}).toArray()
  }
  async detailedProductDetails(id){
    return await this.db.collection('product').findOne({_id:new ObjectId(id)},{projection:{id:{$toString:"$_id"},title:1,quantity:1,more_details:1,category:1,price:1,filesCount:1,_id:0,short_title:1}})
  }
  async addToCart(id,user_id,quantity){
    return await this.db.collection('cart').insertOne({p_id:id,user_id,quantity})
  }
}

const mongodb = new MongoDB();
export default mongodb;
