var bot = document.querySelector('#recarregar');

bot.addEventListener("click", function() {location.reload();});

const cartas = document.querySelectorAll('.carta');

cartas.forEach(carta => carta.addEventListener('click', virarCarta));

let cartaVirada = false;
let travarTabuleiro = false;
let primeira, segunda;

//vira a carta quando é clicada e verifica se é a primeira ou a segundo, caso seja a primeira não faz nada, se for a segunda chama outra função para verificar se são iguais
function virarCarta() {
  if (travarTabuleiro) return;
  if (this === primeira) return;

  this.classList.add('flip');

  if (!cartaVirada) {
    primeira = this;
    cartaVirada = true;

  } else {
    segunda = this;
    correspondencia();
  }
}

//confere se as imagens são iguais com base nas classes, se  forem, chama o resetar para manter as cartas viradas, se não desvirar para virar as cartas para baixo
function correspondencia() {
  let bate = primeira.classList[1] === segunda.classList[1];

  bate ? resetarCartas() : desvirarCarta();
}

//mantém as cartas viradas para cima caso sejam correspondentes e limpa as variaveis com o resetarTabuleiro()
function resetarCartas() {
  primeira.removeEventListener('click', virarCarta);
  segunda.removeEventListener('click', virarCarta);

  resetarTabuleiro();
}

//evita temporariamente que mais de duas cartas sejam viradas e reverte a virada das cartas caso não sejam iguais
function desvirarCarta() {
  travarTabuleiro = true;

  setTimeout(() => {
    primeira.classList.remove('flip');
    segunda.classList.remove('flip');

    resetarTabuleiro();
  }, 1200);
}

//"zera" as variaveis para que possam ser usadas novamente da proxima vez que clicarem numa carta
function resetarTabuleiro() {
  [cartaVirada, travarTabuleiro] = [false, false];
  [primeira, segunda] = [null, null];
}

//atribui uma posição para cada carta 
(function embaralhar() {
  cartas.forEach(carta => {
    let posicao = Math.floor(Math.random() * 16);
    carta.style.order = posicao;
  });
})();
