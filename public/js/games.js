const gameInput = document.querySelector('#gamesInput').value
const gameName = document.querySelector('.gameName')
const gameBox = document.querySelector('.gameDiv')
const chBtn = document.querySelector('.choiceBtn')
const chBtn2 = document.querySelector('.choiceBtn2')
const rightCol = document.querySelector('.rightColumn')
const leftCol = document.querySelector('.leftColumn')
chBtn.style.display = 'none'
chBtn2.style.display = 'none'

const searchGame = (e) => { console.log('search-game')
    const search = document.querySelector('#gamesInput').value
    $.get('/api/getGame/' + search, {
      }).then(res=>{ 
        gameName.textContent = res[0].name
        gameName.value = res[0].name
        chBtn.style.display = 'block'
        chBtn2.style.display = 'block'
        // chBtn.style.display = 'block'
        })
}
//Wish list
const addGameR = (e) => {
  e.preventDefault();
  let clickGame = gameName.value
  let gameTitle = document.createElement('h2')
  gameTitle.textContent = clickGame
  rightCol.append(gameTitle)
  }
  let action = {
    action: gameInput, 
    name: gameName.value
  }
  //Owned Games
  const addGameL = (e) => {
  
    e.preventDefault();
    let clickGame = gameName.value
    let gameTitle = document.createElement('h2')
    gameTitle.textContent = clickGame
     leftCol.append(gameTitle)
    }

  $.post('/api/saveGame/', action
  ).then(res=>{ 
    gameName.textContent = res[0].name
    chBtn.style.display = 'block'
    chBtn2.style.display = 'block'
    // chBtn.style.display = 'block'
    })

chBtn.addEventListener('click', addGameL)
chBtn2.addEventListener('click', addGameR)
document.querySelector('#searchBtn').addEventListener('click', searchGame)


