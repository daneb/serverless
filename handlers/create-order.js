'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid')

function createOrder(order) {
  if (!order || !order.pizza || !order.address)
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')

  return docClient.put({
    TableName: 'pizza-orders',
    Item: {
      orderId: uuid(),
      pizza: order.pizza,
      address: order.address,
      orderStatus: 'pending'
    }
  }).promise()
    .then(result => {
      console.log('Order is saved!', result)
      return result
    })
    .catch(saveError => {
      console.log(`Oops, order is not saved :(`, saveError)
      throw saveError
    })
}

module.exports = createOrder