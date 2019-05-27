import { Mongo } from 'meteor/mongo'
const Invoice = new Mongo.Collection('invoices')
export default Invoice
