var prod;
var prodId;
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
			searchBar.parentNode.appendChild(selector);
			// Position it below the input element
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
			
				let opt = document.createElement("button");
				opt.id = "optID";
				let image = document.createElement("img");

				prodImage = productPressed[Object.keys(productPressed)[1]]
				prodId = productPressed[Object.keys(productPressed)[2]]
				image.className = "image";
				image.src = prodImage;
				image.style.width = "40px";
				image.style.height = "50px";
				opt.setAttribute("onclick","insertValue();")
				opt.innerHTML = prodName;
				selector.appendChild(opt);
				opt.appendChild(image);
				empty = false;
			}
		});

		if (empty == true) {
			let opt = document.createElement("button");
			opt.id = "optID";
			opt.disabled = true;
			opt.innerHTML = "No results";
			selector.appendChild(opt);
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
				searchBar.value = ""
			}
			
		}
	});
}

// Event for button if the dropdown when clicked.
function insertValue() {
	window.search.classList.remove("dropdown");
	//elem.parentNode.parentNode.removeChild(elem.parentNode);
	window.location.href = "product.html?=" + prodId;
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
        prod.forEach(e => {
            populateProductColumns(e);
        });

    })
}

