// Lista de emojis, cada um aparece duas vezes (pares)
const emojis = [
    "💩", "💩",
    "🙈", "🙈",
    "🐱", "🐱",
    "🦥", "🦥",
    "🐘", "🐘",
    "🎁", "🎁",
    "💎", "💎",
    "💵", "💵",
];

// Armazena temporariamente os dois cards abertos
let openCards = [];

// Função para embaralhar os emojis aleatoriamente (algoritmo Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Índice aleatório
    [array[i], array[j]] = [array[j], array[i]];   // Troca os elementos de lugar
  }
  return array;
}

// Cria uma nova lista embaralhada dos emojis
let shuffledEmojis = shuffle(emojis);

// Laço que cria os elementos de carta (divs) com os emojis embaralhados
for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");     // Cria uma div para cada card
    box.className = "card";                      // Adiciona a classe CSS "card"
    box.innerHTML = shuffledEmojis[i];           // Coloca o emoji como conteúdo
    box.onclick = handleCLick;                   // Adiciona o evento de clique
    document.querySelector(".game").appendChild(box); // Adiciona o card ao tabuleiro
}

// Função chamada quando um card é clicado
function handleCLick() {
    // Impede que cards já abertos ou pareados sejam clicados novamente
    if (this.classList.contains("boxOpen") || this.classList.contains("matched")) {
        return;
    }

    // Só permite abrir se menos de 2 cards estiverem abertos
    if (openCards.length < 2) {
        this.classList.add("boxOpen"); // Mostra visualmente o card virado
        openCards.push(this);          // Armazena o card clicado
    }

    // Se dois cards estiverem abertos, espera 1s e verifica se são iguais
    if (openCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Verifica se os dois cards abertos são um par
function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        // Se forem iguais, marca os dois como pareados
        openCards[0].classList.add("matched");
        openCards[1].classList.add("matched");
    } else {
        // Se forem diferentes, fecha os dois cards
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    // Limpa a lista de cards abertos para permitir novos cliques
    openCards = [];

    // Verifica se o jogador já encontrou todos os pares
    if (document.querySelectorAll(".matched").length === emojis.length) {
        setTimeout(() => {
            alert("Parabéns, você ganhou!"); // Exibe mensagem de vitória
        }, 500);
    }
}