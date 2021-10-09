'use strict'
const models = require('../models')
const {Op } = require('sequelize')
const sequelize = require('sequelize')

const createBahan = async(body)=>{
	return await models.bahan.create({
		name:body.name
	})
}

const findOne = async(body) =>{
	return await models.bahan.findOne({
		where: {name:body.name}
	})
}

const getByID = async(id) =>{
	return await models.bahan.findOne({
		where: {
			id,
			deleted_at : {
				[Op.eq]: null
			}
		}
	})
}

const deleteBahan = async(id)=>{
	return await models.bahan.update(
		{
			deleted_at: sequelize.fn('NOW')
		},{
			where:{id}
		}
	)
}

const updateById = async(id, body)=>{
	return await models.bahan.update({
		name:body.name
	}
	,{
		where:{id:id}
	})
}

const getAllBahan = async(data,limit =10, offset = 0)=>{
	const { name } = data
	var condition = {}
	if (name != undefined){
		condition.name = { 
			[Op.like]: `%${name}%` 
		}
	}
	condition.deleted_at = {
		[Op.eq]: null
	}
	return await models.bahan.findAndCountAll({ 
		where: condition,
		limit:parseInt(limit),
		offset: (offset <= 1) ? 0 : ((offset - 1) * parseFloat(limit)),
		// order:[['name', 'DESC']]
	 })
}


const bahanQuery = async(id)=>{
	return await models.bahan.findOne({
		where: {
			id:id,
		},
		include : {
			model: models.kategori,
			through:{attributes: []},
			include :{	
				model: models.resep,
				as:"reseps"
			}
		}
	})

}

module.exports = {
    createBahan,
	getAllBahan,
	findOne,
	deleteBahan,
	updateById,
	getByID,
	bahanQuery
}