// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friends = require("../data/friends.js");

var surveyData = require("../data/surveyData");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends",function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        var totalDifference = 0;

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            for (var j = 0; j < friends[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) = parseInt(friends[i].scores[j]))

                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        friends.push(userData);
        res.json(bestMatch);
    });
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/survey", function(req, res) {
        res.json(surveyData);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate Javascript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/survey", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        if (surveyData.length < 5) {
            tableData.push(req.body);
            res.json(true);
        }

    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    /*app.post("/api/clear", function() {
        // Empty out the arrays of data
        tableData = [];
        waitListData = [];

        console.log(tableData);
    });*/
};
