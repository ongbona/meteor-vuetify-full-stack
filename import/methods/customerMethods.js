
import { Meteor } from 'meteor/meteor';
import Customer from '../collections/customers'
  Meteor.methods({
    findCustomerById(id){
      return Customer.findOne(id)
    },
    insertCustomer(doc){
      return Customer.insert(doc)
    },
    findCustomer(){
      return Customer.find().fetch();
    },
    removeCustomer(id){
      return Customer.remove({_id:id})
    },
    updateCustomer(doc){
      return Customer.update({_id:doc._id},{$set:doc})
    }
  })