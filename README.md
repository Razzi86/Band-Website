# Mock Band-Website
A simple mock website for a band I listen to, made with HTML, CSS, and JavaScript.

# Universal Page Features:
- Home, Store, and About page navigation buttons redirect to different site pages
- YouTube, Spotify, and Instagram buttons redirect to the band's official pages

# The About Page
- Interactive Buttons
- CSS to properly format rows and their column elements
<img width="736" alt="Screen Shot 2022-12-22 at 2 38 44 PM" src="https://user-images.githubusercontent.com/75161978/209213234-2727fead-49d6-475a-bad1-6e26920ebf32.png">

# The Store Page
- Neat boxes contained in div's. Autoadjusts to different screen sizes (displays at max two store items for any screen size, shows just one for small screens)

<img width="690" alt="Screen Shot 2022-12-22 at 2 49 01 PM" src="https://user-images.githubusercontent.com/75161978/209214621-1aa05ed9-aa1f-416e-bc43-a631cc20a446.png"> <br />

- Every item can be added and removed from the cart
- When "add to cart" is clicked:
  - The div containing the image, title, and price is inserted into the "cart."
  - Doing so also updates the quantity and total price
- When the "remove" button is clicked:
  - The div containing the image, title, and price is removed from the "cart."
  - doing so also updates the quantity and total price
- When the "quantity" is increased or decreased:
  - It tests if the quantity is less than or equal to 0 and will automatically set it to 1 if true
  - Update the total price of the cart 
- When the "purchase" button is clicked:
  - Show an alert with the text "Thank you for your purchase" and loops through all the "cart-items" elements until empty
  
![Purchase_Example](https://user-images.githubusercontent.com/75161978/209221439-ea8f4935-da97-4e21-b89c-800abffa7af0.gif)

# The About Page
- Rounded image with text neatly wrapping around
- Image and texts autoadjusts to screen size, and maxes out to a certain amount of pixels to prevent unwanted visuals
<img width="782" alt="Screen Shot 2022-12-22 at 3 05 57 PM" src="https://user-images.githubusercontent.com/75161978/209217275-689b1f83-99f5-451f-954b-799646c7e311.png">

