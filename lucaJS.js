/* Global variables will be displayed here on top */
var itemsAmount;
var itemsAmount2;
var itemsAmount3;

var test=/^[0-9]+$/;

/* Array will contain prices for the products. Prices will be identified using the value between brackets */
var items_price=new Array();
items_price["Watch"]=50;
items_price["Bend"]=40;
items_price["Earphones"]=30;
items_price["Glasses"]=20;
items_price["Bottle"]=10;
items_price["newBalance"]=150;
items_price["newBalance1"]=140;
items_price["Adidas"]=130;
items_price["Asics"]=120;
items_price["Asics White"]=110;
items_price["Saucony"]=100;
items_price["Merrell"]=90;
items_price["Voovix"]=80;
items_price["Saguaro"]=70;
items_price["Voovix Trainers"]=60;

/* JQuery functions are called once the page loads.
I implemented two different effect: the first one is agentle scroll to a specific section of the page once the user clicks on button;
the second increases the size of pictures as tehy hover on them  */
function myFunction() {
	$(document).ready( function(){
		$("#icon").click( function(){
			$('html, body').animate({scrollTop : $("#basket").offset().top}, 800);
		});
		$("#casousel_button, #casousel_button1, #casousel_button2, #casousel_button3, #menButton").click( function(){
			$('html, body').animate({scrollTop : $("#menRunning").offset().top}, 800);
		});
		$("#womenButton").click( function(){
			$('html, body').animate({scrollTop : $("#womenRunning").offset().top}, 800);
		});
		$("#accessoriesButton").click( function(){
			$('html, body').animate({scrollTop : $("#accessories").offset().top}, 800);
		});
		
		$(".store_shoes img").hover( function(){
			$(this).animate({
				width: '+=30px',
				height: '+=20px'
			}, "slow");
		},
		function(){	
			$(this).animate({
			width: '-=30px',
			height: '-=20px'
			}, "fast");
		});
	});
}

/* The function is called as the page loads and hides rows from the basket, making it look empty */
function hideRow(){
	var obj = document.getElementById("store_row");
	var obj1 = document.getElementById("store_row1");
	var obj2 = document.getElementById("store_row2");
    
	obj.style.display="none";
	obj1.style.display="none";
	obj2.style.display="none";
}

/* These three functions comes in play once the user click to the remove item button in the basket.
They set the values of article, price and quantity to null and hide the respective row */
function removeItem(){
	document.getElementById("article").value="";
	document.getElementById("price").value="";
	document.getElementById("number").value="";
	
	var obj = document.getElementById("store_row");
	obj.style.display="none";
	
	calculateTotal();
}

function removeItem1(){
	document.getElementById("article2").value="";
	document.getElementById("price2").value="";
	document.getElementById("number2").value="";
	
	var obj = document.getElementById("store_row1");
	obj.style.display="none";
	
	calculateTotal();
}

function removeItem2(){
	document.getElementById("article3").value="";
	document.getElementById("price3").value="";
	document.getElementById("number3").value="";
	
	var obj = document.getElementById("store_row2");
	obj.style.display="none";
	
	calculateTotal();
}

/* addToBasket() is called when the user clicks the appropriate button on the mainpage. It receives as input the value associated with the button clicked.
This function identifies the correct price and displays in either the first, second or third row.
If the user adds the fourth items, an erroe message appears.
If the process is successful, calculateTotal() is called to update the price of the basket */
function addToBasket(clicked_value){
	var price;
	var check=document.getElementById("article").value;
	
	price=items_price[clicked_value];
	
	if(!check){
		var divobj = document.getElementById('store_row');
		divobj.style.display="table-row";
		
		document.getElementById("article").value=clicked_value;
		document.getElementById("price").value=price;
		document.getElementById("number").value=1;
	}
	else if(!document.getElementById("article2").value){
		var divobj = document.getElementById('store_row1');
		divobj.style.display="table-row";
		
		document.getElementById("article2").value=clicked_value;
		document.getElementById("price2").value=price;
		document.getElementById("number2").value=1;
	}
	else if(!document.getElementById("article3").value){
		var divobj = document.getElementById('store_row2');
		divobj.style.display="table-row";
		
		document.getElementById("article3").value=clicked_value;
		document.getElementById("price3").value=price;
		document.getElementById("number3").value=1;
	}
	else{
		Swal.fire({
	  icon: 'error',
	  title: 'Oops...',
	  text: 'Your Basket is full!',
	})
		return false;
	}
	
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 5000,
		timerProgressBar: true,
		didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

		Toast.fire({
			icon: 'success',
			title: 'Your Basket has been updated!'
		})

	calculateTotal();
}

/* checkQuantity() comes in play when the user changes quantity of items in the basket.
The function check for appropriate inputs, returning false if needed. calculateTotal() is called to update price in the basket */
function checkQuantity(){
	
	itemsAmount=document.getElementById("number").value;
	itemsAmount2=document.getElementById("number2").value;
	itemsAmount3=document.getElementById("number3").value;
	
    if((!itemsAmount.match(test))||(!itemsAmount2.match(test))||(!itemsAmount3.match(test))){
      
		Swal.fire({
			icon: 'error',
			title: 'Please check your Basket...',
			text: 'Use only numeric values',
	})
		return false;
	}
	
	else if(itemsAmount==0||itemsAmount2==0||itemsAmount3==0){
		calculateTotal();
		
		Swal.fire({
			icon: 'error',
			title: 'Please check your Basket...',
			text: 'You have selected 0 items',
		})
		return false;
	}
	
	else{
		calculateTotal();
	}
}

/* With this function the price of the basket is displayed. A simple formula combining itemsAmount and prices.
There are no return values here, just string outcomes.*/
function calculateTotal(){
	itemsAmount=document.getElementById("number").value;
	itemsAmount2=document.getElementById("number2").value;
	itemsAmount3=document.getElementById("number3").value;
	
	
	var totalCost;
	var price1=document.getElementById("price").value;
	var price2=document.getElementById("price2").value;
	var price3=document.getElementById("price3").value;
	
	totalCost=(itemsAmount*price1)+(itemsAmount2*price2)+(itemsAmount3*price3);
	
	if(price1!="" || price2!="" || price3!=""){
		
		document.getElementById("totalCost").innerHTML="Your Basket is &euro;" +totalCost;
	}
	
	if(price1=="" && price2=="" && price3==""){
		document.getElementById("totalCost").innerHTML="Your Basket is Empty!";
	}
}

/* This function is called once the user clicks the Check Out button. It performs several validations and then calls checkQuantity() to make sure
the basket is properly filled before submitting the form.

This large section is formed by a variety of independent if-statement to validate each field in the <form> section of the page.
Most of them are checked against empty fields, but some of them have specific validations in place.
For a complete analysis, please refer to the SECTION 2 – DEVELOPMENT SECTION in the report under 'STORE PAGE'.*/
function validate(){

	var name=document.getElementById("firstName").value;
	var lastName=document.getElementById("lastName").value;
	var email=document.getElementById("email").value;
	var address=document.getElementById("address").value;
	var cardNumber=document.getElementById("cardNumber").value;
	var cvv=document.getElementById("cvv").value;
	var nameOnCard=document.getElementById("nameOnCard").value;
	
	var expMonth=document.getElementById("expMonth").value;
	var expYear=document.getElementById("expYear").value;
	
	if(name==""){
		Swal.fire({
		icon: 'error',
		title: 'Please check Billing Information...',
		text: 'Name has to be filled',
	})
		return false;
	}
	
	if(lastName==""){
		Swal.fire({
		icon: 'error',
		title: 'Please check Billing Information...',
		text: 'Last name has to be filled',
	})
		return false;
	}
	
	var emailRegex=/\S+@\S+\.\S+/;
	if(!email.match(emailRegex)){
		Swal.fire({
		icon: 'error',
		title: 'Please check Billing Information...',
		text: 'Enter a valid email address',
	})
		return false;
	}
	
	if(address==""){
		Swal.fire({
		icon: 'error',
		title: 'Please check Billing Information...',
		text: 'Address has to be filled',
	})
		return false;
	}
	
	if(nameOnCard==""){
		Swal.fire({
		icon: 'error',
		title: 'Please check Payment Details...',
		text: 'Name on Card has to be filled',
	})
		return false;
	}

	if(!cardNumber.match(test)){
		Swal.fire({
		icon: 'error',
		title: 'Please check Payment Details...',
		text: 'On Card Number enter a numeric value without spaces',
	})
		return false;
	}
	else{
		var sum=0;
		var alternate=false;
		for(var i=cardNumber.length-1;i>=0;i--){
			var digit = parseInt(cardNumber[i]);
			if(alternate){
				digit=digit*2;
				if(digit>=10){
					digit=digit-9;
				}
			}
			sum=sum+digit;
			alternate= !alternate;
		}
		if(sum%10!=0){
			Swal.fire({
				icon: 'error',
				title: 'Please check Payment Details...',
				text: 'You entered an invalid Card number. Try: 4003600000000014 or 30569309025904',
			})
		return false;
		}
	}
	
	if(expYear==""||expMonth==""){
		Swal.fire({
		icon: 'error',
		title: 'Please check Payment Details...',
		text: 'Insert expiration date',
	})
		return false;
	}
	var today=new Date();
	var expDay=new Date();
	expDay.setFullYear(expYear,expMonth,1);
	if(expDay<today){
		Swal.fire({
		icon: 'error',
		title: 'Please check Payment Details...',
		text: "You selected a date before today's date",
	})
		return false;
	}
	
	var cvvRegex=/^[0-9]{3,4}$/;
	if(!cvv.match(cvvRegex)){
		Swal.fire({
		icon: 'error',
		title: 'Please check Payment Details...',
		text: 'CVV is not valid. Use 3 or 4 numeric values only',
	})
		return false;
	}

	return checkQuantity();
}