const mongoose=require('mongoose');
const mongooseURI="mongodb+srv://Haider:Haider3014@cluster0.tsl74fv.mongodb.net/test"

const connecttomongo=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log('connected to Database')
    })
}
module.exports=connecttomongo