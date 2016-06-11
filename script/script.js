var myFirebaseRef = new Firebase("https://traintimeapp.firebaseio.com/");


var trainName;
var destination;
var firstTime;
var frequency;
var startTime;
var endTime;
var now;
var totalMinutes;
var minutesRemaining;
var nextTrainTime;

function date_time() {
    let currentTime = moment().format("HH:mm");
    //  push new time to Firebase
  //  myFirebaseRef.update(currentTime);
 // myFirebaseRef.ref('currentTime').set({
 //   currentTime: currentTime
 // });


    setTimeout(function() { date_time(); }, 1000);
}


$("#addEmployeeBtn").on("click", function() {

    // Grabs user input
    let trainName = $("#trainNameInput").val().trim();
    let destination = $("#destinationInput").val().trim();
    let firstTime = moment($("#firstTimeInput").val().trim(), "HHmm").format("HH:mm");
    let frequency = $("#frequencyInput").val().trim();
	let currentTime = moment().format("HH:mm");

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        currentTime: currentTime
    }

    //  push new train to Firebase
    myFirebaseRef.push(newTrain);

    // Logs everything to console
    console.log(newTrain);
    //icon-train
    // Alert
    alert("New train added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTimeInput").val("");
    $("#frequencyInput").val("");

    return false;
});


// Get snapshot data
myFirebaseRef.on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());


    trainName 	= childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    firstTime 	= childSnapshot.val().firstTime;
    frequency 	= childSnapshot.val().frequency;
    startTime 	= moment(firstTime, "HH:mm").format("HH:mm");
    endTime 	= moment().format("HH:mm");
    now 		= moment(new Date()); //todays date

    totalMinutes 		= (moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm")))/60000 ;
    minutesRemaining 	= (totalMinutes / frequency);
    minutesRemaining    = 60 * (minutesRemaining % 1);
    minutesRemaining    = Math.round(60 - minutesRemaining);
    nextTrainTime 		= now.add(minutesRemaining, 'minutes').format("HH:mm");

    console.log("Modulus " + minutesRemaining);
    console.log("Duration " + totalMinutes);
    console.log("Current time " + nextTrainTime);
    console.log("Start time " + startTime);



    $("#trainTable > tbody").append("<tr><td>" + "<i class='fa fa-train' style='font-size:24px margin-right: 5px'></i>" + "    " + trainName + "</td><td>" + destination + "</td><td>" + firstTime + "</td><td>" + frequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesRemaining + "</td></tr>");
date_time();

});



