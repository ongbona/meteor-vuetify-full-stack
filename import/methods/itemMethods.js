
import { Meteor } from 'meteor/meteor';
import Item from '../collections/items'
  Meteor.methods({
    findItemById(id){
      return Item.findOne(id)
    },
    insertItem(doc){
      console.log(doc)
      return Item.insert(doc)
    },
    findItem(){
      return Item.find().fetch();
    },
    removeItem(id){
      console.log(id)
      return Item.remove({_id:id})
    },
    updateItem(doc){
      return Item.update({_id:doc._id},{$set:doc})
    }
  })