document.getElementById('search-input').addEventListener("keypress", function(event) {
    if (event.key == 'Enter')
    document.getElementById('search-btn').click();
});

const searchSong = async() => {
    const searchText = document.getElementById('search-input').value
    toggleSpinner()

    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySong(data.data))

    const res = await fetch(url)
    const data = await res.json()
    displaySong(data.data)
}

const displaySong = songs => {
    const songsDiv = document.getElementById('song-container')
    document.getElementById('song-container').innerHTML = ''
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/ogg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songsDiv.appendChild(songDiv)
        toggleSpinner()
    })
}

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/:${artist}/:${title}`
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayLyric(data.lyrics))
    }
    catch (error) {
        displayError('something wrong! please find your problem..')
    }
    // .catch(error => )
}

const displayLyric = lyric => {
    const lyricsDiv = document.getElementById('lyrics')
    lyricsDiv.innerText = lyric
}

const displayError = (error) => {
    const errormessage = document.getElementById('error')
    errormessage.innerText = error
}

const toggleSpinner = () => {
    const spinner = document.getElementById('spinner')
    const songs = document.getElementById('song-container')
    spinner.classList.toggle('d-none')
    songs.classList.toggle('d-none')

}
