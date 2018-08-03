function changeBackground() {
    // Array of backgrounds
    let backgrounds = [
        { name: 'White Sand Beach', author: 'Monica Silvestre', location: './img/white_beach_monica_silvestre.jpeg' },
        { name: 'Toronto', author: 'Next Voyage', location: './img/toronto_by_next_voyage.jpeg' },
        { name: 'Snow Covered Mountains by Lake', author: 'Ricardo Bresciani', location: './img/snow_mountains_by_ricardo_bresciani.jpeg' },
        { name: 'Boats', author: 'Callebe Miranda', location: './img/boats_by_callebe_miranda.jpeg' }
    ];

    // Get current date
    let date = new Date();
    let month, dayOfMonth, background;

    // Check if there is a date already in localStorage
    if (localStorage.getItem('backgroundMonth')) {
        // Grab the month and day from localStorage
        month = localStorage.getItem('backgroundMonth');
        dayOfMonth = localStorage.getItem('backgroundDay');

        // Check if the current day is equal to stored date
        if (month != date.getMonth() && dayOfMonth != date.getDate()) {
            setBackgroundData(date, backgrounds);
        }
    } else {
        setBackgroundData(date, backgrounds);
    }

    background = "url(" + localStorage.getItem('background') + ")";

    document.body.style.backgroundImage = background;    
}

// Function to set the new month, day, and background path
function setBackgroundData(currentDate, backgroundArray) {
    let randomNum = Math.floor(Math.random() * backgroundArray.length);

    localStorage.setItem('backgroundMonth', currentDate.getMonth());
    localStorage.setItem('backgroundDay', currentDate.getDate());
    localStorage.setItem('background', backgroundArray[randomNum].location);
    localStorage.setItem('backgroundName', backgroundArray[randomNum].name);
    localStorage.setItem('backgroundAuthor', backgroundArray[randomNum].author);
}

changeBackground();