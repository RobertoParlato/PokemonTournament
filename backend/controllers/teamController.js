import mongoose from 'mongoose'; 
import team from '../models/team';

exports.getTeam = (req, res) => {
    team.findById(req.params.teamId, (err, team) => {
        if (err) {
            res.send(err);
        }

        res.json(team);
    });
};

exports.getAllTeams = (req, res) => {
    team.find({}, null, {sort: {createdAt: -1}}, (err, teams) => {
        if (err) {
            res.send(err);
        }

        res.json(teams);
        //UNCOMMENT FOR TEST CACHING OF LIST PAGE
        //setTimeout((function() {res.json(teams)}), 2000);
    });
}; 

exports.createTeam = (req, res) => {
    const newTeam = new team(req.body);

    newTeam.save((err, team) => {
        if (err) {
            res.send(err);
        }

        res.json(team);
    });
};

exports.updateTeam = (req, res) => {
    team.findOneAndUpdate({
        _id: req.params.teamId
    }, req.body,
        (err, team) => {
            if (err) {
                res.send(err);
            }

            res.json(team);
        });
};

exports.deleteTeam = (req, res) => {
    team.remove({
        _id: req.params.teamId
    }, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `team ${req.params.teamId} successfully deleted`
        });
    });
};