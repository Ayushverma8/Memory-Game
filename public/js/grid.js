console.log("hi");
let tiles = {
	c1: document.querySelector('#c1'),
	c2: document.querySelector('#c2'),
	c3: document.querySelector('#c3'),
	c4: document.querySelector('#c4'),
	c5: document.querySelector('#c5'),
	c6: document.querySelector('#c6'),
	c7: document.querySelector('#c7'),
	c8: document.querySelector('#c8'),
	c9: document.querySelector('#c9')
}
let colors = {
	c1: '#FF0000',
	c2: '#00B0F0',
	c3: '#C55A11',
	c4: '#00B050',
	c5: '#7030A0',
	c6: '#767171',
	c7: '#FFFF00',
	c8: '#002060',
	c9: '#D806BF'
}

let button = document.querySelector('#button');
let n = 1;
let rStr;
let input;
let clickCount;

let ajax = new XMLHttpRequest();
ajax.addEventListener("load", reqListener = function() {
	console.log(JSON.parse(this.responseText)["level"]);
	n = JSON.parse(this.responseText)["level"];
	document.querySelector("#level").innerHTML = "Level " + n;
	ajax.removeEventListener("load", reqListener);
});
ajax.open("GET", "levels");
ajax.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
ajax.send();

let verify = function(input, rStr) {
	if (input === rStr) {
		n = n + 1;
		ajax.open("POST", "levels");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("level="+n);
		button.innerHTML = "<span></span>";
		for (let key in tiles) {
			if (tiles.hasOwnProperty(key)) {
				tiles[key].style.backgroundColor = '#14d159';
			}
		}
		setTimeout(function() {
			for (let key in tiles) {
				if (tiles.hasOwnProperty(key)) {
					tiles[key].style.backgroundColor = colors[key];
				}
			}
			button.innerHTML = "<span>Next</span>";
			document.querySelector("#level").innerHTML = "Level " + n;
		}, 1000);
	} else {
		button.innerHTML = "<span></span>";
		for (let key in tiles) {
			if (tiles.hasOwnProperty(key)) {
				tiles[key].style.backgroundColor = '#F41111';
			}
		}
		setTimeout(function() {
			for (let key in tiles) {
				if (tiles.hasOwnProperty(key)) {
					tiles[key].style.backgroundColor = colors[key];
				}
			}
			button.innerHTML = "<span>Retry</span>";
		}, 1000);
	}
};

let tileClick = function(numStr) {
	console.log("tile click" + numStr);
	input = input + numStr;
	if (input.length === rStr.length) {
		tiles.c1.removeEventListener('click', t1);
		tiles.c2.removeEventListener('click', t2);
		tiles.c3.removeEventListener('click', t3);
		tiles.c4.removeEventListener('click', t4);
		tiles.c5.removeEventListener('click', t5);
		tiles.c6.removeEventListener('click', t6);
		tiles.c7.removeEventListener('click', t7);
		tiles.c8.removeEventListener('click', t8);
		tiles.c9.removeEventListener('click', t9);
		tiles.c1.removeEventListener('mouseenter', tme1);
		tiles.c1.removeEventListener('mouseleave', tml1);
		tiles.c2.removeEventListener('mouseenter', tme2);
		tiles.c2.removeEventListener('mouseleave', tml2);
		tiles.c3.removeEventListener('mouseenter', tme3);
		tiles.c3.removeEventListener('mouseleave', tml3);
		tiles.c4.removeEventListener('mouseenter', tme4);
		tiles.c4.removeEventListener('mouseleave', tml4);
		tiles.c5.removeEventListener('mouseenter', tme5);
		tiles.c5.removeEventListener('mouseleave', tml5);
		tiles.c6.removeEventListener('mouseenter', tme6);
		tiles.c6.removeEventListener('mouseleave', tml6);
		tiles.c7.removeEventListener('mouseenter', tme7);
		tiles.c7.removeEventListener('mouseleave', tml7);
		tiles.c8.removeEventListener('mouseenter', tme8);
		tiles.c8.removeEventListener('mouseleave', tml8);
		tiles.c9.removeEventListener('mouseenter', tme9);
		tiles.c9.removeEventListener('mouseleave', tml9);
		for (let key in tiles) {
				if (tiles.hasOwnProperty(key)) {
					tiles[key].style.transform = 'scale(1)';
				}
		}
		verify(input, rStr);
	}
};

let letemrip = function() {
	//generate randomString;
	button.removeEventListener('click', letemrip);
	button.innerHTML = "<span></span>";
	rStr = generateRand(n);
	console.log(rStr);	
	console.log("button pressed");
	blinker(rStr);
	tiles.c1.addEventListener('click', t1 = function() {tileClick("1");});
	tiles.c2.addEventListener('click', t2 = function() {tileClick("2");});
	tiles.c3.addEventListener('click', t3 = function() {tileClick("3");});
	tiles.c4.addEventListener('click', t4 = function() {tileClick("4");});
	tiles.c5.addEventListener('click', t5 = function() {tileClick("5");});
	tiles.c6.addEventListener('click', t6 = function() {tileClick("6");});
	tiles.c7.addEventListener('click', t7 = function() {tileClick("7");});
	tiles.c8.addEventListener('click', t8 = function() {tileClick("8");});
	tiles.c9.addEventListener('click', t9 = function() {tileClick("9");});
	tiles.c1.addEventListener('mouseenter', tme1 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c1.addEventListener('mouseleave', tml1 = function() { this.style.transform = 'scale(1)'});
	tiles.c2.addEventListener('mouseenter', tme2 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c2.addEventListener('mouseleave', tml2 = function() { this.style.transform = 'scale(1)'});
	tiles.c3.addEventListener('mouseenter', tme3 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c3.addEventListener('mouseleave', tml3 = function() { this.style.transform = 'scale(1)'});
	tiles.c4.addEventListener('mouseenter', tme4 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c4.addEventListener('mouseleave', tml4 = function() { this.style.transform = 'scale(1)'});
	tiles.c5.addEventListener('mouseenter', tme5 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c5.addEventListener('mouseleave', tml5 = function() { this.style.transform = 'scale(1)'});
	tiles.c6.addEventListener('mouseenter', tme6 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c6.addEventListener('mouseleave', tml6 = function() { this.style.transform = 'scale(1)'});
	tiles.c7.addEventListener('mouseenter', tme7 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c7.addEventListener('mouseleave', tml7 = function() { this.style.transform = 'scale(1)'});
	tiles.c8.addEventListener('mouseenter', tme8 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c8.addEventListener('mouseleave', tml8 = function() { this.style.transform = 'scale(1)'});
	tiles.c9.addEventListener('mouseenter', tme9 = function() { this.style.transform = 'scale(0.9)'});
	tiles.c9.addEventListener('mouseleave', tml9 = function() { this.style.transform = 'scale(1)'});
	clickCount = 0;
	input = '';
	//for each, blink the thingy
	//wait for user response
};
button.addEventListener('click', letemrip);

var generateRand = function(n) {
	let s = '';
	for (let i = 1; i <= n; i++) {
		s = s +	(Math.floor(Math.random() * (9)) + 1);
	}
	return s;
};

var blinker = function(s) {
	for (let key in tiles) {
		if (tiles.hasOwnProperty(key)) {
			tiles[key].style.backgroundColor = '#cccccc';
		}
	}
	let tile;
	let time = 0;
	for (let i = 0; i < s.length; i++) {
		tile = 'c' + s.charAt(i);
		console.log(tile);
		setTimeout(function(tile) {
			tiles[tile].style.backgroundColor = colors[tile];
		}, time, tile);
		time = time + 500;
		setTimeout(function(tile) {
			tiles[tile].style.backgroundColor = '#cccccc';
		}, time, tile);
		time = time + 100;
	}
	setTimeout(function() {
		for (let key in tiles) {
			if (tiles.hasOwnProperty(key)) {
				tiles[key].style.backgroundColor = colors[key];
			}
		}
		button.addEventListener('click', letemrip);
		button.innerHTML = "<span>Retry</span>";
	}, time);
}
