import express from 'express';
const app = express();
import cors from "cors";
import  router  from "./modules/index.js";
import mongoose from "mongoose";
const PORT =  3000;
app.use(express.json());
app.use(cors());
app.use("/",router);

app.get('/ping', (req,res)=>{
    res.send({
        "msg":"working"
    })
});

app.listen(PORT, () => 
mongoose.set("useFindAndModify", false),
mongoose
  .connect(`mongodb+srv://sachin:28021998@cluster0.srpbo.mongodb.net/myExpance?retryWrites=true&w=majority`)
  .then(() => {
    return console.log("connected to db")
  }

  ).catch(error => {
    throw error
  }),

console.log(`Server running on port ${PORT}`));