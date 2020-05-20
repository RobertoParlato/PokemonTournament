import mongoose, {
    Schema
} from 'mongoose';
import PokemonSchema from './pokemon';

/**
 * Create database scheme for notes
 */
const TeamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pokemon: [ PokemonSchema ]
},{
    timestamps: true
});

export default mongoose.model('Team', TeamSchema);