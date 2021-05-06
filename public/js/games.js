
const gameName = document.querySelector('.gameName')
const gameBox = document.querySelector('.gameDiv')
const chBtn = document.querySelector('.choiceBtn')
const chBtn2 = document.querySelector('.choiceBtn2')
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
const addGame = (e) => {
  let action = {
    action: e.target.value, 
    name: gameName.value
  }


  $.post('/api/saveGame/', action
  ).then(res=>{ 
    gameName.textContent = res[0].name
    chBtn.style.display = 'block'
    chBtn2.style.display = 'block'
    // chBtn.style.display = 'block'
    })
}
chBtn.addEventListener('click', addGame)
chBtn2.addEventListener('click', addGame)
document.querySelector('#searchBtn').addEventListener('click', searchGame)


