PlayerList = new Mongo.Collection('players')
console.log('Hello World! -from console log');
if(Meteor.isClient) {
  console.log('Hello Client! -from console log');
  Template.leaderboard.helpers({
    'player' : function() {
      return PlayerList.find()
    }
  });

  Template.leaderboard.events({
      'click .player' : function() {
          console.log('click happened');
      }
  })
}

if (Meteor.isServer) {
  console.log('Hello Server! -from console log');
}
