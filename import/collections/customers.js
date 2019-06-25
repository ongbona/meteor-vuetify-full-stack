// import { Mongo } from 'meteor/mongo'
// const Customer = new Mongo.Collection('customers')
// export default Customer


import SimpleSchema from 'simpl-schema'
import { Mongo } from "meteor/mongo";

const Customer = new Mongo.Collection("customers");
let schema = {};

schema.customers = new SimpleSchema({
   name:String,
   age:Number,
   gender:String,
   phone:String,
   address:String,
});
Customer.attachSchema(schema.customers);
export default Customer;