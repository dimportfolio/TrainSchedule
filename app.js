// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyD-_Z9oETg85hAZOAKH0xiBQebPZWlcqj0",
    authDomain: "trainassignment-b5ce7.firebaseapp.com",
    databaseURL: "https://trainassignment-b5ce7.firebaseio.com",
    projectId: "trainassignment-b5ce7",
    storageBucket: "trainassignment-b5ce7.appspot.com",
    messagingSenderId: "996910962737"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#addTrain").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    console.log(firstTrainTime);
    var frequency = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequency);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrainConverted),
      $("<td>").text(tMinutesTillTrain)

    //   $("<td>").text(empRate),
    //   $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  