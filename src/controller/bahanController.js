'use strict'
const bahanServices = require('../services/bahanServices')

const getAll = async(req, res, next) =>{
	req.query.page = (req.query.page == undefined || isNaN(req.query.page))?1:req.query.page
	req.query.per_page = (req.query.per_page == undefined || isNaN(req.query.per_page))?20:req.query.per_page
	try {
		const response = await bahanServices.getAll(req.query)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const deleteBahan = async(req, res)=>{
	if(req.params.id == undefined || isNaN(req.params.id)){
		return res.status(400).send({
			message: 'invalid id'
		})
	}
	try {
		const response = await bahanServices.deleteBahan(req.params.id)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const updateBahan = async(req,res,next) =>{
	if(req.params.id == undefined || isNaN(req.params.id)){
		return res.status(400).send({
			message: 'invalid id'
		})
	}
	try {
		const response = await bahanServices.update(req.params.id,req.body)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const createBahan = async(req,res, next) =>{
	try {
		const response = await bahanServices.create(req.body)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const getByBahan = async(req,res, next) =>{
	try {
		const response = await bahanServices.getBahan(req.params.id)
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
	deleteBahan,
	updateBahan,
	createBahan,
	getByBahan
}