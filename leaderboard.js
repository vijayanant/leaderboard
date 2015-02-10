PlayerList = new Mongo.Collection('players')
console.log('Hello World! -from console log');
if(Meteor.isClient) {
  console.log('Hello Client! -from console log');
  Template.leaderboard.helpers({
    'player' : function() {
      return "Some Other Text from Leaderboared.helpers.player";
    },
    'manager' : "An inspirational quote from Team Manager"
  });
}

if (Meteor.isServer) {
  console.log('Hello Server! -from console log');
}
