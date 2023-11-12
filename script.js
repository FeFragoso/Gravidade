

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

------------------------------------------------------------------------

Para cada objeto, uma força para cada eixo. Com tempos diferentes
passados para cada eixo de um mesmo objeto, visto que a velocidade
é sempre a mesma, 1. Em outras palavras, uma função corpo_movimento()
para cada sentido de cada objeto.



*/

// Variáveis universais
const G = 0.01;
var Tempo;

// Corpos
const Corpos = document.querySelectorAll('.corpo');








function gravidade(Corpos) {

  for (let i = 0; i < Corpos.length; i++) {
    for (let j = 0; j < Corpos.length; j++) {
      if (i != j) {
        
        forca_gravitacional(Corpos[i], Corpos[j], 'X', 10000);
        forca_gravitacional(Corpos[i], Corpos[j], 'Y', 10000);
        
      }
    }
  }

}
  
function forca_gravitacional(Corpo_1, Corpo_2, Eixo, Corpo_1_tempo_dilatacao) {

  // Distância entre os corpos
  let distancia = calcula_distancia(Corpo_1, Corpo_2);

  // Sentido dos corpos
  let Corpo_1_sentido = calcula_sentido(Corpo_1, Corpo_2, Eixo);

  // Força gravitacional dos corpos
  let forca = calcula_forca_gravitacional(Corpo_1, Corpo_2, distancia);

  // Nova coordenda do corpo
  let Corpo_1_coordenada = corpo_coordenada(Corpo_1, Eixo);

  // Movimento do corpo
  corpo_movimento(Corpo_1, Corpo_1_coordenada, Corpo_1_sentido, Eixo);

  // Massa do corpo
  let massa = Corpo_1.getAttribute('massa');
  
  // Aceleração do movimento do corpo (Relatividade)
  Corpo_1_tempo_dilatacao = massa / forca;
  if (Corpo_1_tempo_dilatacao < 0) { Corpo_1_tempo_dilatacao = 10; }
  
  // Continuidade do movimento do corpo
  setTimeout(() => {
    forca_gravitacional(Corpo_1, Corpo_2, Eixo, Corpo_1_tempo_dilatacao);
  }, Corpo_1_tempo_dilatacao);
      
}


function calcula_distancia(Corpo_1, Corpo_2) {

  let cateto_A = corpo_coordenada(Corpo_1, 'X') - corpo_coordenada(Corpo_2, 'X');
  let cateto_B = corpo_coordenada(Corpo_1, 'Y') - corpo_coordenada(Corpo_2, 'Y');

  return Math.sqrt((cateto_A ** 2) + (cateto_B ** 2));
  
}

function calcula_sentido(Corpo_1, Corpo_2, Eixo) {

  let Corpo_1_sentido;

  let Corpo_1_coordenada = corpo_coordenada(Corpo_1, Eixo);
  let Corpo_2_coordenada = corpo_coordenada(Corpo_2, Eixo);

  if (Corpo_1_coordenada < Corpo_2_coordenada) {
    Corpo_1_sentido =  1;
  }
  else if (Corpo_1_coordenada == Corpo_2_coordenada) { // Colisão no eixo
    Corpo_1_sentido =  1;
  }
  else {
    Corpo_1_sentido = -1;
  }

  return Corpo_1_sentido;

}

function calcula_forca_gravitacional(Corpo_1, Corpo_2, distancia) {

  // Força gravitacional entre os corpos
  return G * ((Corpo_1.getAttribute('massa') * Corpo_2.getAttribute('massa')) / (distancia ** 2));

}

function corpo_coordenada(Corpo, Eixo) {

  if (Eixo === 'X') {

    // Diferença do raio do corpo
    let Corpo_X_raio = Corpo.offsetWidth / 2;

    // Coordenadas do corpo
    return Corpo.offsetLeft + Corpo_X_raio;

  }
  else if (Eixo === 'Y') {
    
    // Diferença do raio do corpo
    let Corpo_Y_raio = Corpo.offsetHeight / 2;
  
    // Coordenadas do corpo
    return Corpo.offsetTop + Corpo_Y_raio;

  }

}

function corpo_movimento(Corpo, Corpo_coordenada, sentido, Eixo) {

  if (Eixo === 'X') {

    // Diferença do raio do corpo
    let Corpo_raio = Corpo.offsetWidth / 2;
    
    // Velocidade (Relatividade)
    let Corpo_velocidade = 1;
    
    // Movimento do corpo
    Corpo.style.left = Corpo_coordenada - Corpo_raio + (Corpo_velocidade * sentido);

  }
  else if (Eixo === 'Y') {

    // Diferença do raio do corpo
    let Corpo_raio = Corpo.offsetHeight / 2;

    // Velocidade (Relatividade)
    let Corpo_velocidade = 1;

    // Movimento do corpo
    Corpo.style.top = Corpo_coordenada - Corpo_raio + (Corpo_velocidade * sentido);
    
  }
  
}



