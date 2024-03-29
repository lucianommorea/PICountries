const axios = require('axios');
const {Country, Activity} = require('../db');
const {Op} = require('sequelize')

async function getAllCountries(){

    let countriesDB = await Country.findAll({
        include: [Activity]
    })

    try{

        if(countriesDB.length === 0) {

            let countries = (await axios('https://restcountries.com/v3.1/all')).data.map(country=> ({
                id: country.cca3,
                name: country.name.common,
                img: country.flags.png,
                continents: country.continents[0],
                capital: country.capital ? country.capital[0] : 'Undefined Capital',
                subregion: country.subregion ? country.subregion : 'Undefine Subregion',
                area: country.area,
                population: country.population,
                maps: country.maps.googleMaps
            }))

        
        countries.forEach(country =>{
            Country.findOrCreate({
                where: {id:country.id},
                defaults:{
                    id:country.id,
                    name:country.name,
                    img: country.img,
                    continents: country.continents,
                    capital: country.capital,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population,
                    maps: country.maps
                }
            })
        })
        countriesDB = await Country.findAll({
            include: [Activity]
        })
        };
        return countriesDB
    }
    
    catch (error){
        console.log('Error in getAllCountries', error)
    }
}

// async function getAllCountriesFromDB() {
//     try{
//         let countriesDB = await Country.findAll({
//             include: [Activity]
//         })
//         return countriesDB
//     }
//     catch(error) {
//        console.log('Error in getAllCountriesFromDB', error)
//     }
// }

async function getCountryByName(name) {
    try {
        const countryName = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        }) 
        return countryName
    } catch (error) {
        console.log('error in getCountryByName', error)
    }
}

module.exports = {
    getAllCountries,
    // getAllCountriesFromDB,
    getCountryByName
}