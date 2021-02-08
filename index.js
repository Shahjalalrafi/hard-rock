const searchSong = () => {
    const searchText = document.getElementById('search-input').value
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySong(data.data))
}

const displaySong = songs => {
    const songsDiv = document.getElementById('song-container')
    songs.forEach(song => {
        console.log(song)
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
                        <button onclick="getLyrics('${song.title}','${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songsDiv.appendChild(songDiv)
    })
}

const getLyrics = (artist, title) => {
    console.log(artist, title)
}