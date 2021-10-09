'use strict'
const resepServices = require('../services/resepServices')

const getAll = async(req, res, next) =>{
	req.query.page = (req.query.page == undefined || isNaN(req.query.page))?1:req.query.page
	req.query.per_page = (req.query.per_page == undefined || isNaN(req.query.per_page))?20:req.query.per_page
	try {
		const response = await resepServices.getAll(req.query)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const deleteResep = async(req, res)=>{
	try {
		const response = await resepServices.deleteResep(req.params.id)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const updateResep = async(req,res,next) =>{
	return resepServices.update(req.params.id,req.body)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const createResep = async(req,res, next) =>{
	try {
		const response = await resepServices.create(req.body)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const getResep = async(req,res, next) =>{
	try {
		const response = await resepServices.numpangServis(req.params.id)
		return res.status(response.status).send(response.result)
	} catch (error) {
		console.error(error)
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

module.exports = {
	getAll,
	deleteResep,
	updateResep,
	createResep,
	getResep
}