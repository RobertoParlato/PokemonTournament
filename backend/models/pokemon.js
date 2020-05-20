import mongoose, {
    Schema
} from 'mongoose';

/**
 * Create database scheme for pokemon
 */
const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    abilities: [{
        name: {
            type: String,
            required: true
        },
        slot: {
            type: Number,
            required: true
        }
    }],
    base_experience: {
        type: Number,
        required: true
    },
    sprite: {
        type: String
    },
    types: [{
        slot: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }]
});

export default PokemonSchema;