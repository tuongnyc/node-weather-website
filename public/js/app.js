
// fetch data from this url, then do something.
/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    // get that parsed data
    response.json().then((data) => {
        console.log(data);
    })
})*/



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// target class .className
// target id #idName
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();  // prevent refresh the browser.

    // get the value.
    const location = search.value;

    messageOne.textContent = "Loading weather information...";
    messageTwo.textContent = "";
    // client side javascript.
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageTwo.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                /*console.log(data.location);
                console.log(data.forecast);*/
            }
        })
    })
})
