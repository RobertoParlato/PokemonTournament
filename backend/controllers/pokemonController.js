import team from '../models/team';
import axios from 'axios';

exports.getRandomPokemon = async (req, res) => {

    const max = 964;
    const min = 1;
    let randomNumber,url,finalResponse;

    //if the random pokemon haven't the sprite, take another one
    do{
        randomNumber = Math.floor(Math.random() * ((max + 1) - min)) + min;

        url = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${randomNumber - 1}&limit=1`)
        .then(res => res.data.results[0].url)
        .catch(err => console.log(err));

        finalResponse = await axios.get(url)
        .then(resp => resp.data)
        .catch(err => console.log(err));
    }while(finalResponse.sprites.front_default === null)

    let {id,abilities,base_experience,name,sprites,types} = finalResponse;
    types = types.map((x,i) => ({slot: x.slot, name: x.type.name}));
    abilities = abilities.map((x,i) => ({slot: x.slot, name: x.ability.name}));
    res.json({id,abilities,base_experience,name,sprite: sprites.front_default,types});
    
}; 