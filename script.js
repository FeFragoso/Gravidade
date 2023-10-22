

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
const G = 0.001;





// Corpos
const Corpos = document.querySelectorAll('.corpo');


// Tempo dos corpos
let tempo = [];
Corpos.forEach((e) => tempo.push(e.id));


for (let i = 0; i < Corpos.length; i++) {
  for (let j = 0; j < Corpos.length; j++) {
    if (i != j) {
      
      forca_gravitacional(Corpos[i], Corpos[j], 1000);
      
    }
  }
}



function forca_gravitacional(Corpo_1, Corpo_2, Corpo_1_tempo_dilatacao) {

  // Distância entre os corpos
  let distancia = calcula_distancia(Corpo_1, Corpo_2);
  
  // Sentido dos corpos
  let Corpo_1_sentido = calcula_sentido(Corpo_1, Corpo_2);
  console.log(Corpo_1_sentido)
  // Força gravitacional dos corpos
  let forca = calcula_forca_gravitacional(Corpo_1, Corpo_2);

  // Coordendas do corpo
  let Corpo_1_X = corpo_coordenadas(Corpo_1);

  // Movimento do corpo
  corpo_movimento(Corpo_1, Corpo_1_X, Corpo_1_sentido);

  // Massa do corpo
  let massa = Corpo_1.getAttribute('massa');
  
  // Aceleração do movimento do corpo (Relatividade)
  Corpo_1_tempo_dilatacao = massa / forca;
  if (Corpo_1_tempo_dilatacao < 0) { Corpo_1_tempo_dilatacao = 10; }
  
  // Continuidade do movimento do corpo
  setTimeout(() => {
    forca_gravitacional(Corpo_1, Corpo_2, Corpo_1_tempo_dilatacao);
  }, Corpo_1_tempo_dilatacao);
      
}

function calcula_forca_gravitacional(Corpo_1, Corpo_2) {

  // Força gravitacional entre os corpos
  return G * ((Corpo_1.getAttribute('massa') * Corpo_2.getAttribute('massa')) / distancia);

}

function calcula_sentido(Corpo_1, Corpo_2) {

  let Corpo_1_X = corpo_coordenadas(Corpo_1);
  let Corpo_2_X = corpo_coordenadas(Corpo_2);

  if      (Corpo_1_X < Corpo_2_X) {
    Corpo_1_sentido =  1;
  }
  else if (Corpo_1_X == Corpo_2_X) { // Colisão
    Corpo_1_sentido = 0;
  }
  else if (Corpo_1_X > Corpo_2_X) {
    Corpo_1_sentido = -1;
  }

  return Corpo_1_sentido;

}

function calcula_distancia(Corpo_1, Corpo_2) {

  // Distância entres os corpos
  distancia = corpo_coordenadas(Corpo_1) - corpo_coordenadas(Corpo_2);
  distancia = distancia ** 2;

  return distancia;
  
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

