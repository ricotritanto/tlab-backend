'use strict'
const bahanController = require('../controller/bahanController')
const kategoriController = require('../controller/kategoriController')
const resepController = require('../controller/resepController')

module.exports = app =>{
	app.get('/api/health', (req, res) => {
		res.status(200).send({
			message: 'api is up and running',
		})
	})


	// api bahan
	app.get('/api/bahan', bahanController.getAll)  // endpoint get All data bahan
	app.delete('/api/bahan/:id', bahanController.deleteBahan)  // endpoint delete data by id
	app.put('/api/bahan/:id', bahanController.updateBahan)  // endpoint update data by id 
	app.post('/api/bahan/', bahanController.createBahan)  // endpoint create bahan
	app.get('/api/bahan/:id', bahanController.getByBahan)  // endpoint get data bahan by id include kategori dan resep

    // api kategori
	app.get('/api/kategori', kategoriController.getAll)  // endpoint get All data kategori
	app.delete('/api/kategori/:id', kategoriController.deleteKategori)  // endpoint delete data by id
	app.put('/api/kategori/:id', kategoriController.updateKategori) // endpoint update data by id 
	app.post('/api/kategori/', kategoriController.createKategori) // endpoint create kategori
	app.get('/api/kategori/:id', kategoriController.getByKategori)  // endpoint get data kategori by id include bahan dan resep



    // api resep
	app.get('/api/resep', resepController.getAll)   // endpoint get All data kategori
	app.delete('/api/resep/:id', resepController.deleteResep)   // endpoint delete data by id
	app.put('/api/resep/:id', resepController.updateResep) // endpoint update data by id 
	app.post('/api/resep/', resepController.createResep) // endpoint create kategori

	app.get('/api/resep/:id', resepController.getResep)  // endpoint get data resep by id include kategori dan bahan
}
