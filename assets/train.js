// console.log("hello?");


//do this when page loads

//why not, current time. 
function currentTime() {
    // console.log(time); this does work.
    time = moment().format("HH:mm:ss");
    $("#time").text(time);
}
//call function
clock = setInterval(currentTime, 1000);


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCekzYGz8Thy-WfImHi2N5HOxntgbH79do",
    authDomain: "train-schedule-1a47b.firebaseapp.com",
    databaseURL: "https://train-schedule-1a47b.firebaseio.com",
    projectId: "train-schedule-1a47b",
    storageBucket: "train-schedule-1a47b.appspot.com",
    messagingSenderId: "568706187414"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

//buttons for adding trains
//submit, addTrainBtn
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();
    //user input
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var addTrain = {
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    };

    database.ref().push(addTrain);
    //testing testing 
    

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});



//add train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    var sv = childSnapshot.val();

    var firstTimeConverted = moment(sv.firstTrainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % sv.frequency;
    var minsAway = sv.frequency - remainder;
    var nextArrival = moment().add(minsAway, "minutes");


    var newRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().name),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(nextArrival),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text(minsAway),

    );

    // Append the new row to the table
    $("tbody").append(newRow);
});