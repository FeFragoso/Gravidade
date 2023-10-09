

 /*

RELATIVIDADE

Antes considerávamos que a distância e o tempo entre os corpos eram os
mesmos, que somente a velocidade dos 2 corpos variava. Fazer dessa forma
acarreta em alguns problemas como a imprecisão da colisão dos corpos
conforme a distância entre eles diminui e o salto na sua posição aumenta.
Então mudamos a forma como representamos o universo fazendo com que
agora a distância e a velocidade entre os corpos sejam as mesmas, mas o
tempo não. Dessa forma,, assumimos que o tempo passa diferente para cada
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


gravidade();

function gravidade() {
    
  // Corpos
  const Corpo_1 = document.querySelector('#M1');
  const Corpo_2 = document.querySelector('#M3');
  
  // Calculo temporal
  let Tempo_aceleracao = 1;
  let Tempo_dilatacao  = 100; // Milisegundos

  Tempo_dilatacao, Tempo_aceleracao = forca_gravitacional(Corpo_1, Corpo_2, Tempo_dilatacao, Tempo_aceleracao);
  
}


function forca_gravitacional(Corpo_1, Corpo_2, Tempo_dilatacao, Tempo_aceleracao) {

  // Diferença do raio dos corpos
  let Corpo_1_raio = Corpo_1.offsetWidth / 2;
  let Corpo_2_raio = Corpo_2.offsetWidth / 2;

  // Coordenadas dos corpos
  let Corpo_1_X = Corpo_1.offsetLeft + Corpo_1_raio;
  let Corpo_2_X = Corpo_2.offsetLeft + Corpo_2_raio;

  // Distância entre os corpos
  let distancia = Corpo_2_X - Corpo_1_X;

  // Velocidade chumbada (Relatividade)
  let Corpo_1_velocidade = 1;
  let Corpo_2_velocidade = 1;

  // Direção do movimento
  if (Corpo_1_X < Corpo_2_X) { Corpo_2_velocidade *= -1 }
  else                       { Corpo_1_velocidade *= -1 }

  // Novas coordenadas dos corpos
  Corpo_1_X = Corpo_1_X + Corpo_1_velocidade - Corpo_1_raio;
  Corpo_2_X = Corpo_2_X + Corpo_2_velocidade - Corpo_2_raio;

  // Movimento dos corpos
  Corpo_1.style.left = Corpo_1_X;
  Corpo_2.style.left = Corpo_2_X;
  
  // Identificando colisão entre os corpos
  if (
    Corpo_1.offsetLeft + Corpo_1.offsetWidth < Corpo_2_X &&
    Corpo_2.offsetLeft + Corpo_2.offsetWidth > Corpo_1_X
  ) {
    // Aceleração temporal
    Tempo_aceleracao *= 1.01;
    Tempo_dilatacao -= Tempo_aceleracao;
    
    setTimeout(() => {
      forca_gravitacional(Corpo_1, Corpo_2, Tempo_dilatacao, Tempo_aceleracao)
    }, Tempo_dilatacao);
  }
  
  return Tempo_dilatacao, Tempo_aceleracao;
  
}
