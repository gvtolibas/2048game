// console.log("Hello World");

//variables - stores a specific value/represents a specific value
//let - allows the values of our variables to be change
let board;
let score = 0;
let rows = 4;
let columns = 4;

let startX = 0;
let startY = 0;

// default existence states of tile 2048, 4096, 8192
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// function to set the board game of the tile with the help of updateTile() function to set looks / display of the tile
function setGame(){

	// Backend board
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	// Loop (for loop) - repeat task
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			// Creates a div element for the tile/s
			let tile = document.createElement("div");
			// <div> </div>
			// We addded an id to tile based on its seat position (row and column position)
			tile.id = r.toString() + "-" + c.toString();
			// We retrieve the number of the tile from our backend board
			let num = board[r][c];

			updateTile(tile,num); // calls the updateTile function
			// The title element (div element) and the other number inside the tile will be used to update the looks or display of the tile
			document.getElementById("board").append(tile);
		}
	}
	setTwo();
	setTwo();
}

// Responsible to update the looks of the tile
function updateTile(tile, num){
	tile.innerText = "";
	tile.classList.value = "";

	// Adds a class named "tile" to the tile element (div element)
	tile.classList.add("tile");
	// <div class="tile"> </div>

	if(num > 0){

		// Display the number of the tile to the element
		tile.innerText = num.toString();

		// 
		if(num <= 4096){
			tile.classList.add("x" + num.toString());
			// <div class="tile x2"> </div>
		}
		else {
			tile.classList.add("x8192");
			// <div class="tile x8192"> </div>
		}
	}

}

window.onload = function(){
	setGame();
}

function handleSlide(event){

	console.log(event.code);
	// .code represents the key being pressed during the event

	event.preventDefault();

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)){

		if(event.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if(event.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if(event.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if(event.code == "ArrowDown"){
			slideDown();
			setTwo();
		}
	}

	document.getElementById("score").innerText = score;

	setTimeout(() => {
		if(hasLost()){
			alert("Game Over! You have lost the game. Game will restart.");
			restartGame();
			alert("Click any arrow key to restart")
		}
		else {
			checkWin();
		}
	}, 100); // delay time in milliseconds

}

document.addEventListener("keydown", handleSlide);


function filterZero(tiles){
	return tiles.filter(num => num!=0);
}

// default behavior of merging tiles
function slide(tiles){

	// slide function will use filterZero function
	tiles = filterZero(tiles);

	for(let i = 0; i < tiles.length - 1; i++){
		if(tiles[i] == tiles[i+1]){
			tiles[i] *= 2;
			tiles[i+1] = 0;
			score += tiles[i]; // adds the merged tile to the score
		}
	}
	tiles = filterZero(tiles);

	// loop (while loop) - repeats task
	while(tiles.length < columns){
		tiles.push(0)
	}

	return tiles;
}

function slideLeft(){
	// console.log("sliding the tiles to the left");

	for(let r = 0; r < rows; r++){
		let row = board[r];

		// line for animation
		originalRow = row.slice(); // documents the original tile before sliding

		row = slide(row);
		board[r] = row;

		for(let c = 0; c < columns; c++){

			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			// line for animation
			if(originalRow[c] !== num && num !== 0){
				tile.style.animation = "slide-from-right 0.3s"; // 300ms
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);

			}

			updateTile(tile, num);
		}
	}
}

function slideRight(){
	// console.log("sliding the tiles to the right");
	for(let r = 0; r < rows; r++){
		let row = board[r];
		row.reverse(); // <-- added

		// line for animation
		originalRow = row.slice(); // documents the original tile before sliding

		row = slide(row);
		row.reverse(); // <-- added
		board[r] = row;

		for(let c = 0; c < columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			// line for animation
			if(originalRow[c] !== num && num !== 0){
				tile.style.animation = "slide-from-left 0.3s"; // 300ms
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);

			}

			updateTile(tile, num);
		}
	}
}

function slideUp(){
	for(let c = 0; c < columns; c++){
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

		// line for animation
		originalCol = col.slice(); // documents the original tile before sliding

		col = slide(col);

		for(let r = 0; r < rows; r++){
			board[r][c] = col[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			// line for animation
			if(originalCol[r] !== num && num !== 0){
				tile.style.animation = "slide-from-bottom 0.3s"; // 300ms
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);

			}

			updateTile(tile, num);
		}
	}
}

function slideDown(){
	for(let c = 0; c < columns; c++){
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
		col.reverse();

		// line for animation
		originalCol = col.slice(); // documents the original tile before sliding

		col = slide(col);
		col.reverse();

		for(let r = 0; r < rows; r++){
			board[r][c] = col[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			// line for animation
			if(originalCol[r] !== num && num !== 0){
				tile.style.animation = "slide-from-top 0.3s"; // 300ms
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);

			}

			updateTile(tile, num);
		}
	}
}

function hasEmptyTile(){

	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			if(board[r][c] == 0){
				return true;
			}
		}
	}

	return false;
}



function setTwo(){

	// if it cannot find an empty tile ...
	if(hasEmptyTile() == false){
		return; // no need to do anything (no need to generate a new tile)
	}

	let found = false;

	while(!found){
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if(board[r][c] == 0){
			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");
			found = true;
		}
	}
}

function checkWin(){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You got the 2048!");
				is2048Exist = true;
			}
			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You are Unstoppable at 4096! Fantastic!");
				is4096Exist = true;
			}
			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! Awesome!");
				is8192Exist = true;
			}
		}
	}
}

function hasLost(){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			// if the board has an empty tile, false means, the user is not yet lost
			if(board[r][c] == 0){
				return false;
			}

			const currentTile = board[r][c];

			// if the board has the same adjacent tile, false means, the user is not yet lost
			if(
				r > 0 && currentTile === board[r-1][c] || // this will check if it has a match to the upper adjacent tile
				r < rows - 1 && currentTile === board[r+1][c] || // this will check if it has a match to the lower adjacent tile
				c > 0 && currentTile === board[r][c-1] || // this will check if it has a match to the left adjacent tile
				c < columns - 1 && currentTile === board[r][c+1] // this will check if it has a match to the right adjacent tile
			){
				return false;
			}
		}
	}
	// No empty tiles, and no possible moves left, meaning true. The user has lost.
	return true;
}

function restartGame(){
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	score = 0;

	setTwo();
}

document.addEventListener("touchstart", (event) => {
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
})

document.addEventListener("touchend", (event) => {
	if(!event.target.className.includes("tile")){
		return; // exit the function
	}

	let diffX = startX - event.changedTouches[0].clientX;
	let diffY = startY - event.changedTouches[0].clientY;
	
	if(diffX != 0 && diffY !== 0){
		if(Math.abs(diffX) > Math.abs(diffY)) {
			if(diffX > 0) {
				slideLeft();
				setTwo();
			}
			else {
				slideRight();
				setTwo();
			}
		}
		else {
			if(diffY > 0) {
				slideUp();
				setTwo();
			}
			else {
				slideDown();
				setTwo();
			}
		}
	}

	document.getElementById("score").innerText = score;

	setTimeout(() => {
		if(hasLost()){
			alert("Game Over! You have lost the game. Game will restart.");
			restartGame();
			alert("Click any arrow key to restart")
		}
		else {
			checkWin();
		}
	}, 100); // delay time in milliseconds
	
})