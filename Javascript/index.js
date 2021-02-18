/*
Rob
*/
// The webpage relies on a lot of animations to run smoothly
// We force the user to the top of the page to ensure this consistency
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var phoneMoved = false
function movePhoneAtBottom() {
  if (!phoneMoved){
    $("#aboutPhone").fadeOut(500);
    $("#bottomPhone").fadeIn(700);
    phoneMoved = true
  }
};

function phoneAtTopAppear(){
  $("#topPhone").fadeIn(300);
}

function phoneAtTopVanish(){
  $("#topPhone").fadeOut(300);
  $("#arrow_text").fadeOut(300);
  $("#arrow").fadeOut(300);
}

function resetMovePhoneAtBottom(){
  $("#aboutPhone").fadeIn(500);
  $("#bottomPhone").fadeOut(300);
  phoneMoved = false;
}

var mapProp= {
    center:new google.maps.LatLng(53.350140, -6.266155),
    zoom: 7,
};

// Initialize map and zoom in to dublin
// request for user location and start clouds
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), mapProp);
    // Request user to get co-ords
    getCoordinates()
    myMove()
}

// Used for animation on clouds on about page
function initMapAbout() {
  var cloudOne = document.getElementById("cloudOne");
  var cloudTwo = document.getElementById("cloudTwo");  
  var cloudThree = document.getElementById("cloudThree");  
  var cloudFour = document.getElementById("cloudFour");
  var cloudFive = document.getElementById("cloudFive");  
  var left = 0;
  var left = setInterval(frameLeft, 100);
  function frameLeft() {
    if (left == 350) {
      clearInterval(left);
    } else {
      left++; 
      cloudOne.style.left = left + 'px'; 
      cloudTwo.style.left = left + 'px'; 
      cloudThree.style.left = left + 'px'; 
      cloudFour.style.left = left * 2 + 'px';
      cloudFive.style.left = left + 'px';
    }
  }
}

// If the user gives their permission to get current location
// Retrieve it and zoom in
// Else throw an error
function getCoordinates() {
    navigator.geolocation.getCurrentPosition(function(location) {
    map.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude));
    map.setZoom(15);
  },
  function(error) {
    console.log("Location permission denied");
  });
}

// Used for animating the clouds
function myMove() {
    var elem1 = document.getElementById("background_cloud1"); 
    var elem2 = document.getElementById("background_cloud2");
    var elem3 = document.getElementById("background_cloud3");  
    var elem4 = document.getElementById("runner_gif");  
    var left = 0;
    var right = 300;
    var left = setInterval(frameLeft, 100);
    var right = setInterval(frameRight, 50);
    function frameLeft() {
      if (left == 900) {
        clearInterval(left);
      } else {
        left++; 
        elem1.style.left = left + 'px'; 
        elem2.style.left = left + 'px'; 
        elem4.style.left = left * 5 + 'px'; 
      }
    }
    function frameRight() {
        if (right == 0) {
          clearInterval(right);
        } else {
          right++; 
          elem3.style.right = right + 'px'; 
        }
    }
}


function addPath() {
    var times;

    // Adding event.preventDefault(); stopped swal from disappearing too quickly as per https://github.com/t4t5/sweetalert/issues/414
    event.preventDefault();
    let timerInterval
    // This is completed aestheticf for now, with the inclusion of more datapoints and the map slowing down, we may need
    // to call the snapshots within this function, hold for a period of time and then draw to the map after the fact
    Swal.fire({
      title: 'We are working on it',
      html: 'Retrieving results from database',
      timer: 2000,
      confirmButtonText: "Cancel",
      timerProgressBar: false,
      willOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Connection to database
        const firebaseConfig = {
          apiKey: "AIzaSyDdHIsnGPO3tgBtx4H9ZkoWgVPN8-VRLEk",
          authDomain: "runtheworld-1fc8d.firebaseapp.com",
          databaseURL: "https://runtheworld-1fc8d-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "runtheworld-1fc8d",
          storageBucket: "runtheworld-1fc8d.appspot.com",
          messagingSenderId: "840124506034",
          appId: "1:840124506034:web:b40bf2c2db0689867f4eab",
          measurementId: "G-QXWWB0V761"
        };
  
      // if button is clicked multiple times the connection to the firebase database might already be created, check this.
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      }
      
      var varTotalTime = 0;
      var query = firebase.database().ref('UserData');
      // Retrieving the values for the total times
      query.once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              res = childSnapshot.child('time').val().split(":");
              // Values currently in firebase come in format 0:00:10
              // We use for each to parse them into an array ["0", "00", "10"]
              // Whichever number is in index 1 should be multiplied by 60 as this is hours
              // Whichever number is in index 2 should just be added as we are using minutes
              res.forEach((number, index) => {
                  if(index == 0){
                      varTotalTime +=  parseInt((parseInt(number) * 60));
                  } else if (index == 1){
                      varTotalTime += parseInt(number);
                  }
              });
          })
          // Animate the times on to the website
          var IndexTotalTimeRanValue = document.getElementById("IndexTotalTimeRanValue");
          animateValue(IndexTotalTimeRanValue, 0, varTotalTime, 500);
      })
  
      var userRunCoords = [];
      query.once("value")
      .then(function(snapshot) {
          userRunCoords = []
          // Retrieve snapshot
          snapshot.forEach(function(childSnapshot) {
              // Retrieve child snapshot based on value 'locations'
              // This will retrieve the latitude and longitude
              // For each of these values, add them to userRunCoords
              res = childSnapshot.child('locations').val();
              res.forEach((value) => {
                  userRunCoords.push(new google.maps.LatLng(value.latitude, value.longitude));
              });
          })
          // Create a polyLine in google maps based on the coordinates given
          var userRun = new google.maps.Polyline({
              path: userRunCoords,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 3
          });
          // Push to google maps
          userRun.setMap(map);
      })
      
      // Counter for the Index page, once the minutes are retrieved from the firebase snapshot
      // We can go from 0 to X number of minutes.
      function animateValue(obj, start, end, duration) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      }
    })

    // spreadsheet_url="https://spreadsheets.google.com/feeds/cells/1khnZAVFuX_b94e_iFn5eFZBBV_RAN0nIqKVc3M1oC0s/1/public/full?alt=json";
    // $.getJSON(spreadsheet_url , function(data) {
    //     var userRunCoords = [];
    //     let coords = [];
    //     var replaced_coords = [];

    //     // For each row retrieve entry
    //     var i, j, k;
    //     for(i = 2; i < data.feed.entry.length; i += 2){
    //         // Retrieve cell from Google Sheets
    //         var json = data.feed.entry[i]['gs$cell']['$t']; 
            
    //         // Add up minutes
    //         times += parseInt(data.feed.entry[i + 1]['gs$cell']['$t']); 

    //         // Remove leading and trailing char
    //         json = json.slice(1, json.length -1);
            
    //         coords = (json.split(','));
            
    //         for (var j in coords) {
    //             replaced_coords[j] = parseFloat(coords[j].replace('(','').replace(')','').replace(' ','').replace('"',''));
    //         }
            
    //         for (k = 0; k < coords.length; k += 2) {
    //             var lat = parseFloat(replaced_coords[k]);
    //             var lng = parseFloat(replaced_coords[k + 1]);
    //             userRunCoords.push(new google.maps.LatLng(lat, lng));
    //         }

    // var userRun = new google.maps.Polyline({
    //     path: userRunCoords,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    // });
    // userRun.setMap(map);
    //     }

        // var holder = document.getElementById('IndexTotalTimeRanValue');
        // holder.innerHTML = times;

          
    // });

    // var flightPlanCoordinates = [
    //     new google.maps.LatLng(53.350140, -6.266155),
    //     new google.maps.LatLng(53.350140, -7.2661556)
    // ]

    // var flightPlanCoordinatesTest = [
    //     new google.maps.LatLng(52.350140, -6.266155),
    //     new google.maps.LatLng(51.350140, -7.2661556)
    // ]
    
    // // initialize a Polyline object. You can set the color, width, opacity, etc. 
    // var flightPathTest = new google.maps.Polyline({
    //     path: flightPlanCoordinates,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    // });

    // var flightPath = new google.maps.Polyline({
    //     path: flightPlanCoordinatesTest,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    // });

    // flightPath.setMap(map);
    // flightPathTest.setMap(map);
}

