/*

https://www.facebook.com/sharer.php?u=[post-url]

https://twitter.com/share?url=[post-url]&text=[post-title]

https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]


*/


function changeColor() 
{ 
	if (document.getElementById("contact_div_one").style.background == "#9dcc95") {
		document.getElementById("contact_div_one").style.background = "#0B0C10";
	}
	else{
    document.getElementById("contact_div_one").style.background = "#2e5d27";
	}
}
function changeColorLuca() 
{ 
	if (document.getElementById("contact_div_one").style.background == "#2e5d27") {
		document.getElementById("contact_div_one").style.background = "#0B0C10";
	}
	else{
    document.getElementById("contact_div_one").style.background = "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2))";
	}
}
function changeColorRob() 
{ 
	if (document.getElementById("contact_div_one").style.background == "#2e5d27") {
		document.getElementById("contact_div_one").style.background = "#0B0C10";
	}
	else{
    document.getElementById("contact_div_one").style.background = "rgb(255, 137, 137)";
	}
}

const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");

const linkedinBtn = document.querySelector(".linkedin-btn");


function init() {


  let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("Hi everyone, please check this out: ");


  facebookBtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );

  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  );



  linkedinBtn.setAttribute(
    "href",
    `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
  );


}

init();



