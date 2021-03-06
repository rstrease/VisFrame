//project 2
//Ryan Trease

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){
    
    //variables
    var toolType = ["--Select Type--", "Hand Tool", "Power Tool", "Power Tool Accessory", "Hardware", "Lumber"];
    var purchaseType;
   
    //getElementById function
    function $(x){
        var element = document.getElementById(x);
        return element;
    }
    
    //select field element and populate
    function chooseToolType(){
        var formTag = document.getElementsByTagName("fieldset");
        var select = $('select');
        var makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "groups");
        for(var i = 0, j=toolType.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = toolType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        select.appendChild(makeSelect);
    }
    chooseToolType();
    
    //find value of selected radio button
    function getSelected(){
        var radioNewUsed = document.forms[0].condition;
        for(var i = 0; i<radioNewUsed.length; i++){
            if(radioNewUsed[i].checked){
                purchaseType = radioNewUsed[i].value;
            }
        }
    }
    
        function toggleControls(n) {
        switch (n) {
            case "on":
                $('inputs').style.display = "none";
                $('clear').style.display = "inline";
                $('display').style.display = "none";
                $('addnew').style.display = "inline";
                break;
            case "off":
                $('inputs').style.display = "block";
                $('clear').style.display = "inline";
                $('display').style.display = "inline";
                $('addnew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
            return false;
        }
    }
    
    //select data and submit
    function submitData(){
        var id = Math.floor(Math.random()*100000001);
        getSelected();
        var item = {};
            item.name = ["Name:", $('name').value];
            item.group = ["Group: ", $('groups').value];
            item.make = ["Make: ", $('make').value];
            item.mnumber = ["Model Number: ", $('mnumber').value];
            item.snumber = ["Serial Number: ", $('snumber').value];
            item.dpurchased = ["Date Purchased: ", $('dpurchased').value];
            item.wpurchased = ["Where Purchased: ", $('wpurchased').value];
            item.price = ["Price: ", $('price').value];
            item.ev = ["Estimated Value: ", $('ev').value];
            item.purchased = ["New or Used: ", purchaseType];
            item.qty = ["Quantity: ", $('qty').value];
            item.dateadded = ["Date Added: ", $('dateadded').value];
            item.notes = ["Additional notes: ", $('notes').value];
            
        //save to local storage: use stringify to convert to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your item was stored successfully!");
        
    }
    
    //write data to display in browser
    function displayData(){

        if(localStorage.length === 0){
        	alert("You have no data to display.");
        	return false;
        }
        else {	
	        toggleControls("on");
	        var makeDiv = document.createElement('div');
	        makeDiv.setAttribute("id", "items");
	        var makeList = document.createElement('ul');
	        makeDiv.appendChild(makeList);
	        document.body.appendChild(makeDiv);
	        $('items').style.display = "block";
	        for(var i=0, len=localStorage.length; i<len; i++){
	            var makeLi = document.createElement('li');
	            makeList.appendChild(makeLi);
	            var key = localStorage.key(i);
	            var value = localStorage.getItem(key);
	            var obj = JSON.parse(value);
	            var makeSubList = document.createElement('ul');
	            makeLi.appendChild(makeSubList);
	            for(var n in obj){
	                var makeSubLi = document.createElement('li');
	                makeSubList.appendChild(makeSubLi);
	                var optSubText = obj[n][0]+" "+obj[n][1];
	                makeSubLi.innerHTML = optSubText;
            	}
            }
        }
    }
    
    function clearData(){
    	if (localStorage.length === 0){
    		alert("You have no data to clear.");		
    	}
    	else{
    		localStorage.clear();
    		alert("Your contents have been deleted.");
    		window.location.reload();
    		return false;
    	}
    }
    
    //Links & click events
    var display = $('display');
    display.addEventListener("click", displayData);
    
    var clear = $('clear');
    clear.addEventListener("click", clearData);
    
    var submit = $('submit');
    submit.addEventListener("click", submitData);
});