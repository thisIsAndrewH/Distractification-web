// TODO: Replace with your project's customized code snippet

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7kiZUP7F_jtmtRpLnuQUUhABQwCvHvKg",
  authDomain: "project-6482078579936391228.firebaseapp.com",
  databaseURL: "https://project-6482078579936391228.firebaseio.com",
  storageBucket: "project-6482078579936391228.appspot.com",
};

firebase.initializeApp(config)

//returns list of keys for tracking
function readUsers() {
  //firebase.database.enableLogging(true);
  var users = [];

  var userRef = firebase.database().ref("users").orderByKey();
  userRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // lists usernames but ignores if tracking is on or off
      var key = childSnapshot.key;
      users.push(key);
      console.log("this is a user: "+key)
    });

  });


//TODO: RESOLVE WHY THIS ARRAY ISN'T POPULATING OUTSIDE OF THE ABOVE FUCNTION
  console.log("the array: " + users);
  return users
}

function pollData() {
  var users = readUsers();
  console.log("users ready for polling: " + users);

  //for each user query slack to get the count then take count and insert into database



  var a = ["a", "b", "c"];
users.forEach(function(entry) {
    console.log(entry);
});

  querySlack("");
  insertData("","","");

}

function querySlack(user) {

}

//inserts data into database
function insertData(user, date, count) {

}

pollData();
