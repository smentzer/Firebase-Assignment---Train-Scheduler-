// console.log("hello?");


//do this when page loads
$(document).ready(function () {
    //why not, current time. 
    function currentTime() {
        // console.log(time); this does work.
        time = moment().format("HH:mm:ss");
        $("#time").text(time);
    }
    //call function
    clock = setInterval(currentTime, 1000);
});

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
        var name = $("#trainName-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        var nextArrival = $("#nextArrival-input").val().trim();

        var addTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            nextArrival: nextArrival,
        };
        
        database.ref().push(newTrain);
        //testing testing 
        console.log(addTrain.name);
        console.log(addTrain.role);
        console.log(addTrain.start);
        console.log(addTrain.rate);

        // Clears all of the text-boxes
        $("#trainName-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
    });
    // database.ref().on("value", function(snapshot) {

    // },





    //create firebase event
    //train data to database
    //clear boxes

    //firebase to html
    // Change the HTML to reflect
    // $("#name-input").text(snapshot.val().trainName);
    // $("#destination-input").text(snapshot.val().destination);
    // $("#start-input").text(snapshot.val().  );
    // $("#frequency-input").text(snapshot.val().frequencyt);
