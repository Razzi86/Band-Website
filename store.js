/*
    CHECK IF DOCUMENT IS LOADED BEFORE TRYING TO ACCESS THE DIFFERENT PARTS OF IT
    VERY IMPORTANT
    IF DOMContentLoaded, call Ready()
*/
if (document.readyState == 'loading') {
    // wait until the page is loaded, and call ready
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/*
    ALL THE EVENT LISTENERS FOR ELEMENTS ALREADY LOADED INTO THE DOCUMENT
*/
function ready() {
    // removeCartItemButtons is all the elements with the class "button-danger" (has a button to remove)
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    // loop through all the cart items, if a button has been clicked then call removeCartItem()
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // quantityInputs is all the elements with the class "cart-quantity-input" (an adjustable quantity)
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    // loop through all the quantity inputs, if one has been changed then call quantityChanged()
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // addToCartButtons is all the elements with the "shop-items-button" class (add to cart button)
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    // loop through all the addToCartButtons, if one has been clicked then call addToCartClicked()
    for (var i = 0; i < addToCartButtons.length; i++) { 
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // when the purchase button is clicked, call purchaseClicked()
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

/*
    EVENTS HANDLERS
    event.target is the element which caused the event handler to fire
*/

function removeCartItem(event) {
    var buttonClicked = event.target
    // the button's parent is the column, the parent's parent is the entire row. Remove that when the remove button is clicked
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    // check if quantity is 0 or negative, both shouldn't be possible
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    // when a product is added, the row needs the following elements to be added
    var shopItem = button.parentElement.parentElement // the div holding image, title, price
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function purchaseClicked() {
    alert("Thank you for your purchase")
    // loops through all rows and remove them until it is empty
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


/*
    EVENT HANDLER: HELPER METHODS
*/

function addItemToCart(title, price, imageSrc) {
    // create div (row) for cart item
    var cartRow = document.createElement('div')
    // need to add the class of cart-row to our cart-row
    cartRow.classList.add('cart-row')
    // add cart row to end of cart items
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    // loop through cartItems and see if the title is already there, if so don't add and alert
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already inside your cart')
            return
        }
    }
    // allows flexibility to directly append cartItems from the HTML with ${}
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width = 100>
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    /*
        WHEN NEW ELEMENTS ARE ADDED, HOOK UP ALL EVENT LISTENERS TO THOSE NEW ELEMENTS
        ALSO VERY IMPORTANT
    */

    // new items can be removed
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // new quantities affect price
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    // get the cart-items div (wraps all items)
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // get all rows within the cart-items container
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    // loop over cart-rows and get the price
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // get value inside the priceElement (innertext is the text in the element). Remove '$'
        // parseFloat turns a string into a number
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        // .value because its an input
        var quantity = quantityElement.value
        console.log(price * quantity)
        total = total + (price * quantity)
    }
    // vv computers can't divide/multiply floating point numbers with 100% accuracy
    // so sometimes the float decimal numbers are really long (rounding error)
    total = Math.round(total * 100) / 100 // rounds to nearest 2 decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
