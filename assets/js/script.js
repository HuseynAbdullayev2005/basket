const cards = document.querySelector(".cards")
const basket = document.querySelector(".basket")

let basket_elements = JSON.parse(localStorage.getItem("key")) || []

let count = 0
async function getAll() {
    const response = await fetch("https://fakestoreapi.com/products/category/jewelery");
    const data = await response.json();
    console.log(data);
}
async function generateCards() {
    const response = await fetch("https://fakestoreapi.com/products/category/jewelery");
    const data = await response.json();
    data.forEach(element => {
        let newCard = document.createElement("div")
        newCard.classList.add("card");
        newCard.innerHTML = ` <div class="card_image">
                    <img src=${element.image} alt="sekil">
                </div>
                <div class="card_name">
                    <h3>name:</h3>
                    <p>${element.title}</p>
                </div>
                <div class="card_desc">
                    <h3>Description:</h3>
                    <p>${element.description}</p>
                </div>
                <div class="card_button">
                <button class="inc_button">+</button>
                <button class="add_button">0</button>
                <button class="dec_button">-</button>
                </div>
           
       `


        const dec_button = newCard.querySelector(".dec_button")
        const inc_button = newCard.querySelector(".inc_button")
        const add_button = newCard.querySelector(".add_button")

        dec_button.addEventListener("click", function () {
            let number = parseInt(add_button.textContent)
            add_button.textContent = parseInt(add_button.textContent) - 1
        })
        inc_button.addEventListener("click", function () {
            add_button.textContent = parseInt(add_button.textContent) + 1
        })
        add_button.addEventListener("click", function () {
            basket_elements.push(element)

            console.log(basket_elements);
            basket_elements.forEach(x => {
                let number = parseInt(add_button.textContent)
                for (i = 0; i < number; i++) {
                    let new_basket_element = document.createElement("div")
                    new_basket_element.classList.add("new_basket_element")
                    new_basket_element.innerHTML += `<div class="card_image">
            <img src=${x.image} alt="sekil">
        </div>
        <div class="card_name">
            <h3>name:</h3>
            <p>${x.title}</p>
        </div>
        <div class="card_desc">
            <h3>Description:</h3>
            <p>${element.description}</p>
        </div>
       
   
`
                    localStorage.setItem("key", JSON.stringify(basket_elements));
                    basket.append(new_basket_element)
                    basket_elements.shift();
                }
            })
        })
        cards.append(newCard)
    });
}
generateCards();