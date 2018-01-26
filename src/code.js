

var map = [];
map[0] = "Maahan törmännyt avaruusalus"
map[1] = "Kauppa"
map[2] = "Joenranta"
map[3] = "Naapurin Heidi"
map[4] = "Kallen kämppä"
map[5] = "Sairaala"
map[6] = "Synkkä metsä"
map[7] = "Uimaranta"
map[8] = "Moottoritie"

var mapImages = [];
mapImages[0] = "avaruusalus.png"
mapImages[1] = "kauppa.png";
mapImages[2] = "joki.png";
mapImages[3] = "heidi.png";
mapImages[4] = "kamppa.png";
mapImages[5] = "sairaala.png";
mapImages[6] = "metsa.png";
mapImages[7] = "uimaranta.png";
mapImages[8] = "moottoritie.png";

var blockedPaths = [];
blockedPaths[0] = "Sille alueelle ei ole pääsyä.";
blockedPaths[1] = "Vilkas moottoritie estää kulkusi.";
blockedPaths[2] = "Voimakas virta estää kulkusi.";
blockedPaths[3] = "Heidi ei päästä sinua tänne.";
blockedPaths[4] = "";
blockedPaths[5] = "Siellä ei ole mitään.";
blockedPaths[6] = "Vaikeakulkuinen metsä estää pääsysi.";
blockedPaths[7] = "Et pysty ylittämään merta.";
blockedPaths[8] = "Tämä tie ei johda mihinkään.";

var locDescrText = [];
locDescrText[0] = "Maassa on jokapuolella romua kummallisesta aluksesta. Sotilaita ja palomiehiä parveilee ympäriinsä.";
locDescrText[1] = "Hiljainen pikkukauppa. Tarjontaa on niukasti.";
locDescrText[2] = "Rauhallinen joenranta, jossa pääset kivasti rannalle istumaan.";
locDescrText[3] = "Vihainen koira istuu vahtimassa ovea.";
locDescrText[4] = "Koti, jossa voi kokea olonsa turvalliseksi.";
locDescrText[5] = "Kiireinen ja hälyisä sairaala.";
locDescrText[6] = "Synkkä ja hiljainen metsä, jossa kuuluu vain hengityksesi ääni.";
locDescrText[7] = "Vilkas uimaranta.";
locDescrText[8] = "Hälyisä moottoritie, joka johtaa kaupunkiin.";


var lookTexts = [];
lookTexts[0] = "Näkyy 0";
lookTexts[1] = "Näkyy 1";
lookTexts[2] = "Näkyy 2";
lookTexts[3] = "Näkyy 3";
lookTexts[4] = "Näkyy 4";
lookTexts[5] = "Näkyy 5";
lookTexts[6] = "Näkyy 6";
lookTexts[7] = "Näkyy 7";
lookTexts[8] = "Näkyy 8";


var pointsOfInterest = [];

var player = {
	location: 4,
	inventory: [],
	health: 100,
	name: "Omanimi",
	weight: 10,
}


var locations = [];
var items = []; //USED ONLY TO INITIALIZE

//Sets items to locations in game

//todo jostakin taulukosta lukee
function initializeItems()
{
	items = [{
		name: "haulikko",
		description: "Vankka ja hyväkuntoinen Remington. Käyttää patruunoita.",
		weight: 30,
		location: 1
	},
	{
		name: "mato-onki",
		description: "Keppi jonka päässä siima.",
		weight: 10,
		location: 6
	},
	{
		name: "autonavaimet",
		description: "Audin avaimet.",
		weight: 2,
		location: 8
	},
	{
		name:"kivi",
		description:"Tavallinen kivi.",
		weight:4,
		location:1
	}
	]
}

function initPointsOfInterest(){
	pointsOfInterest = [{
		name:"Romukasa",
		text: "Näet jokapuolella romua, joka vaikuttaa olen peräisin ulkoavaruudesta saapuneesta aluksesta. \
		Onneksi olen järkevä, enkä koske vierasperäisiin tavaroihin.",
		location: 0

	},

	{
		name:"Veden loiskintaa",
		text: "Näet jonkin liikehtivän vedessä, se voisi olla herkullinen kirjolohi, tai jotain muuta...Olisipa minulla onki.",
		location: 2

	}]
	
}



function Location(number, name, items, enemies, texts, pointsOfInterest)
{
	this.number = number;
	this.pointsOfInterest = pointsOfInterest;
	this.name = name;
	this.locItems = [];
	this.texts = {
		description:texts[0],
		blocked:texts[1],
		look:texts[2]
	};
	this.locEnemies = enemies;

	for(var i = 0; i < items.length; ++i)
	{
		this.locItems[i] = items[i];
	}
}


function initializeLocations()
{

	for(var i = 0; i < 9; ++i)
	{
		var itemArray = [];
		var poiArray = [];

		//set Texts
		var texts = [locDescrText[i],blockedPaths[i],lookTexts[i]];
	
		//set items 
		for(var j = 0; j < items.length; ++j)
		{
			if(items[j].location === i)
			{
				itemArray.push(items[j]); 
				console.log("added item" + items[j].name + " to" + map[i]);
			}
		}

		//set PointsOfInterest
		for(var j = 0; j < pointsOfInterest.length; ++j)
		{
			if(pointsOfInterest[j].location === i)
			{
				poiArray.push(pointsOfInterest[j]); 
				console.log("added poi" + pointsOfInterest[j].name + " to" + map[i]);
			}
		}

		var tempLocation = new Location(i,map[i],itemArray,0,texts,poiArray);
		locations.push(tempLocation);
	}
}



var actionList =  ["north", "east", "south", "west", "take", "use", "drop","dump","inspect","look","help"];
var locationInfo = document.querySelector("#locationInfo");
var locationItemList = document.querySelector("#itemList")
var gameItems = ["haulikko", "mato-onki","autonavaimet","kirjolohi","kivi","amuletti","patruunat"];
var interactItem = "";
var playerInventoryGUI = document.querySelector("#playerInventory");
var locationName = document.querySelector("#locationName");
var locationDescription = document.querySelector("#locationDescription");
var mapTable = document.querySelector("#mapTable");
var poiList = document.querySelector("#poiList");
locationDescription.innerHTML = map[player.location];

var image = document.querySelector("img");
var inputField = document.querySelector("#input");
var playerInput = "";
var gameMessage ="";
var locationMessage = "";
var action = "";
var isGameOver = false;

var actionLog = document.querySelector("#actionLog");

var button = document.querySelector("button");
button.style.cursor ="pointer";
button.addEventListener("click",clickHandler,false);

window.addEventListener("keydown",keyDownHandler,false);

initGame();
renderGUI();
document.querySelector("#actionLog").innerHTML ="<h3> Welcome to GameName!<br> Type <i>'help'</i> for commands </h3>";

function clickHandler(){
	playGame();
}

//Called everytime to update game (same as gameloop)
function playGame(){

	updateLogic();
	renderGUI();
}



function keyDownHandler(event){


	//TODO CASE
	if(event.keyCode === 13)
	{
		playGame();
	}

		if(event.keyCode === 37)
	{
		input.value ="west";
		playGame();
	}

	if(event.keyCode === 38)
	{
		input.value ="north";
		playGame();
	}


	if(event.keyCode === 39)
	{
		input.value ="east";
		playGame();
	}

		if(event.keyCode === 40)
	{
		input.value ="south";
		playGame();
	}
}


function updateLogic()
{

	interactItem = "";
	playerInput = inputField.value;
	playerInput = playerInput.toLowerCase();
	lookTarget = "";
	gameMessage ="";
	action = "";


	if(isGameOver === true)
	{
		gameMessage += "<h3> Peli on nyt ohi, on aika hankkia elämä :)</h3>";
	
	}

	else
	{
		//Check if player puts allowed action
		for(var i = 0; i < actionList.length; i++)
		{
			if(playerInput.indexOf(actionList[i]) !== -1) //indexOf palauttaa -1 jos ei löydy actionlistasta oikeaa komentoa
			{	
				action = actionList[i];
				console.log("Player action: " + action);
				break;
			}

		}


		//katotaan onko itemiä olemassa pelissä
		for(var i = 0; i <= gameItems.length; i++)
		{
			if(playerInput.indexOf(gameItems[i]) !== -1)
			{
				interactItem = gameItems[i];
				console.log("found item" + interactItem);
				break;
			}
		}

		//check if look target exists in the game
		if(action === "look")
		{
				for(var i = 0; i < pointsOfInterest.length; i++)
			{
				if(playerInput.indexOf(pointsOfInterest[i].name.toLowerCase()) !== -1)
				{
					lookTarget = pointsOfInterest[i];
					console.log("lookTarget:" + lookTarget.name.toLowerCase());
					break;
				}
			}
		}	


		function setBlockText(direction)
		{
			gameMessage = "<span class='blocked'> Move " + direction +" blocked: "+ "- " + blockedPaths[player.location] + "</span>";
		}


		switch(action)
		{
			case "north":

				if(player.location >= 3)
				{
					player.location -=3;
					gameMessage += "Saavuit paikkaan: <strong>" + currentLocation().name + "</strong>";
				}
				else
				{
					setBlockText("north");
				}
					break;

			case "east":

				if(player.location % 3 != 2)
				{
					player.location += 1;
					gameMessage += "Saavuit paikkaan: <strong>" + currentLocation().name + "</strong>";
				}
				else
				{
					setBlockText("east");
				}
				break;


				break;

			case "south":	
				if(player.location < 6)
				{
					player.location += 3;
					gameMessage += "Saavuit paikkaan: <strong>" + currentLocation().name + "</strong>";
				}
				else
				{
					setBlockText("south");
				}
				break;

			case "west":
				if(player.location % 3 != 0)
				{
					player.location -= 1;
					gameMessage += "Saavuit paikkaan: <strong>" + currentLocation().name + "</strong>";
				}
				else
				{
					setBlockText("west");
				}
				break;

			case "inspect":
			inspectItem(interactItem);
				break;

			case "look":
			look(lookTarget);
			break;

			case "take":
				takeItem();
				break;
			case "look":
				look();
				break;
		

			case "drop":
				dropItem(interactItem);
				break;
				
			case "use":
				useItem();
				break;

			case "dump":
				dropAllItems();
				break;

			case "help":
				showHelp();
				break;

			default:
				gameMessage = "Invalid input: " + playerInput;
			break;

		}

		console.log("location:" + player.location);
		input.value ="";
		inputField.focus();
	}
}


function renderGUI(){

	//Render location
	console.log("redner GUi");
	locationDescription.innerHTML = "";
	actionLog.innerHTML = "";
	locationName.innerHTML = map[player.location];
	image.src ="images/" + mapImages[player.location];

	updateMap();
	updateLocationInfo();

	//display items in the location if any
	/*
	for(var i = 0; i < locations[player.location].locItems.length; i++)
	{
		gameMessage += "<br> You see a <strong>" + locations[player.location].locItems[i].name + "</strong> here.";
	} */

	updateInventory();
	

	//Display message
	locationDescription.innerHTML = currentLocation().texts.description;
	actionLog.innerHTML += "<br> <em>" + gameMessage +"</em>";



}



function updateLocationInfo()
{
	locationItemList.innerHTML = "";
	poiList.innerHTML = "";

	//Draw location itemslist
	for(var i = 0; i < locations[player.location].locItems.length; ++i)
	{
		locationItemList.innerHTML +=  "<li>" + currentLocation().locItems[i].name + " </li>";
	}
	//Draw location points of interest list
	for(var i = 0; i < currentLocation().pointsOfInterest.length; ++i)
	{
		poiList.innerHTML += "<li>" + currentLocation().pointsOfInterest[i].name + "</li>";
	}
}


function updateInventory()
	{
		playerInventoryGUI.innerHTML = " <h3> Reppu: </h3>";

	if(player.inventory.length !== 0)
	{
		for (var i = 0; i < player.inventory.length; i++)
		{
			playerInventoryGUI.innerHTML +=  " <li>" + player.inventory[i].name + "</li>";
		}
	}
	}



Location.prototype.removeItem = function(itemIndex)
{
	console.log(this.locItems[itemIndex].name + " removed from " + this.name);
	this.locItems.splice(itemIndex,1);
}

Location.prototype.addItem = function(item)
{
	console.log("added item: " + item.name + this.name );
	item.location = this.number;
	this.locItems.push(item);
}


function takeItem()
{
	//Find the index number of the item

	var itemIndex = locations[player.location].locItems.findIndex(i => i.name === interactItem);

	console.log(itemIndex + " itemindex");

	if(itemIndex !== -1)
	{
		gameMessage += "<span class='picked'> [" + playerInput + "] </span>: Poimit tavaran " + "<strong>"+ interactItem+"</strong>";

		//Add the item to players backback
		player.inventory.push(locations[player.location].locItems[itemIndex]);
		locations[player.location].locItems[itemIndex].location = "inventory";
		console.log(interactItem + " added to backpack");

		//remove item from the gameworld
		locations[player.location].removeItem(itemIndex);

		//items.splice(itemIndex, 1);
		//location[map.splice(itemIndex,1);
	}
	
	else
	{
		gameMessage += "[" + playerInput + "]: Tavaraa ei löytynyt!";
	}

}

function showHelp(){
	gameMessage = "";
	gameMessage +=	'<div id="helpDiv">';
	gameMessage += '<h3> Toiminnot</h3>';
	gameMessage += ' <ul>';
	gameMessage +=	'<li> Arrow Keys: Move to the Direction </li>';
	gameMessage +=	'<li><i> Look </i> + <i>"target"</i>(optional) - Looks at something.</li>'
	gameMessage +=	'<li><i> Take </i> + <i>"item name"</i> - Takes the item from the ground </li>'
	gameMessage +=	'<li><i> Drop </i> + <i>"item name"</i> - Drops the item to the locatiion </li>'
	gameMessage +=	'<li><i> Inspect </i> + <i>"item name"</i> - Inspects the item.'
	gameMessage +=	'<li><i> Use </i> + <i>"item name"</i> - Uses the item. </li>'
	gameMessage +=	'</ul>'
	gameMessage +=	'</div>'	
}

function look(lookTarget){

	console.log(lookTarget);

	if(lookTarget)
	{
		if(lookTarget.location === currentLocation().number)
			{
				gameMessage = "Look: [ <strong>" + lookTarget.name + "</strong>]: " + lookTarget.text;
1
				if(lookTarget.name.toLowerCase() === "romukasa" && player.inventory.findIndex(i => i.name === "amuletti") === -1)
				{

					var indexOfAmuletti = currentLocation().locItems.findIndex(i => i.name === "amuletti");

					if(indexOfAmuletti === -1)
					{
					console.log(lookTarget);
					console.log("lisättiin itemi");
					currentLocation().addItem({
								name: "amuletti",
								description: "Oudosta materiaalista valmistettu kaulakoru, joka muistuttaa päätä.",
								weight: 2,
								location: 0 });
					}

	
				}





			}
			else
			{
				gameMessage = "Cant find anything like that here.";
			}
	}
	else
	{
		gameMessage = "Look: [<strong>"+currentLocation().name + "</strong>] " + currentLocation().texts.look;
	}
}


function inspectItem(interactItem)
{
	var knownItems = player.inventory.concat(currentLocation().locItems);
	console.log(knownItems);
	var  itemIndex = knownItems.findIndex(i => i.name === interactItem); 
	if(itemIndex === -1)
	{
		gameMessage = "Cant see item " + interactItem + "!"
	}
	else{
		gameMessage = "Item " + knownItems[itemIndex].name +  ":" + knownItems[itemIndex].description;
	}
}

function useItem()
{

	var  itemIndex = player.inventory.findIndex(i => i.name === interactItem); 

	if(itemIndex === -1)
	{
		gameMessage = "You're not carrying item called: " + interactItem;
	}


	if(player.inventory.length === 0)
	{
		gameMessage += " Your backpack is empty";
	}


	if(itemIndex !== -1)
	{

		switch(interactItem)
		{
			case "haulikko":
		
			if(player.inventory.findIndex(i => i.name === "patruunat") === -1)
			{
				gameMessage = "Sinulla ei ole <em>patruunoita</em>, joten tämä kapistus on turhake.";
			}

			else if(player.location === 4)
			{
				gameMessage = "Ammuit Naapurisi, nyt poliisit ovat perässä!";
			}
			else{
					gameMessage = "Ammut haulikolla";
			}
			break;




			case "autonavaimet":
			if(player.location === 4)
			{
				gameMessage = "Käynnistit autosi autokuntoon!";
				player.inventory.splice(itemIndex,1);
			}

			break;

			case "mato-onki":
			if(player.location === 2)
			{
				console.log(player.inventory);
				if(player.inventory.findIndex(i => i.name === "kirjolohi") === -1)
				{
					gameMessage = "Kalastit ja nappasit suuren kirjolohien!";
					player.inventory.push({name:"kirjolohi",description: "Tuore kirjolohi, kelpaa syötäväksi", weight:2,location:"inventory"});
				}
				else{
					gameMessage = "Nappasit kalan, mutta sinulla on jo kala, joten päästit sen pakoon."
				}

			}

			else{
				gameMessage = "Täällä ei voi kalastaa";
			}
			break;




			case "kirjolohi":

			if(player.location === 3)
			{
				gameMessage = "Annoit kalan koiralle. Hyvä idea! Nyt koira on iloinen <3! Koira toi sinulle lahjaksi" +
				 "<strong> haulikon patruunoita. </strong> <em> Patrunaat lisätty reppuusi </em> ";

				player.inventory.push({name:"patruunat", weight: 2, description: "Hyviä kuteja haulikkoon. Näitä on loputtomasti."});

				player.inventory.splice(itemIndex,1);
			}
			else{
				gameMessage = "Heiluttelet kalaa ympäriinsä ilman tuloksia.";
			}
			break;


		}
	}		
}


//Returns the location object of player's current location
function currentLocation() 
{
	return locations[player.location];
}


function dropItem(dropName)
{
	if(player.inventory.length !== 0)
	{

		var inventoryIndex = player.inventory.findIndex(i => i.name === dropName);

		console.log("inventory index drop: " + inventoryIndex)

		if(inventoryIndex !== -1)
		{
			
			gameMessage += "[" + playerInput + "]: Pudotit tavaran <strong>"+ interactItem+"</strong>";

			currentLocation().addItem(player.inventory[inventoryIndex]);
			player.inventory.splice(inventoryIndex,1);
		}

		else
		{
			gameMessage += "[" + playerInput + "]: Tavaraa ei löytynyt!";
		}
	}
		else{
			gameMessage += "[" + playerInput + "]: Sinulla ei ole mitään!";
		}

}


function dropAllItems(){
	if(player.inventory.length !== 0)
	{
		for(var i = 0; i <= player.inventory.length; ++i)
		{
			dropItem(player.inventory[i].name);
		}
	}
	else{
		gameMessage = "Your inventory is empty."
	}
}


function updateMap()
{

	for(var i = 0; i < 3; ++i)
	{
		for(var j = 0; j < 3; j++)
		{
		mapTable.rows[i].cells[j].style.backgroundColor = '';
		}
	}

	var row = Math.floor(player.location / 3);
	var column = player.location % 3;
	locationCell = mapTable.rows[row].cells[column];
	locationCell.style.backgroundColor = 'red';
	console.log(mapTable);
}



function initGame(){

	console.log("Game initalized");
	initPointsOfInterest();
	initializeItems();
	initializeLocations();
}

	
/*
*DEBUG
*/

function printLocationInfos()
{
	for (var i = 0; i < locations.length; ++i)
	{
		var itemText = "";
		if(locations[i].locItems.length != 0)
		{
			for(var j = 0; j < locations[i].locItems.length; j++)
			{
				itemText += locations[i].locItems[j].name + " / ";
			}
		}
		console.log("Location  " +  locations[i].number + " - " + locations[i].name + ": " + " items: " + itemText);
	}
}


