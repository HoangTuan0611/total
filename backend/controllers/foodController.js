import { log } from "console";
import foodModel from "../models/food-Model.js";
import fs  from 'fs'

// add food item


const addFood = async(req,res) => {
    const { name, description, price, category } = req.body
    let image_filename = `${req.file.filename}`;

    const product = new foodModel({
        name:name,
        description:description,
        price:price,
        category:category,
        image:image_filename
    })

    try {
        await product.save();
        res.json({success:true, statusCode: 200, message:"Product Added"})
    } catch (error) {
        res.json({success:false,statusCode: 400, message:"Product Add Failed"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
//remove food item 
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}