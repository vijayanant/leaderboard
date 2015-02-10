PlayerList = new Mongo.Collection('players')
if(Meteor.isClient) {
  Meteor.subscribe('thePlayers')
  Template.leaderboard.helpers({
    'player' : function() {
        var currentUserId = Meteor.userId()
      return PlayerList.find({createdBy: currentUserId},
                             {sort:{score: -1, name: 1}})
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
        var yes = confirm('Are you sure')
        if (yes) {
          PlayerList.remove(selectedPlayer)
        }
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event) {
        event.preventDefault()
        var playerName = event.target.playerName.value;
        var currentUserId = Meteor.userId();
        PlayerList.insert({
            name: playerName,
            score: 0,
            createdBy: currentUserId
        })
        event.target.playerName.value = null
    }
  })
}

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function(){
    return PlayerList.find()});
  console.log(PlayerList.find().fetch());
}
