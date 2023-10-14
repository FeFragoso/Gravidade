

 /*

 Importante lembra:

RELATIVIDADE

Antes considerávamos que a distância e o tempo entre os corpos eram os
mesmos, que somente a velocidade dos 2 corpos variava. Fazer dessa forma
acarreta em alguns problemas como a imprecisão da colisão dos corpos
conforme a distância entre eles diminui e o salto na sua posição aumenta.
Então mudamos a forma como representamos o universo fazendo com que
agora a distância e a velocidade entre os corpos sejam as mesmas, mas o
tempo não. Dessa forma, assumimos que o tempo passa diferente para cada
corpo a depender de sua massa. Então não temos aceleração na velocidade,
mas sim no tempo, em outras palavras dilatação do tempo.

------------------------------------------------------------------------

FORÇA GRAVITACIONAL ENTRE OS CORPOS
  
-> O corpo 1 sempre andará para esquerda (Left positivo);
-> O corpo 2 sempre andará para direita (Left negativo);

OBS: Não estamos considerando matéria escura;

Para que ambos sejam sempre verdade, independetes da massa, o corpo 1
sempre deverá estar à esquerda do corpo 2. Em outras palavras, a função
forca_gravitacional deverá sempre chamar o Corpo_1 com o Objeto a
esquerda do Corpo_2.

*/

// Variáveis universais
const G = 0.0001;

let Tempo;
let distancia;
let forca_gravitacional;

// Corpos
const Corpo_1 = document.querySelector('#M1');
const Corpo_2 = document.querySelector('#M3');


detecta_colisao(Corpo_1, Corpo_2);
calcula_distancia(Corpo_1, Corpo_2);
calcula_forca_gravitacional(Corpo_1, Corpo_2);


gravidade(Corpo_1, 1000,  1, distancia);
gravidade(Corpo_2, 1000, -1, distancia);




function gravidade(Corpo, Corpo_tempo_dilatacao, Corpo_sentido, distancia) {

  // Coordendas do corpo
  let Corpo_X = corpo_coordenadas(Corpo);

  // Movimento do corpo
  corpo_movimento(Corpo, Corpo_X, Corpo_sentido);

  // Massa do corpo
  let massa = Corpo.getAttribute('massa');
  console.log(massa / forca_gravitacional);
  // Aceleração do movimento do corpo (Relatividade)
  Corpo_tempo_dilatacao = massa / forca_gravitacional;
  if (Corpo_tempo_dilatacao < 0) { Corpo_tempo_dilatacaoa = 10; }
  
  // Continuidade do movimento do corpo
  Tempo = setTimeout(() => {
    Corpo_tempo = gravidade(Corpo, Corpo_tempo_dilatacao, Corpo_sentido, distancia);
  }, Corpo_tempo_dilatacao);
      
}


function calcula_forca_gravitacional(Corpo_1, Corpo_2) {

  // Força gravitacional entre os corpos
  forca_gravitacional = G * ((Corpo_1.getAttribute('massa') * Corpo_2.getAttribute('massa')) / distancia);
  
  // Loop
  setTimeout(() => {
      calcula_forca_gravitacional(Corpo_1, Corpo_2);
  }, 2);
  
}

function calcula_distancia(Corpo_1, Corpo_2) {

  // Distância entres os corpos
  distancia = corpo_coordenadas(Corpo_1) - corpo_coordenadas(Corpo_2);
  distancia = distancia ** 2;

  // Loop
  setTimeout(() => {
    calcula_distancia(Corpo_1, Corpo_2);
  }, 1);
  
}

function detecta_colisao(Corpo_1, Corpo_2) {

  // Verifica a colisão
  if (
    Corpo_1.offsetLeft + Corpo_1.offsetWidth > Corpo_2.offsetLeft &&
    Corpo_2.offsetLeft + Corpo_2.offsetWidth > Corpo_1.offsetLeft
  ) {
    clearTimeout(Tempo);
  }

  // Loop
  setTimeout(() => {
    detecta_colisao(Corpo_1, Corpo_2);
  }, 1);

}

function corpo_movimento(Corpo, Corpo_X, sentido_X) {

  // Diferença do raio do corpo
  let Corpo_raio = Corpo.offsetWidth / 2;
  
  // Velocidade (Relatividade)
  let Corpo_velocidade = 1;
  
  // Movimento dos corpos
  Corpo.style.left = Corpo_X - Corpo_raio + (Corpo_velocidade * sentido_X);
  
}

function corpo_coordenadas(Corpo) {
  
  // Diferença do raio do corpo
  let Corpo_raio = Corpo.offsetWidth / 2;

  // Coordenadas do corpo
  let Corpo_X = Corpo.offsetLeft + Corpo_raio;

  return Corpo_X;
  
}

