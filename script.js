
gravidade(true);

function gravidade(status) {

  let colisao = false;
    
  if (status == true) {

    const tempo = setInterval(() => {

      const Corpo_1 = document.querySelector('#M1');
      const Corpo_2 = document.querySelector('#M3');
      
      colisao = forca_gravitacional(Corpo_1, Corpo_2);
      
      if (colisao === true) { clearInterval(tempo); }
          
    }, 100);

  }

}

function forca_gravitacional(Corpo_1, Corpo_2) {

  /*
  
  Bom de lembrar:
  
  -> O corpo 1 sempre andará para esquerda (Left positivo);
  -> O corpo 2 sempre andará para direita (Left negativo);
  
  Para que ambos sejam sempre verdade, independetes da massa, o corpo 1
  sempre deverá estar à esquerda do corpo 2. Em outras palavras, essa
  função deverá sempre chamar o Corpo_1 com o Objeto a esquerda do Corpo_2.
  
  */

  // Diferença do raio dos corpos
  let Corpo_1_raio = Corpo_1.offsetWidth / 2;
  let Corpo_2_raio = Corpo_2.offsetWidth / 2;

  // Coordenadas dos corpos
  let Corpo_1_X = Corpo_1.offsetLeft + Corpo_1_raio;
  let Corpo_2_X = Corpo_2.offsetLeft + Corpo_2_raio;

  // Distância entre os corpos
  let distancia = Corpo_2_X - Corpo_1_X;

  // Velocidade chumbada
  let Corpo_1_velocidade = 1;
  let Corpo_2_velocidade = 1;

  // Direção do movimento
  if (Corpo_1_X < Corpo_2_X) { Corpo_2_velocidade *= -1 }
  else                       { Corpo_1_velocidade *= -1 }

  // Novas coordenadas dos corpos
  Corpo_1_X = Corpo_1_X + 1 - Corpo_1_raio;
  Corpo_2_X = Corpo_2_X + 1 - Corpo_2_raio;

  // Movimento dos corpos
  Corpo_1.style.left = Corpo_1_X;
  Corpo_2.style.left = Corpo_2_X;
  
  // Identificando colisão entre os corpos
  if (Corpo_1_X < Corpo_2_X && Corpo_2_X > Corpo_1_X) { return false; }
  else                                                { return true;  }
  
}







function forca_gravitacional_OLD(Corpo_1, Corpo_2) {

  /*
  
  Bom de lembrar:
  
  -> O corpo 1 sempre andará para esquerda (Left positivo);
  -> O corpo 2 sempre andará para direita (Left negativo);
  
  Para que ambos sejam sempre verdade, independetes da massa, o corpo 1
  sempre deverá estar à esquerda do corpo 2. Em outras palavras, essa
  função deverá sempre chamar o Corpo_1 com o Objeto a esquerda do Corpo_2.
  
  */

  // Diferença do raio dos corpos
  let Corpo_1_raio = Corpo_1.offsetWidth / 2;
  let Corpo_2_raio = Corpo_2.offsetWidth / 2;

  // Coordenadas dos corpos
  let Corpo_1_X = Corpo_1.offsetLeft + Corpo_1_raio;
  let Corpo_2_X = Corpo_2.offsetLeft + Corpo_2_raio;
    
  let distancia = Corpo_2_X - Corpo_1_X;

  // Massa dos corpos
  let Corpo_1_massa = Corpo_1.getAttribute('massa');
  let Corpo_2_massa = Corpo_2.getAttribute('massa');

  // Constante gravitacional
  let G = 0.0000001;
  
  let forca = G * ((Corpo_1_massa * Corpo_2_massa) / (distancia ** 2));

  // Aceleração dos corpos
  let Corpo_1_aceleracao = forca / Corpo_1_massa;
  let Corpo_2_aceleracao = forca / Corpo_2_massa;

  // Direção do movimento
  if (Corpo_1_X < Corpo_2_X) { Corpo_2_aceleracao *= -1 }
  else                       { Corpo_1_aceleracao *= -1 }

  // Novas coordenadas dos corpos
  Corpo_1_X = Corpo_1_X + Corpo_1_aceleracao - Corpo_1_raio;
  Corpo_2_X = Corpo_2_X + Corpo_2_aceleracao - Corpo_2_raio;

  // Movimento dos corpos
  Corpo_1.style.left = Corpo_1_X;
  Corpo_2.style.left = Corpo_2_X;
  
  // Identificando colisão entre os corpos
  if (Corpo_1_X < Corpo_2_X && Corpo_2_X > Corpo_1_X) { return false; }
  else                                                { return true;  }
  
}