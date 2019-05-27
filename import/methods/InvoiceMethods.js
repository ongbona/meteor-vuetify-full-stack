
import { Meteor } from 'meteor/meteor';
import Invoice from '../collections/invoices'

  Meteor.methods({
    findInvoiceById(id){
      return Invoice.findOne(id)
    },
    insertInvoice(doc){
      return Invoice.insert(doc)
    },
    findInvoiceByDate(selector){
      if(Meteor.isServer){
        let data=Invoice.aggregate(
          [
            {
              $match: selector
          },
              {
                  $lookup: {
                         from: "customers",
                         localField: "customerId",
                         foreignField: "_id",
                         as: "customerDoc"
                       }
                  
              },
              {
                  $unwind: '$customerDoc'
              },
              {
                  $unwind: '$items'
              },
              {
                  $lookup: {
                         from: "items",
                         localField: "items.itemId",
                         foreignField: "_id",
                         as: "itemDoc"
                       }
              },
              {
                  $unwind: '$itemDoc'
              },
             {
                 $group: {
                     _id: "$_id",
                     customerId:{
                         $last: "$customerId"
                     },
                     customerName:{
                         $last: "$customerDoc.name"
                     },
                     date:{
                         $last: "$date"
                     },
                     no:{
                         $last: "$no"
                     },
                     items:{
                         $addToSet: {
                             itemId:'$items.itemId',
                             itemName:'$itemDoc.name',
                             qty:'$items.qty',
                             price:'$itemDoc.price',
                             amount: {
                                $multiply: ["$items.qty","$itemDoc.price" ]
                             }
                         }
                     },
                     total:{
                         $sum: {
                              $multiply: ["$items.qty","$itemDoc.price" ]
                         }
                     }
                     
                 }
             }
              
          ]
          )

          return data
      }
    },
    findInvoice(){
      if(Meteor.isServer){
        let data=Invoice.aggregate(
          [
              {
                  $lookup: {
                         from: "customers",
                         localField: "customerId",
                         foreignField: "_id",
                         as: "customerDoc"
                       }
                  
              },
              {
                  $unwind: '$customerDoc'
              },
              {
                  $unwind: '$items'
              },
              {
                  $lookup: {
                         from: "items",
                         localField: "items.itemId",
                         foreignField: "_id",
                         as: "itemDoc"
                       }
              },
              {
                  $unwind: '$itemDoc'
              },
             {
                 $group: {
                     _id: "$_id",
                     customerId:{
                         $last: "$customerId"
                     },
                     customerName:{
                         $last: "$customerDoc.name"
                     },
                     date:{
                         $last: "$date"
                     },
                     no:{
                         $last: "$no"
                     },
                     items:{
                         $addToSet: {
                             itemId:'$items.itemId',
                             itemName:'$itemDoc.name',
                             qty:'$items.qty',
                             price:'$itemDoc.price',
                             amount: {
                                $multiply: ["$items.qty","$itemDoc.price" ]
                             }
                         }
                     },
                     total:{
                         $sum: {
                              $multiply: ["$items.qty","$itemDoc.price" ]
                         }
                     }
                     
                 }
             }
              
          ]
          )

          return data
      }
    },
    removeInvoice(id){
      return Invoice.remove({_id:id})
    },
    updateInvoice(doc){
      return Invoice.update({_id:doc._id},{$set:doc})
    }
  })