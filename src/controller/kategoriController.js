'use strict'
const kategoriServices = require('../services/kategoriServices')

const getAll = async(req, res, next) =>{
	req.query.page = (req.query.page == undefined || isNaN(req.query.page))?1:req.query.page
	req.query.per_page = (req.query.per_page == undefined || isNaN(req.query.per_page))?20:req.query.per_page
	try {
		const response = await kategoriServices.getAll(req.query)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const deleteKategori = async(req, res)=>{
	if(req.params.id == undefined || isNaN(req.params.id)){
		return res.status(400).send({
			message: 'invalid id'
		})
	}
	try {
		const response = await kategoriServices.deleteKategori(req.params.id)
		return res.status(response.status).send(response.result)
	} catch (error) {
		return res.status(500).send({
			message: 'internal server error'
		})
	}
}

const updateKategori = async(req,res,next) =>{
	if(req.params.id == undefined || isNaN(req.params.id)){
		return res.status(400).send({
			message: 'invalid id'
		})
	}
	try {
		const response = await kategoriServices.update(req.params.id,req.body)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const createKategori = async(req,res, next) =>{
	try {
		const response = await kategoriServices.create(req.body)
		return res.status(response.status).send(response.result)
	} catch (error) {
		res.status(500).send({
			message :'something when wrong'
		})
	}
}

const getByKategori = async(req,res, next) =>{
	try {
		const response = await kategoriServices.getKategori(req.params.id)
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
	deleteKategori,
	updateKategori,
	createKategori,
	getByKategori
}