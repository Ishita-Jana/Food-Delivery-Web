const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://ishita:qwerty100@foodcluster.z7vg7hk.mongodb.net/foodFreaksData?retryWrites=true&w=majority'
const mongoDB = async()=>{
   await mongoose.connect(mongoURI,{ userNewUrlParser: true },async(err,result)=>{
    if(err){
    console.log("---",err);
        }
    else{
        console.log("connected succesfully");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){

            const foodCategory = await mongoose.connection.db.collection("food_category");
            foodCategory.find({}).toArray(function(err, catData){
                if (err) console.log(err);
                else
                    global.food_items = data;
                    global.food_Category = catData;
            })




            // if (err) console.log(err);
            // else {
            //     global.food_items = data;
            //     // console.log(global.food_items);
            //     console.log("hello");
            // }
            
        })
        // if((await data1).length > 0){
        //     printjson (data1[0]);
        // }  
            

        
    }
    });
}


module.exports = mongoDB;
