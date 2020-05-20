import team from '../controllers/teamController';
import pokemon from '../controllers/pokemonController';

export default (app) => {
    app.route('/api/teams')
        .get(team.getAllTeams)
        .post(team.createTeam);

    app.route('/api/teams/:teamId')
        .get(team.getTeam)
        .put(team.updateTeam)
        .delete(team.deleteTeam);

    app.route('/api/pokemon/random')
        .get(pokemon.getRandomPokemon)
    
};