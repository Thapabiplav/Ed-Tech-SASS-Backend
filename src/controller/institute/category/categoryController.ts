import {  Response } from "express";
import { IExtendedRequest } from "../../../types/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import { CreatedAt } from "sequelize-typescript";

class CategoryController{
static async createCategory(req:IExtendedRequest,res:Response){
  const instituteNumber = req.user?.currentInstituteNumber
 const{categoryName,categoryDescription} = req.body
 if(!categoryName|| !categoryDescription){
  res.status(400).json({
    message:"please provide the categoryName and categoryDescription"
  })
  return
 }
 await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES (?,?)`,{
  type:QueryTypes.INSERT,
  replacements:[categoryName,categoryDescription]
 })
const [categoryData] :{id:string, createdAt: Date} [] = await sequelize.query(`SELECT id,createdAt from category_${instituteNumber} WHERE categoryName = ?`,{
  replacements:[categoryName],
  type:QueryTypes.SELECT
 }) 
 res.status(201).json({
  message:'category added successfully',
  data:{
    categoryName,
    categoryDescription,
    id:categoryData.id,
    CreatedAt:categoryData.createdAt
  }
 })
 return
}

static async getCategories(req:IExtendedRequest, res:Response){
  const instituteNumber = req.user?.currentInstituteNumber
  const categories =await sequelize.query(`SELECT * FROM category_${instituteNumber}`,{
    type:QueryTypes.SELECT
  })
  res.status(200).json({
    message:'categories fetched successfully',
    data:categories
  })
  return
}

static async deleteCategory (req:IExtendedRequest,res:Response){
  const instituteNumber= req.user?.currentInstituteNumber
  const id = req.params.id
  await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id=?`,{
    type:QueryTypes.DELETE,
    replacements:[id]
  })
  res.status(200).json({
    message:'category deleted successfully'
  })
  return
}

}

export default CategoryController