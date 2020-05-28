import { API } from './api.js';
import * as UI from './ui.js';

UI.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;

    // Checking that the form fields are not empty
    if (artist === '' || song === '') {
        // If the form fields are empty show error message
        UI.messages.innerHTML = 'The fields are empty, fill out the form and send it again.';
        UI.messages.classList.add('error');
        setTimeout(() => {
            UI.messages.innerHTML = '';
            UI.messages.classList.remove('error');
        }, 3000);
    } else {
        // If the form fields are complete, consult the API
        const api = new API(artist, song);
        api.checkAPI()
            .then(data => {
                if (data.response.lyrics) {
                    // The song exists
                    const lyrics = data.response.lyrics;
                    UI.result.textContent = lyrics;
                } else {
                    // The song doesn't exist
                    UI.messages.innerHTML = 'The song you are trying to find does not exist, check that the fields are complete correctly and try again.';
                    UI.messages.classList.add('error');
                    setTimeout(() => {
                        UI.messages.innerHTML = '';
                        UI.messages.classList.remove('error');
                        UI.searchForm.reset();
                    }, 3000);
                }
            });
    }

});