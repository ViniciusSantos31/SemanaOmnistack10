const dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(request, response){
        //buscar todos devs num raio de 10km
        //filtrar por techs

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await dev.find({

            techs: {
                $in: techsArray,
            },

            location: {

                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });

    },
}