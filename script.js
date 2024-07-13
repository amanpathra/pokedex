const table = document.querySelector('.table')
// const cards = document.querySelectorAll('.card')

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const pokemonCount = 150;


(async () => {
    for(let i=1; i<=pokemonCount; i++){
        await getPokemon(i)
    }
})()

async function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    let response = await fetch(url)
    let data = await response.json()
    // console.log(data)
    createPokeCard(data)
}

function createPokeCard(data){
    const card = document.createElement('div')
    card.classList.add('card')
    
    let name = data.name[0].toUpperCase() + data.name.slice(1)
    let pokeid = data.id.toString().padStart(3, '0')

    const poke_types = data.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    card.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeid}.png" alt="">
    <span class="pokeid">#${pokeid}</span>
    <span class="name">${name}</span>
    <span class="type">Type: ${type}</span>
    `

    table.append(card)
}