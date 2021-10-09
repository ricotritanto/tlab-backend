'use strict'
const models = require('../models')
const sequelize = require('sequelize')
const {Op, where } = require('sequelize')
const resep = require('../models/resep')

const createResep = async(body)=>{
	return await models.resep.create({
        name:body.name,
        deskripsi:body.deskripsi,
        id_kategori:body.id_kategori
	})
}

const findOne = async(body) =>{
	return await models.resep.findOne({
		where: {name:body.name}
	})
}

const getByID = async(id) =>{
	return await models.resep.findOne({
		where: {
			id,
			deleted_at : {
				[Op.eq]: null
			}
		}
	})
}

const deleteResep = async(id)=>{
	return await models.resep.update(
		{
			deleted_at: sequelize.fn('NOW')
		},{
			where:{id}
		}
	)
}

const updateById = async(id, body)=>{
	return await models.resep.update({
		name:body.name,
        deskripsi:body.deskripsi,
        id_kategori:body.id_kategori
	}
	,{
		where:{id:id}
	})
}

const getAllResep = async(data,limit =10, offset = 0)=>{
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
	return await models.resep.findAndCountAll({ 
		where: condition,
		limit:parseInt(limit),
        offset: (offset <= 1) ? 0 : ((offset - 1) * parseFloat(limit)),
        include: {
			model: models.kategori,
            as:'kategori',
            include:{
                model: models.bahan
            }
        }
		// order:[['name', 'DESC']]
     })
}

const resepQuery = async(id)=>{
	
	return await models.resep.findOne({
		where: {
			id:id
		},
		include: {
			model: models.kategori,
            as:'kategori',
            // through:{attributes: []}
            include:{
                model: models.bahan,
                // as:'kategori',
                // through:{attributes: [kategori_bahan]}
            }
        }
    })
}

module.exports = {
    createResep,
	getAllResep,
	findOne,
	deleteResep,
	updateById,
	getByID,
	resepQuery
}