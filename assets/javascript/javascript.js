// 1. Use form to add train schedule
// 2. Train schedule intervals (last arrival + frequency)
// 3. interval updates
// 4. Pull from firebase

var config = {
    //api key
    apiKey: "AIzaSyAbRbiP02AIlIqtd1dt_o4oVqIEZQ_649Q",
    //authorize domain
    authDomain: "train-a27f0.firebaseapp.com",
    //Database URL
    databaseURL: "https://train-a27f0.firebaseio.com",
    storageBucket: "train-a27f0.appspot.com"
  };

firebase.initializeApp(config);

var database = firebase.database();
  
$("#submit-schedule").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTime = moment($("#trainTimeInput").val().trim(), "hh:mm A").format("hh:mm A");
    var frequency = $("#frequncyInput").val().trim();
    
    var newTrain = {
        name: trainName,
        stop: destination,
        time: trainTime,
        freq: frequency
    };
    
    database.ref().push(newTrain);
    
    alert("Train Successfully Added");
    
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequncyInput").val("");

});
  
// database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());
  
//     var trainName = childSnapshot.val().name;
//     var destination = childSnapshot.val().stop;
//     var trainTime = childSnapshot.val().time;
//     var firstTimeConverted = moment(trainTime, "hh:mm A").subtract(1, "years");
//     var frequency = childSnapshot.val().freq;
//     // current time
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     var tRemainder = diffTime % frequency;
//     var MinutesTillTrain = frequency - tRemainder;
//     var nextTrain = moment().add(MinutesTillTrain, "minutes");
//     var nextTrainFormatted = moment(nextTrain, "hh:mm A").format("hh:mm A")

//     $("<td>").val("")

//     var newRow = $("<tr>").append(
//       $("<td>").text(trainName),
//       $("<td>").text(destination),
//       $("<td>").text(frequency),
//       $("<td>").text(nextTrainFormatted),
//       $("<td>").text(MinutesTillTrain)
//     );

//     $("#train-schedule > tbody").append(newRow);
// });

function refresh () {

    setInterval(function(){ 

        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());
          
            var trainName = childSnapshot.val().name;
            var destination = childSnapshot.val().stop;
            var trainTime = childSnapshot.val().time;
            var firstTimeConverted = moment(trainTime, "hh:mm A").subtract(1, "years");
            var frequency = childSnapshot.val().freq;
            // current time
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var tRemainder = diffTime % frequency;
            var MinutesTillTrain = frequency - tRemainder;
            var nextTrain = moment().add(MinutesTillTrain, "minutes");
            var nextTrainFormatted = moment(nextTrain, "hh:mm A").format("hh:mm A")
        
            var newRow = $("<tr>").append(
              $("<td>").text(trainName),
              $("<td>").text(destination),
              $("<td>").text(frequency),
              $("<td>").text(nextTrainFormatted),
              $("<td>").text(MinutesTillTrain)
            );
        
            $("#train-schedule > tbody").append(newRow);
        });
    }, 3000)
}
refresh()
