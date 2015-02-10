PlayerList = new Mongo.Collection('players')
console.log('Hello World! -from console log');
if(Meteor.isClient) {
  console.log('Hello Client! -from console log');
  Template.leaderboard.helpers({
    'player' : function() {
      return PlayerList.find()
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
          console.log(selectedPlayer);
      }
  })
}

if (Meteor.isServer) {
  console.log('Hello Server! -from console log');
}
