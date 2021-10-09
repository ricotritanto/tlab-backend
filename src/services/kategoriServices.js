'use strict'
const kategoriRepo = require('../repository/kategoriRepository')

const create = async(body)=>{
	const checkIsExistCode = await kategoriRepo.findOne(body)
	if(checkIsExistCode)
		return {
			status:400,
			result:{
				message: body.name+' is already exist'
			}
		}
	const result = await kategoriRepo.createKategori(body)
	return {
		status: 201,
		result:{
			message: 'successfully',
			data:result
		}
	}
}

const update = async(id, body)=>{
	const checkIsExistCode = await kategoriRepo.findOne(body)
	const checkIsExistid = await kategoriRepo.getByID(id)
	if(checkIsExistid == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
	}
	else if(checkIsExistCode)
	{
		return {
			status:400,
			result:{
				message: body.name+' is already exist'
			}
		}
	}else{
		await kategoriRepo.updateById(id, body)
		return {
			status:201,
			result:{
				message: 'success updating data'
			}
		}
		
	}
}

const getAll = async(data) =>{
	
	const kategori = await kategoriRepo.getAllKategori(data,data.per_page,data.page)
	const result = {
		result : {
			count: kategori.count,
			page:parseFloat(data.page),
			per_page: parseFloat(data.per_page),
		},
		data: kategori.rows,
		message:'success'
	}
	return {
		status: 200,
		result
	}
}

const deleteKategori = async (id) => {	
	const checkIsExistCode = await kategoriRepo.getByID(id)
	if(checkIsExistCode == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
	}
	await kategoriRepo.deleteKategori(id)
	return {
		status:201,
		result: {
			message: 'success delete data'
		} 
	}

}
const getKategori = async (id) => {	
	const checkIsExistCode = await kategoriRepo.getByID(id)
	if(checkIsExistCode == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
	}
	const hasil = await kategoriRepo.kategoriQuery(id)
	console.log(JSON.stringify(hasil))
	return {
		status:200,
		result: {
			data: hasil,
			message: 'successfully'
		} 
	}

}

module.exports = {
	create,
	update,
	getAll,
	deleteKategori,
	getKategori
}