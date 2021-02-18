/*
Rob
*/

// Global Variables
var newLink;

// The webpage relies on a lot of animations to run smoothly
// We force the user to the top of the page to ensure this consistency
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function onLoad(){
  let newLinkSession = sessionStorage.getItem('newLinkCssFile');
  if(newLinkSession === null){
    newLink = "CSS/contactPaul.css";
  } else {
    newLink = sessionStorage.getItem('newLinkCssFile')
  }
  changeCSS(newLink, 0);
}


function phoneAtTopVanish(){
  $("#arrow_text").fadeOut(300);
  $("#arrow").fadeOut(300);
}

function changeCSS(cssFile, cssLinkIndex) {
  var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

  newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", cssFile);

  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
  sessionStorage.setItem('newLinkCssFile', cssFile);

}

function IsEmpty(){
  var firstName = document.forms['Form']['firstname'].value;
  var lastName = document.forms['Form']['lastname'].value;
  var subject = document.forms['Form']['subject'].value;
  
  if (firstName == null || firstName == "", lastName == null || lastName == "", subject == null || subject == "") {
    event.preventDefault()
    Swal.fire("Please fill in full contact form");
  } else {
    // Email to support account
    // Email: runtheworldcontactus@gmail.com
    // Password: WebDesign100!
    var link = "mailto:RunTheWorldContactUsEmail@gmail.com"
            + "?cc=myCCaddress@example.com"
            + "&subject=" + encodeURIComponent("Run The world - " + firstName + " " + lastName + " query")
            + "&body=" + encodeURIComponent(subject)
    ;
    window.location.href = link;
  }
}