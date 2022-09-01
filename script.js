const pokeCard = document.querySelector('[pokeCard]');
const pokeNombre = document.querySelector('[nombrePokemon]');
const pokeImg = document.querySelector('[imgPokemon]');
const pokeId = document.querySelector('[idPokemon]');
const pokeTipos = document.querySelector('[tiposPokemon]');
const pokeHp = document.querySelector('[pokemonHP]');
const PokeAtk = document.querySelector('[pokemonAtk]');
const pokeDef = document.querySelector('[pokemonDef]');
const PokeSp = document.querySelector('[pokemonSP]');
const PokeSd = document.querySelector('[pokemonSD]');
const PokeSpeed = document.querySelector('[pokemonSpeed]');
const defaultValue = 1;


const catalogoColores = {
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    grass: '#4A9681',
    electric: '#FFEA70',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F'
}

const catalogoTipos ={
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Hierba',
    electric: 'Eléctrico',
    ice: 'Hielo',
    rock: 'Roca',
    flying: 'Volador',
    psychic: 'Psíquico',
    ghost: 'Fantasma',
    bug: 'Bicho',
    poison: 'Veneno',
    ground: 'Tierra',
    dragon: 'Dragón',
    steel: 'Metal',
    fighting: 'Luchador'
}

function valoresDefault(){
    pokeImg.setAttribute('src', "./pika.png")
    pokeId.textContent = `#000`;
    pokeNombre.textContent = `Nombre: No Encontrado`;
    pokeTipos.textContent = "NA/NA";
    pokeHp.textContent = `Vida: 00`;
    PokeAtk.textContent = `Atq: 00`;
    pokeDef.textContent = `Def: 00`;
    PokeSp.textContent = `Atq-Esp: 00`;
    PokeSd.textContent = `Def-Esp: 00`;
    PokeSpeed.textContent = `Velocidad: 00`;
    pokeImg.style.background = "";
}

const buscarPokemon = event =>{
    event.preventDefault();
    const { value } = event.target.pokeBusqueda;
    if(value == ""){
        valoresDefault();
    }
    else{
        fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            .then(data => data.json())
            .then(response => informacionPokemon(response))
            .catch( function(err){
                valoresDefault()
            });
    }
}

function informacionPokemon (data){
        const {stats, types, sprites} = data;
        pokeImg.setAttribute('src', sprites.front_default)

        pokeId.textContent = `# ${data.id}`;
        pokeNombre.textContent = `Nombre: ${mayusInicial(data.name)} `;

        pokeHp.textContent = `Vida: ${ stats[0].base_stat} `;
        PokeAtk.textContent = `Atq: ${ stats[1].base_stat} `;
        pokeDef.textContent = `Def: ${ stats[2].base_stat} `;
        PokeSp.textContent = `Atq-Esp: ${ stats[3].base_stat} `;
        PokeSd.textContent = `Def-Esp: ${ stats[4].base_stat} `;
        PokeSpeed.textContent = `Velocidad: ${ stats[5].base_stat} `;

        pokeTipos.innerHTML = "";

        colorTipos(types);
        colorFondo(types);
        console.log(data);
}

function colorTipos(types){
    types.forEach(type => {
        var texto = document.createElement("div");
        texto.style.color = catalogoColores[type.type.name];
        texto.textContent = catalogoTipos[type.type.name];
        pokeTipos.appendChild(texto);
    });
}

function colorFondo(types){
    const colorPrincipal = catalogoColores[types[0].type.name];
    const colorSecundario = types[1] ? catalogoColores[types[1].type.name] : catalogoColores.default;

    pokeImg.style.background = `radial-gradient(${colorSecundario} 33%, ${colorPrincipal} 33%)`
    pokeImg.style.backgroundSize = ' 5px 5px ';
}

function mayusInicial(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}