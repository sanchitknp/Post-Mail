import mongoose from "mongoose";
const mailSchema=mongoose.Schema(
    {
        subject:{
            type:String,
            required:true
        },
        cc:[contactSchema],
        content:{
            type:String,
            required:true
        }
    },{timestamps:true}
)
const contactSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }
)
const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      googleId: {
        type: String,
        required: true,
      },
      provider:{
          type:String,
      },
      contacts:[contactSchema],
      mailhistory:[mailSchema],
     
    },
    { timestamps: true }
  );
  const User = mongoose.model("User", userSchema);

export default User;

