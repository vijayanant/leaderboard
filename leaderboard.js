PlayerList = new Mongo.Collection('players')
console.log('Hello World! -from console log');
if(Meteor.isClient) {
  console.log('Hello Client! -from console log');
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
      }
  })
}

if (Meteor.isServer) {
  console.log('Hello Server! -from console log');
}
