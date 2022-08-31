const pokeCard = document.querySelector('[pokeCard]');
const pokeName = document.querySelector('[nombrePokemon]');
const pokeImg = document.querySelector('[imgPokemon]');
const pokeId = document.querySelector('[idPokemon]');
const pokeTypes = document.querySelector('[tiposPokemon]');
const pokeHp = document.querySelector('[pokemonHP]');
const PokeAtk = document.querySelector('[pokemonAtk]');
const pokeDef = document.querySelector('[pokemonDef]');
const PokeSp = document.querySelector('[pokemonSP]');
const PokeSd = document.querySelector('[pokemonSD]');
const PokeSpeed = document.querySelector('[pokemonSpeed]');

const defaultValue = 1;

const buscarPokemon = event =>{
    event.preventDefault();
    const { value } = event.target.pokeBusqueda;
    if(value == ""){
        pokeImg.setAttribute('src', "./pika.png")
        pokeId.textContent = `#000`;
        pokeName.textContent = `Nombre: N/A`;
        pokeTypes.textContent = "NA/NA";
        pokeHp.textContent = `HP: 00`;
        PokeAtk.textContent = `Atk: 00`;
        pokeDef.textContent = `Def: 00`;
        PokeSp.textContent = `SP: 00`;
        PokeSd.textContent = `SD: 00`;
        PokeSpeed.textContent = `Speed: 00`;
    }
    else{
        fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            .then(data => data.json())
            .then(response => pokemonData(response))
    }
}

const pokemonData = data => {
    const {stats, types, sprites} = data;
    
    pokeImg.setAttribute('src', data.sprites.front_default)
    pokeId.textContent = `# ${data.id}`;
    pokeName.textContent = `Nombre: ${mayusInicial(data.name)} `;

    pokeHp.textContent = `HP: ${ data.stats[0].base_stat} `;
    PokeAtk.textContent = `ATK: ${ data.stats[1].base_stat} `;
    pokeDef.textContent = `DEF: ${ data.stats[2].base_stat} `;
    PokeSp.textContent = `SP: ${ data.stats[3].base_stat} `;
    PokeSd.textContent = `SD: ${ data.stats[4].base_stat} `;
    PokeSpeed.textContent = `Speed: ${ data.stats[5].base_stat} `;
    pokeTypes.textContent = "";
    for(var i = 0; i<= data.types.length -1; i++){
        pokeTypes.textContent += mayusInicial(data.types[i].type.name) + " ";
    }

    console.log(data);
}

function mayusInicial(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}