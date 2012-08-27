//project 4
//Ryan Trease

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){
    
    //variables
    var toolType = ["--Select Type--", "Hand Tool", "Power Tool", "Power Tool Accessory", "Hardware", "Lumber"];
    var purchaseType;
    var errMsg = $('errors');
   
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
    function storeData(key){
    	if(!key){
    		var id = Math.floor(Math.random()*100000001);
    	}
    	else{
    		id = key;
    	}
        getSelected();
        var item = {};
            item.name = ["Name:", $('name').value];
            item.groups = ["Tool/Item Type: ", $('groups').value];
            item.make = ["Make: ", $('make').value];
            item.mnumber = ["Model Number: ", $('mnumber').value];
            item.snumber = ["Serial Number: ", $('snumber').value];
            item.dpurchased = ["Date Purchased: ", $('dpurchased').value];
            item.wpurchased = ["Where Purchased: ", $('wpurchased').value];
            item.price = ["Price: ", $('price').value];
            item.ev = ["Estimated Value: ", $('ev').value];
            item.condition = ["New or Used: ", purchaseType];
            item.qty = ["Quantity: ", $('qty').value];
            item.dateadded = ["Date Added: ", $('dateadded').value];
            item.notes = ["Additional notes: ", $('notes').value];
            
        //save to local storage: use stringify to convert to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your item was stored successfully!");
        
    }
    
    //write data to display in browser
    function displayData(){
		toggleControls("on");
        if(localStorage.length === 0){
        	alert("You have no data to display so default data will be added.");
        	autoFillData();
        }
	        var makeDiv = document.createElement('div');
	        makeDiv.setAttribute("id", "items");
	        var makeList = document.createElement('div');
	        makeList.setAttribute("id", "ulList");
	        makeDiv.appendChild(makeList);
	        document.body.appendChild(makeDiv);
	        $('items').style.display = "block";
	        for(var i=0, len=localStorage.length; i<len; i++){
	            var makeLi = document.createElement('li');
	            makeLi.setAttribute("id", "mainLi");
	            var linksLi = document.createElement('li');
	            linksLi.setAttribute("id", "editDeleteLi");
	            makeList.appendChild(makeLi);
	            var key = localStorage.key(i);
	            var value = localStorage.getItem(key);
	            var obj = JSON.parse(value);
	            var makeSubList = document.createElement('div');
	            makeSubList.setAttribute("id", "subUl");
	            makeLi.appendChild(makeSubList);
	            getImage(obj.groups[1], makeSubList);
	            for(var n in obj){
	                var makeSubLi = document.createElement('li');
	                makeSubList.appendChild(makeSubLi);
	                var optSubText = obj[n][0]+" "+obj[n][1];
	                makeSubLi.innerHTML = optSubText;
	                makeSubList.appendChild(linksLi);
            	}
	            makeItemLinks(localStorage.key(i), linksLi); //create edit and delete buttons
            }
    }
    
    function getImage(toolName, makeSubList){
    	var imagesLi = document.createElement('li');
    	makeSubList.appendChild(imagesLi);
    	var newImage = document.createElement('img');
    	var setSource = newImage.setAttribute("src", "images/" + toolName + ".png");
    	imagesLi.appendChild(newImage);
    }
        
    function autoFillData(){
	    //store JSON data in actual storage
	    for(var n in json){
		    var id = Math.floor(Math.random()*100000001);
		    localStorage.setItem(id, JSON.stringify(json[n]));
	    }
    }
    
    //makes item links
    function makeItemLinks(key, linksLi){
    	var editLink = document.createElement('a');
    	editLink.setAttribute("id", "edButtons");
    	editLink.href = "#";
    	editLink.key = key;
    	var editText = "Edit Item";
    	editLink.addEventListener("click", editItem);
    	editLink.innerHTML = editText;
    	linksLi.appendChild(editLink);
    	
    	var deleteLink = document.createElement('a');
    	deleteLink.setAttribute("id", "edButtons");
    	deleteLink.href = "#";
    	deleteLink.key = key;
    	var deleteText = "Delete Item";
    	deleteLink.addEventListener("click", deleteItem);
    	deleteLink.innerHTML = deleteText;
    	linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
    	//grab item data from local storage
    	var value = localStorage.getItem(this.key);
    	var item = JSON.parse(value);
    	//show form
    	toggleControls("off");
    	
    	$('name').value = item.name[1];
    	$('groups').value = item.groups[1];
    	$('make').value = item.make[1];
    	$('mnumber').value = item.mnumber[1];
    	$('snumber').value = item.snumber[1];
    	$('dpurchased').value = item.dpurchased[1];
    	$('wpurchased').value = item.wpurchased[1];
    	$('price').value = item.price[1];
    	$('ev').value = item.ev[1];
    	var radios = document.forms[0].condition;
    	for(var i = 0; i<radios.length; i++){
    		if(radios[i].value == "New" && item.condition[1] == "New"){
    			radios[i].setAttribute("checked", "checked");
    		}
    		else if(radios[i].value == "Used" && item.condition[1] == "Used"){
    			radios[i].setAttribute("checked", "checked");
    		}
    	}
    	$('qty').value = item.qty[1];
    	$('dateadded').value = item.dateadded[1];
    	$('notes').value = item.notes[1];
    	
    	//remove listener from input 'add item' button
    	save.removeEventListener("click", storeData);
    	//change submit value to edit
    	$('submit').value = "Edit Item";
    	var editSubmit = $('submit');
    	//save key value established
    	editSubmit.addEventListener("click", validate);
    	editSubmit.key = this.key;
    	
    }
    
    function deleteItem(){
    	var ask = confirm("Are you sure you want to delete this item?");
    	if(ask){
    		localStorage.removeItem(this.key);
    		alert("Item was deleted.");
    		window.location.reload();
    	}
    	else{
    		alert("Item was not deleted.");
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
    
    function validate(e){
    	//define elements to check
    	var getName = $('name');
    	var getGroup = $('groups');
    	var getMake = $('make');
    	var getMnumber = $('mnumber');
    	
    	//reset error messages
    	errMsg.innerHTML = "";
    	getName.style.border = "1px solid #4B88B6";
    	getGroup.style.border = "1px solid #4B88B6";
    	getMake.style.border = "1px solid #4B88B6";
    	getMnumber.style.border = "1px solid #4B88B6";
    	
    	//error messages
    	var errorMessageArray = [];
    	//name error message
    	if(getName.value === ""){
    		var nameError = "Please enter an item name.";
    		getName.style.border = "1px solid red";
    		errorMessageArray.push(nameError);
    	}
    	
    	//group error message
    	if(getGroup.value === "--Select Type--"){
    		var groupError = "Please enter a tool type.";
    		getGroup.style.border = "1px solid red";
    		errorMessageArray.push(groupError);
    	}
    	
    	//make error message
    	if(getMake.value === ""){
    		var makeError = "Please enter a tool make.";
    		getMake.style.border = "1px solid red";
    		errorMessageArray.push(makeError);
    	}
    	
    	//model number error message
    	if(getMnumber.value === ""){
    		var mnumberError = "Please enter a model number.";
    		getMnumber.style.border = "1px solid red";
    		errorMessageArray.push(mnumberError);
    	}
    	
    	if(errorMessageArray.length >=1){
    		for(var i = 0, j=errorMessageArray.length; i < j; i++){
    			var txt = document.createElement('li');
    			txt.innerHTML = errorMessageArray[i];
    			errMsg.appendChild(txt);
    		}
        	e.preventDefault();
        	return false;
    	}
    	else{
    		//if data is entered correctly it gets stored here
    		storeData(this.key);
    	}
    }
    
    //Links & click events
    var display = $('display');
    display.addEventListener("click", displayData);
    
    var clear = $('clear');
    clear.addEventListener("click", clearData);
    
    var save = $('submit');
    save.addEventListener("click", validate);
});