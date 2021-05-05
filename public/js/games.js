const searchGame = async (e) => { console.log('search-game')
    const search = document.querySelector('#gamesInput').value
    const response =  await fetch('/api/getGame/' + search, {
        method: 'GET',
       
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
}

document.querySelector('#searchBtn').addEventListener('click', searchGame)
