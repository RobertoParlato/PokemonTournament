# PokemonTournament

Commands for build the project:
- docker-compose up

Backend API:
GET /api/teams <-- will return all teams created
POST /api/teams <-- will create a new team
GET /api/teams/{id} <-- will return the team selected by id
PUT /api/teams/{id} <-- will update team info
DELETE /api/teams/{id} <-- will delete team by id
GET /api/pokemon/random <-- will return a random pokemon

Nginx will serve at http://localhost so at port 80.
