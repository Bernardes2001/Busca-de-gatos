//Só executa quando o html carregar por completo
document.addEventListener('DOMContentLoaded', function (){
    // botao que vai buscar o conteudo do gato
    const button = document.getElementById("fetch-cat-button");
    // container exibir o gato
    const catContainer = document.getElementById("cat-container");
    //Carregar o conteudo 
    const loadingElement = document.getElementById("loading");

    async function fetchCat() {
        //removendo classes de div
        loadingElement.classList.remove("hidden");
        catContainer.innerHTML = "";

        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");

            const data = await response.json();

            if (data.length > 0) {
                // data[0] -> Acesando aprimeira posição da lista 
                const catUrl = data[0].url;

                const imgElement = document.createElement("img"); //criando tag
                imgElement.src = catUrl;
                imgElement.alt = "Gato aleatorio";
                imgElement.style.maxWidth = "400px";
                //imgElement.style.borderRadius = "8px"

                catContainer.appendChild(imgElement);
            } else {
                catContainer.innerText = "Não foi possível buscar gato"
            }
        } catch (error) {
            catContainer.innerHTML = "Ocorreu um erro ao buscar a imagem"
        } finally { //finally -> ele passa de qualquer maneira 
            loadingElement.classList.add("hidden");
        }
    }

    fetchCat();

    button.addEventListener("click", fetchCat);
});