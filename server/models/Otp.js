import mongoose,{Schema,model} from 'mongoose'

const otpSchema= new Schema(
    {
       
        otp: {
            type: Number
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        },


    },{timestamps:true}
)

const Otp=model('otp',otpSchema)
export default Otp