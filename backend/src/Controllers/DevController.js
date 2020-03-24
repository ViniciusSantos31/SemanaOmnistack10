const axios = require('axios');
const dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, destroy

module.exports = {

    async index(request, response) {

        const Devs = await dev.find();

        return response.json(Devs);

    },


    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let Dev = await dev.findOne({ github_username });

        if (!Dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { avatar_url, bio} = apiResponse.data;

            let name = apiResponse.data.name;

            if(name == null) {
                name = github_username;
            }

            console.log(name, avatar_url, bio);

            const techsArray = parseStringAsArray(techs);
        
            const location = {
        
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            Dev = await dev.create({
        
                name,
                github_username,
                bio,
                avatar_url,
                techs : techsArray,
                location,
        
            });

        }
        return response.json(Dev);
    },

};