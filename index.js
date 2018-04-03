$(document).ready(function(){
    

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDAE2Gfpc1qeJHNZ1MnmQ5hGZaQ_5tvUOk",
    authDomain: "planes-project.firebaseapp.com",
    databaseURL: "https://planes-project.firebaseio.com",
    projectId: "planes-project",
    storageBucket: "",
    messagingSenderId: "929244452211"
};
firebase.initializeApp(config);

//Set the firebase to a variable 
let database = firebase.database();


//Create the variables for the plane 
let planeName = "";
let destination= "";
let frequency= 0;
let nextArrival= "";
let minutesAway= "";

let currentTime = moment().subtract(1, "years").format('HH:mm');


//Create a click event 
$('#submit-btn').on("click", function (){
    event.preventDefault();


    
    //Grab the variables from the input

    let planeName = $('#plane-name-input').val().trim();
    let destination= $('#destination-input').val().trim();
    let frequency= $('#frequency-input').val().trim();
    let nextArrival= $("#time-input").val().trim(); //3AM

    //Calculations 
    let time = moment();
    let timeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(timeConverted.format());
    let diffTime = time.diff(timeConverted, "minutes");
    let diffTime1 = moment().diff(timeConverted, "minutes");
    console.log(diffTime);
    console.log(diffTime1);

    let tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // next plane arrival in minutes
    minutesAway = frequency - tRemainder;
    console.log(minutesAway);

    //Create object for the variables to simplify

    const pushObject = {
        planeName: planeName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
    }



    // next train arrival in HH:mm format
    console.log(time.format("HH:mm A"))
    console.log(moment().format("HH:mm A"))
    nextArrival = moment().add(minutesAway, "minutes").format("HH:mm A");
    console.log(nextArrival);
    
    //Send to firebase 

    database.ref().push(pushObject);

    //Alert 

    alert('Plane successfully logged');

    //Now we want to clear these fields 

    $('#plane-name-input').val('')
    $('#destination-input').val('')
    $('#frequency-input').val('')
    $('#time-input').val('')
});

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    let sv = snapshot.val();
    let tr = "<tr><td>" + sv.planeName + "</td><td>" + sv.destination + "</td><td>" +
    sv.frequency + "</td><td>" + sv.nextArrival + "</td><td>" + sv.minutesAway + "</td></tr>"
  

    $('.tbody').append(tr);
    });



});