
var db = require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID;
const { ObjectID } = require('bson');
const { response } = require('express');


module.exports={

    addProduct:(product,callback)=>{
        console.log(product);

        product.Price=parseInt(product.Price)



        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.ops[0]._id)
        })

    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:ObjectID(proId)}).then((response)=>{
                // console.log(response);
                resolve(response)

            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{

        proDetails.Price=parseInt(proDetails.Price)


        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
             
            }).then((response)=>{
                resolve()
            })
        
        })
    }
}