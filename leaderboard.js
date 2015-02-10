PlayerList = new Mongo.Collection('players')
console.log('Hello World! -from console log');
if(Meteor.isClient) {
  console.log('Hello Client! -from console log');
  Template.leaderboard.player = function() {
      return "Some Other Text from Leaderboared.player";
  }
}

if (Meteor.isServer) {
  console.log('Hello Server! -from console log');
}
