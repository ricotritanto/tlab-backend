'use strict'
const models = require('../models')
const sequelize = require('sequelize')
const {Op } = require('sequelize')

const createKategori = async(body)=>{
	return await models.kategori.create({
		name:body.name
	})
}

const findOne = async(body) =>{
	return await models.kategori.findOne({
		where: {name:body.name}
	})
}

const getByID = async(id) =>{
	return await models.kategori.findOne({
		where: {
			id,
			deleted_at : {
				[Op.eq]: null
			}
		}
	})
}

const deleteKategori = async(id)=>{
	return await models.kategori.update(
		{
			deleted_at: sequelize.fn('NOW')
		},{
			where:{id}
		}
	)
}

const updateById = async(id, body)=>{
	return await models.kategori.update({
		name:body.name
	}
	,{
		where:{id:id}
	})
}

const getAllKategori = async(data,limit =10, offset = 0)=>{
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
	return await models.kategori.findAndCountAll({ 
		where: condition,
		limit:parseInt(limit),
		offset: (offset <= 1) ? 0 : ((offset - 1) * parseFloat(limit)),
		// order:[['name', 'DESC']]
	 })
}


const kategoriQuery = async(id)=>{
	return await models.kategori.findOne({
		where: {
			id:id,
		},
		include : [{
			model: models.resep,
			as:"reseps"
		},
		{
			model: models.bahan,
			through:{attributes: []},
		}]
	})

}

// const numpangQuery = async()=>{
	
// 	return await models.kategori.findOne({
// 		where: {
// 			id:4,
// 		},
// 		include: {
// 			model: models.bahan,
// 			through:{attributes: []}
// 		}
// 	})
// }

module.exports = {
    createKategori,
	getAllKategori,
	findOne,
	deleteKategori,
	updateById,
	getByID,
	kategoriQuery
	// numpangQuery
}