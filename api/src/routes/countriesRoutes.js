const { Router } = require('express');
const { getAllCountriesFromDB, getCountryByName } = require('../controllers/countriesControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



router.get("/", async function(req, res){
    const {name} = req.query
    try {
        if(name){
            const nameCountries = await getCountryByName(name)
            if(nameCountries !== 0){
                res.status(200).send(nameCountries)
            }
            else{
                res.status(404).send('Pais no encontrado')
            }
        }
        else{
            const allCountries = await getAllCountriesFromDB()
            if(allCountries){
                res.status(200).send(allCountries)         
            }
            else{
                res.status(404).send('Paises no encontrados')
            }
        }
    } catch (error) {
        console.log('Error getCountries', error)
    }
});



module.exports = router