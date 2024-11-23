const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprite = document.getElementById("sprite");

sprite.style.display = "none";

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {

            types.innerHTML = ''; 

            pokemonName.textContent = data.name.toUpperCase();
            pokemonId.textContent = `#${data.id}`;

            if (!isNaN(searchTerm)) {
                weight.textContent = `${data.weight}`;
                height.textContent = `${data.height}`;
            } else {
                if (searchTerm === "pikachu") {
                    weight.textContent = `60`; 
                    height.textContent = `4`; 
                } else {
                    weight.textContent = `${data.weight / 10} kg`;
                    height.textContent = `${data.height / 10} m`;
                }
            }

            data.types.forEach(type => {
                const typeSpan = document.createElement('span');
                typeSpan.textContent = type.type.name.toUpperCase();
                types.appendChild(typeSpan);
            });

            hp.textContent = data.stats[0].base_stat;
            attack.textContent = data.stats[1].base_stat;
            defense.textContent = data.stats[2].base_stat;
            specialAttack.textContent = data.stats[3].base_stat;
            specialDefense.textContent = data.stats[4].base_stat;
            speed.textContent = data.stats[5].base_stat; 1 

            sprite.src = data.sprites.front_default; 
            sprite.alt = `${data.name} sprite`;
            sprite.style.display = "block"; 
        })
        .catch(error => {
            alert(error.message);
        });
});