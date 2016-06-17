// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7kiZUP7F_jtmtRpLnuQUUhABQwCvHvKg",
  authDomain: "project-6482078579936391228.firebaseapp.com",
  databaseURL: "https://project-6482078579936391228.firebaseio.com",
  storageBucket: "project-6482078579936391228.appspot.com",
};

firebase.initializeApp(config)

//returns list of keys for tracking
function getUsers() {
  //firebase.database.enableLogging(true);

  var userRef = firebase.database().ref("users").orderByKey();
  userRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // lists usernames but ignores if tracking is on or off
      var user = childSnapshot.key;
      createURL(user);
    });
  });
}

function createURL(user) {
  var token = user;
  //TODO: dynamically set dateAfter
  var dateAfter = "2016-06-16"; // "YYYY-MM-dd"
  var slackURL = "https://slack.com/api/search.messages?token=" + token + "&query=from:me%20after:" + dateAfter + "&pretty=1";

  //Submit request to Slack
  sendRequest(slackURL, user, dateAfter);
  console.log(slackURL);
  console.log("user: " + user);
}

function sendRequest(url, user, dateAfter) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();

  // state changes
  request.onreadystatechange = function() {
  	if(request.readyState === 4) { // done
  		if(request.status === 200) { // complete
        //parse data
        var messageCount = getCountFromSlack(request.responseText);

        //send to database if valid
        if (messageCount > -1) {
          insertData(user, dateAfter, messageCount);
        }
  		}
  	}
  };
}

//takes response text and parses for the count and returns the count
function getCountFromSlack(slackResponse) {
  var count = -1;
  //grab data and set messageCount
  var response = JSON.parse(slackResponse);

  if (response.ok === true) {
    var count = response.messages.pagination.total_count;
  }

  console.log("message count: " + count);
  return count;
}

//inserts data into database
function insertData(user, date, count) {
  // A post entry.
  var postData = {
    name: user,
    date: date,
    count: count
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('entires').push().key;

  var updates = {};
  updates['/entries/' + newPostKey] = postData;
  updateSuccess();

  return firebase.database().ref().update(updates);
}

function updateSuccess() {
  var d = new Date();
  document.getElementById("lastUpdate").innerHTML = "Last Updated: " + d;
}



getUsers();
