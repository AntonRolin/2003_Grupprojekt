var prod;
var prodID;
var prodName;
var prodImage;

getProducts();

let searchBar = document.getElementById("search");
searchBar.setAttribute("onkeyup","searchDB(this);");

searchBar.value = "";


// Search function that creates elements if null, matches searchbar value with product db and adds them to a button dropdown with the products name and image.
function searchDB(searchBar) {
	let selector = document.getElementById("selector");

	if (searchBar.value.trim() !== "") {
		searchBar.classList.add("dropdown");
		if (selector == null) {
			selector = document.createElement("div");
			selector.id = "selector";
			selector.className = "row p-0 m-0 bg-light";
			searchBar.parentNode.appendChild(selector);
			selector.style.left = searchBar.getBoundingClientRect().left + "px";
			selector.style.top = searchBar.getBoundingClientRect().bottom + "px";
			selector.style.width = searchBar.getBoundingClientRect().width + "px";
		}

		selector.innerHTML = "";
		let empty = true;

		prod.forEach(e => {
			let productPressed = {
				name: e.name,
				image: e.image,
				id: e.id
			}
			prodName = productPressed[Object.keys(productPressed)[0]];

			if (prodName.toLowerCase().indexOf(searchBar.value.toLowerCase()) !== -1) {	
				let col = document.createElement("a");
				let image = document.createElement("img");
				let col1 = document.createElement("div");
				let col2 = document.createElement("div");
				col.className = "mybutton";
				col1.className = "col-sm-6 p-0 m-0 d-flex align-items-start flex-column";
				col2.className = "col-sm-6 p-0 m-0 d-flex flex-row-reverse";
				prodImage = productPressed[Object.keys(productPressed)[1]];
				image.className = "image";
				image.src = prodImage;
				console.log(prodName);
				image.style.width = "40px";
				col1.innerHTML=prodName;
				image.style.height = "50px";
				col.setAttribute("onclick",`goToProduct(${productPressed.id})`);
				col2.appendChild(image);
				selector.appendChild(col);
				col.appendChild(col1);
				col.appendChild(col2);
				empty = false;
			}
		});

		if (empty == true) {
			let col = document.createElement("div");
			col.className = "col-sm-12 p-0 m-0"
			let opt = document.createElement("button");
			opt.disabled = true;
			opt.innerHTML = "No results";
			col.appendChild(opt);
			selector.appendChild(col);
		}

	} else {
		if (selector !== null) {
			selector.parentNode.removeChild(selector);
			searchBar.classList.remove("dropdown");
		}
	}

	window.addEventListener('click', function(e){   
		if(e.target != selector && e.target != searchBar ) {
			if(selector.parentNode != null) {
				selector.parentNode.removeChild(selector);
				searchBar.value = "";
			}
		}
	});
}

// Event for button if the dropdown when clicked.
function insertValue(elem) {
	setProductID(elem.innerHTML);
	window.search.classList.remove("dropdown");
	console.log(prodID);
	window.location.href = "product.html?id="+prodID;
}
// Event for button if the dropdown when clicked.
function goToProduct(prodID) {
	setProductID(prodID);
	window.search.classList.remove("dropdown");
	console.log(prodID);
	window.location.href = "product.html?id="+prodID;
}


function getIdFromSearchbarItem(productName) {
	prod.forEach(e => {
		if(e.name == productName) {
			return e.id;
		}
	});
}

function getProducts() {
    fetch('productAPI.json')
    .then((response) => response.json())
    .then(function(data) {
        prod = data;
    })
}

function setProductID(productName) {
	prod.forEach(element => {
		if(element.name == productName) {
			prodID = element.id;
		}
	});
}