

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
const G = 0.01;

// Corpos
const Corpos = document.querySelectorAll('.corpo');

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

  // Força gravitacional dos corpos
  let forca = calcula_forca_gravitacional(Corpo_1, Corpo_2, distancia);

  // Coordendas do corpo
  let Corpo_1_coordenadas = corpo_coordenadas(Corpo_1);

  // Movimento do corpo
  corpo_movimento(Corpo_1, Corpo_1_coordenadas, Corpo_1_sentido);

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

function calcula_forca_gravitacional(Corpo_1, Corpo_2, distancia) {
  
  // Força gravitacional entre os corpos
  return G * ((Corpo_1.getAttribute('massa') * Corpo_2.getAttribute('massa')) / (distancia ** 2));

}

function calcula_sentido(Corpo_1, Corpo_2) {

  let Corpo_1_sentido = [];

  let Corpo_1_coordenada = corpo_coordenadas(Corpo_1);
  let Corpo_2_coordenada = corpo_coordenadas(Corpo_2);
  
  // X
  if (Corpo_1_coordenada[0] < Corpo_2_coordenada[0]) {
    Corpo_1_sentido[0] =  1;
  }
  else if (Corpo_1_coordenada[0] == Corpo_2_coordenada[0]) { // Colisão no eixo
    Corpo_1_sentido[0] = 0;
  }
  else {
    Corpo_1_sentido[0] = -1;
  }

  // Y
  if (Corpo_1_coordenada[1] < Corpo_2_coordenada[1]) {
    Corpo_1_sentido[1] =  1;
  }
  else if (Corpo_1_coordenada[1] == Corpo_2_coordenada[1]) { // Colisão no eixo
    Corpo_1_sentido[1] = 0;
  }
  else {
    Corpo_1_sentido[1] = -1;
  }

  return Corpo_1_sentido;

}

function calcula_distancia(Corpo_1, Corpo_2) {

  let distancia;

  let Corpo_1_coordenada = corpo_coordenadas(Corpo_1);
  let Corpo_2_coordenada = corpo_coordenadas(Corpo_2);

  // Verifica se em alguma dimensão são iguais
  if (
    Corpo_1_coordenada[0] == Corpo_2_coordenada[0] ||
    Corpo_1_coordenada[1] == Corpo_2_coordenada[1]
  ) {
    
    // Identificando em qual dimensão
    if (Corpo_1_coordenada[0] != Corpo_2_coordenada[0]) {
      distancia = Corpo_1_coordenada[0] - Corpo_2_coordenada[0]; // X
    }
    else {
      distancia = Corpo_1_coordenada[1] - Corpo_2_coordenada[1]; // Y
    }
  
  }
  else { // Pitagoras
    
    let distancia_X = Corpo_1_coordenada[0] - Corpo_2_coordenada[0];
    let distancia_Y = Corpo_1_coordenada[1] - Corpo_2_coordenada[1];
    
    distancia = Math.sqrt((distancia_X ** 2) + (distancia_Y ** 2)); // X, Y
    
  }
  
  return distancia;
  
}

function corpo_movimento(Corpo, Corpo_coordenadas, sentido) {

  // Diferença do raio do corpo
  let Corpo_X_raio = Corpo.offsetWidth / 2;
  let Corpo_Y_raio = Corpo.offsetHeight / 2;
  
  // Velocidade (Relatividade)
  let Corpo_velocidade = 1;
  
  // Movimento do corpo
  Corpo.style.left = Corpo_coordenadas[0] - Corpo_X_raio + (Corpo_velocidade * sentido[0]); // X
  Corpo.style.top = Corpo_coordenadas[1] - Corpo_Y_raio + (Corpo_velocidade * sentido[1]); // Y
  
}

function corpo_coordenadas(Corpo) {
  
  // Diferença do raio do corpo
  let Corpo_X_raio = Corpo.offsetWidth / 2;
  let Corpo_Y_raio = Corpo.offsetHeight / 2;
  
  // Coordenadas do corpo
  let Corpo_X = Corpo.offsetLeft + Corpo_X_raio;
  let Corpo_Y = Corpo.offsetTop + Corpo_Y_raio;

  return [Corpo_X, Corpo_Y];
  
}

