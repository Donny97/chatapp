var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var rooms = require("./data/rooms.json");

var router = express.Router();

module.exports = function (app) {

    app.get('/admin/rooms', function (req, res) {
        res.render("rooms", {
            title: "Admin Rooms",
            rooms: rooms
        });
    });

    app.get('/admin/rooms/add', function (req, res) {
        res.render("add", {title: "Add Rooms"});
    });

    app.post('/admin/rooms/add', function (req, res) {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room);

        res.redirect("/admin/rooms");
    });

    app.get('/admin/rooms/edit/:id', function (req, res) {
        var roomId = req.params.id;

        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.render("edit", {title: "Edit Rooms", room});
    });

    app.post('/admin/rooms/edit/:id', function (req, res) {
        var roomId = req.params.id;

        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }

        room.name = req.body.name;

        res.redirect("/admin/rooms");
    });

    app.get('/admin/rooms/delete/:id', function (req, res) {
        var roomId = req.params.id;

        rooms = rooms.filter(r => r.id !== roomId);

        res.redirect("/admin/rooms");
    });
}
