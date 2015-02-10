PlayerList = new Mongo.Collection('players')
if(Meteor.isClient) {
  Template.leaderboard.helpers({
    'player' : function() {
      return PlayerList.find({}, {sort:{score: -1, name: 1}})
    },
    'selectedClass' : function () {
        var playerId = this._id
        var selectedPlayer = Session.get('selectedPlayer')
        if (playerId == selectedPlayer) {
          return 'selected'
        }
    },
    'showSelectedPlayer': function() {
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayerList.findOne(selectedPlayer);
    }
  });

  Template.leaderboard.events({
    'click .player' : function() {
        var playerId = this._id
        Session.set('selectedPlayer', playerId)
        var selectedPlayer = Session.get('selectedPlayer')
        //console.log(selectedPlayer);
    },
    'click .increment': function() {
        selectedPlayer = Session.get('selectedPlayer');
        //console.log(selectedPlayer);
        PlayerList.update(selectedPlayer, {$inc: {score: 5}})
    },
    'click .decrement': function() {
        selectedPlayer = Session.get('selectedPlayer');
        //console.log(selectedPlayer);
        PlayerList.update(selectedPlayer, {$inc: {score:-5}})
    },
    'click .remove': function() {
        selectedPlayer = Session.get('selectedPlayer');
        //console.log(selectedPlayer);
        PlayerList.remove(selectedPlayer)
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event) {
        event.preventDefault()
        var playerName = event.target.playerName.value;
        console.log(playerName);
        PlayerList.insert({
            name: playerName,
            score: 0,
        })
    }
  })
}

if (Meteor.isServer) {
  console.log('Hello Server! -from console log');
}
