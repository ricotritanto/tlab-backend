'use strict'
const resepRepo = require('../repository/resepRepository')
const kategori_bahanRepo = require('../repository/kategoribahanRepository')

const create = async(body)=>{
	const checkIsExistCode = await resepRepo.findOne(body)
	if(checkIsExistCode)
		return {
			status:400,
			result:{
				message: body.name+' is already exist'
			}
		}
    const result = await resepRepo.createResep(body)
    const kategori_bahan = await kategori_bahanRepo.createKategoribahan(body)
	return {
		status: 201,
		result:{
			message: 'successfully',
			data:result
		}
	}
}

const update = async(id, body)=>{
	const checkIsExistCode = await resepRepo.findOne(body)
	const checkIsExistid = await resepRepo.getByID(id)
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
		await resepRepo.updateById(id, body)
		return {
			status:201,
			result:{
				message: 'success updating data'
			}
		}
		
	}
}

const getAll = async(data) =>{
    const resep = await resepRepo.getAllResep(data,data.per_page,data.page)    
	const result = {
		result : {
			count: resep.count,
			page:parseFloat(data.page),
			per_page: parseFloat(data.per_page),
		},
		data: resep.rows,
		message:'success'
    }
	return {
		status: 200,
		result
	}
}

const deleteResep = async (id) => {
	const checkIsExistCode = await resepRepo.getByID(id)
	if(checkIsExistCode == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
	}
	await resepRepo.deleteResep(id)
	return {
		status:201,
		result: {
			message: 'success delete data'
		} 
	}

}

const numpangServis = async (id) => {	
    const checkIsExistCode = await resepRepo.getByID(id)
    if(checkIsExistCode == null)
	{
		return {
			status:400,
			result:{
				message: 'data not found'
			}
		}
    }    
    const hasil = await resepRepo.resepQuery(id)    
    // console.log(JSON.stringify(hasil))
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
	deleteResep,
	numpangServis
}