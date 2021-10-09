'use strict'
const bahanRepo = require('../repository/bahanRepository')

const create = async(body)=>{
	const checkIsExistCode = await bahanRepo.findOne(body)
	if(checkIsExistCode)
		return {
			status:400,
			result:{
				message: body.name+' is already exist'
			}
		}
	const result = await bahanRepo.createBahan(body)
	return {
		status: 201,
		result:{
			message: 'successfully',
			data:result
		}
	}
}

const update = async(id, body)=>{
	const checkIsExistCode = await bahanRepo.findOne(body)
	const checkIsExistid = await bahanRepo.getByID(id)
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
			result: {
				message: body.name+' is already exist'}
			}
	}else{

		await bahanRepo.updateById(id, body)
		return {
			status:201,
			result: {
				message: 'success updating data'
			} 
		}
	}
}

const getAll = async(data) =>{
	const bahan = await bahanRepo.getAllBahan(data,data.per_page,data.page)
	const result = {
		result: {
			count: bahan.count,
			page:parseFloat(data.page),
			per_page: parseFloat(data.per_page),
		},
		data: bahan.rows,
		message:'success'
	}
	return {
		status: 200,
		result
	}
}

const deleteBahan = async (id) => {
	
	const checkIsExistCode = await bahanRepo.getByID(id)
	if(checkIsExistCode == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
	}
	await bahanRepo.deleteBahan(id)
	return {
		status:201,
		result: {
			message: 'success delete data'
		} 
	}

}

const getBahan = async (id) => {	
	const checkIsExistCode = await bahanRepo.getByID(id)
	if(checkIsExistCode == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
	}
	const hasil = await bahanRepo.bahanQuery(id)
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
	deleteBahan,
	getBahan
}