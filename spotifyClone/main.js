const client_id = '2089a42e2e184a6b9174b8373ba2c20c';
const client_secret = 'fa1ba76689a342eaa6f045ca1a90bf0a';
let token = '';
let tracks = [];
let currentTrackIndex = 0;
const audioElement = new Audio(); 

async function fetchToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    token = data.access_token;
}

async function searchTracks(query) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await response.json();
    tracks = data.tracks.items; 
    displayTracks(tracks);
}

function displayTracks(trackList) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    trackList.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('col-md-3', 'mb-4');
        trackElement.innerHTML = `
            <div class="card h-100">
                <img src="${track.album.images[0].url}" class="card-img-top" alt="${track.name}">
                <div class="card-body">
                    <h5 class="card-title">${track.name}</h5>
                    <p class="card-text">${track.artists[0].name}</p>
                </div>
            </div>
        `;

        // Add click event to play the track in the bottom player
        trackElement.addEventListener('click', () => {
            currentTrackIndex = index; 
            playTrack(track);
        });

        resultsContainer.appendChild(trackElement);
    });
}

function playTrack(track) {
    audioElement.src = track.preview_url;
    audioElement.play();
    updatePlayerUI(track);

    audioElement.addEventListener('timeupdate', () => {
        updateSeekBar();
    });
}

function updatePlayerUI(track) {
    document.querySelector('.current-track').textContent = `${track.name} - ${track.artists[0].name}`;
    document.querySelector('.play-btn i').classList.remove('fa-play');
    document.querySelector('.play-btn i').classList.add('fa-pause');
}

document.querySelector('.play-btn').addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        document.querySelector('.play-btn i').classList.remove('fa-play');
        document.querySelector('.play-btn i').classList.add('fa-pause');
    } else {
        audioElement.pause();
        document.querySelector('.play-btn i').classList.remove('fa-pause');
        document.querySelector('.play-btn i').classList.add('fa-play');
    }
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(tracks[currentTrackIndex]);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(tracks[currentTrackIndex]);
});

document.querySelector('.seek-bar').addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

function updateSeekBar() {
    const seekBar = document.querySelector('.seek-bar');
    seekBar.value = (audioElement.currentTime / audioElement.duration) * 100;
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchSong').value;
    if (query) {
        searchTracks(query);
    }
});

fetchToken();
