// Função para verificar se um número é primo
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

// Função para inverter um número
function reverseNumber(num) {
  return parseInt(num.toString().split('').reverse().join(''), 10);
}

// Função para validar e processar a entrada
function parseInput(input) {
  // Remove colchetes e espaços, depois divide por vírgulas
  const cleanedInput = input.replace(/[\[\]\s]/g, '');
  if (!cleanedInput) return [];

  return cleanedInput
    .split(',')
    .map(num => {
      const parsed = parseInt(num, 10);
      return isNaN(parsed) ? null : parsed;
    })
    .filter(num => num !== null);
}

// Função principal para encontrar o anel especial
function findSpecialRing(numbers) {
  const specialRings = [];

  for (let num of numbers) {
    // Verifica se é primo
    if (!isPrime(num)) {
      continue;
    }

    // Calcula o quadrado
    const square = num * num;

    // Inverte o quadrado
    const reversedSquare = reverseNumber(square);

    // Verifica se o quadrado invertido é divisível pelo número original
    if (reversedSquare % num === 0) {
      const multiplier = reversedSquare / num;

      specialRings.push({
        number: num,
        square: square,
        reversedSquare: reversedSquare,
        multiplier: multiplier
      });
    }
  }

  return specialRings;
}

// Função para gerar explicação detalhada apenas dos números especiais
function generateDetailedCalculation(numbers) {
  let detailedSteps = '';

  // Primeiro, identifica os anéis especiais
  const specialRings = findSpecialRing(numbers);

  detailedSteps += `<div class="step" style="font-weight: bold; color: gold; font-size: 18px; margin-bottom: 20px;">🔍 ANÁLISE DETALHADA DA LISTA: [${numbers.join(
    ', '
  )}]</div>`;
  detailedSteps += `<div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; margin-bottom: 20px;">`;
  detailedSteps += `<div style="color: #66ff66; margin-bottom: 10px;"><strong>📋 CRITÉRIOS PARA SER UM ANEL ESPECIAL:</strong></div>`;
  detailedSteps += `<div style="margin-left: 15px; color: #cccccc;">`;
  detailedSteps += `<div>1️⃣ O número deve ser primo</div>`;
  detailedSteps += `<div>2️⃣ Calcular o quadrado do número</div>`;
  detailedSteps += `<div>3️⃣ Inverter os dígitos do quadrado</div>`;
  detailedSteps += `<div>4️⃣ O quadrado invertido deve ser divisível pelo número original</div>`;
  detailedSteps += `</div></div><br>`;

  if (specialRings.length > 0) {
    detailedSteps += `<div style="color: #66ff66; font-weight: bold; margin-bottom: 15px;">✅ Encontrado${
      specialRings.length > 1 ? 's' : ''
    } ${specialRings.length} anel${specialRings.length > 1 ? 's' : ''} especial${
      specialRings.length > 1 ? 'is' : ''
    }!</div>`;

    specialRings.forEach((ring, index) => {
      const num = ring.number;
      const square = ring.square;
      const reversedSquare = ring.reversedSquare;
      const multiplier = ring.multiplier;

      detailedSteps += `<div style="background: rgba(102, 255, 102, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #66ff66;">`;
      detailedSteps += `<div class="step" style="font-weight: bold; color: #66ff66; font-size: 16px;">🎉 ANEL ESPECIAL ENCONTRADO: ${num}</div><br>`;

      // Passo 1: Verificar se é primo
      detailedSteps += `<div class="step" style="margin-left: 10px;"><strong>Passo 1:</strong> Verificar se ${num} é primo</div>`;
      detailedSteps += `<div class="step" style="margin-left: 20px; color: #66ff66;">✅ ${num} É PRIMO</div>`;

      // Passo 2: Calcular o quadrado
      detailedSteps += `<div class="step" style="margin-left: 10px;"><strong>Passo 2:</strong> Calcular o quadrado</div>`;
      detailedSteps += `<div class="step" style="margin-left: 20px;">${num}² = ${num} × ${num} = ${square}</div>`;

      // Passo 3: Inverter o quadrado
      const squareDigits = square.toString().split('').join(' → ');
      const reversedDigits = reversedSquare.toString().split('').join(' → ');
      detailedSteps += `<div class="step" style="margin-left: 10px;"><strong>Passo 3:</strong> Inverter os dígitos do quadrado</div>`;
      detailedSteps += `<div class="step" style="margin-left: 20px;">Quadrado: ${square} (dígitos: ${squareDigits})</div>`;
      detailedSteps += `<div class="step" style="margin-left: 20px;">Invertido: ${reversedSquare} (dígitos: ${reversedDigits})</div>`;

      // Passo 4: Verificar divisibilidade
      detailedSteps += `<div class="step" style="margin-left: 10px;"><strong>Passo 4:</strong> Verificar se ${reversedSquare} é divisível por ${num}</div>`;
      detailedSteps += `<div class="step" style="margin-left: 20px;">Divisão: ${reversedSquare} ÷ ${num} = ${multiplier} (resto: 0)</div>`;
      detailedSteps += `<div class="step" style="margin-left: 20px; color: #66ff66;">✅ DIVISÍVEL! ${reversedSquare} = ${num} × ${multiplier}</div>`;
      detailedSteps += `<div class="step" style="margin-left: 10px; color: gold; font-weight: bold; font-size: 16px;">🎉 ${num} É UM ANEL ESPECIAL!</div>`;

      detailedSteps += `</div>`;
    });
  } else {
    detailedSteps += `<div style="background: rgba(255, 102, 102, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ff6666;">`;
    detailedSteps += `<div class="step" style="color: #ff6666; font-weight: bold;">❌ Nenhum anel especial encontrado</div>`;
    detailedSteps += `<div class="step" style="margin-top: 10px; color: #cccccc;">Após verificar todos os números da lista [${numbers.join(
      ', '
    )}], nenhum atendeu aos 4 critérios necessários.</div>`;
    detailedSteps += `</div>`;
  }

  return detailedSteps;
}

// Função para processar a entrada e exibir os resultados
function processInput() {
  const input = document.getElementById('numbersInput').value;
  const calculationSteps = document.getElementById('calculationSteps');
  const finalResult = document.getElementById('finalResult');

  // Limpa resultados anteriores
  calculationSteps.innerHTML = '';
  finalResult.textContent = '';

  // Processa a entrada
  const numbers = parseInput(input);

  if (numbers.length === 0) {
    calculationSteps.innerHTML =
      '<div class="step" style="color: #ff6666; font-size: 16px;">⚠️ Por favor, insira números válidos no formato: 15, 16, 13, 23, 29</div>';
    return;
  }

  // Gera cálculo detalhado
  const detailedCalculation = generateDetailedCalculation(numbers);
  calculationSteps.innerHTML = detailedCalculation;

  // Encontra os anéis especiais
  const specialRings = findSpecialRing(numbers);

  // Exibe o resultado final
  if (specialRings.length > 0) {
    const ringNumbers = specialRings.map(ring => ring.number).join(', ');

    // Adiciona resumo final
    calculationSteps.innerHTML += `
      <div style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1)); 
                  padding: 20px; border-radius: 12px; border: 2px solid gold; margin-top: 25px;">
        <div style="color: gold; font-weight: bold; font-size: 20px; text-align: center; margin-bottom: 15px;">
          🏆 RESULTADO FINAL - SAÍDA ESPERADA 🏆
        </div>
        <div style="text-align: center; font-size: 24px; font-weight: bold; color: #ffffff; 
                    text-shadow: 0 0 10px gold, 0 0 20px gold;">
          ${ringNumbers}
        </div>
        <div style="color: #cccccc; text-align: center; margin-top: 10px; font-size: 14px;">
          ${specialRings.length === 1 ? 'Anel especial encontrado' : 'Anéis especiais encontrados'}
        </div>
      </div>
    `;

    finalResult.innerHTML = `<span style="color: gold; text-shadow: 0 0 10px gold;">✨ Anel especial encontrado: ${ringNumbers} ✨</span>`;
  } else {
    finalResult.innerHTML = '<span style="color: #ff6666;">❌ Nenhum anel especial encontrado</span>';

    calculationSteps.innerHTML += `
      <div style="background: rgba(255, 102, 102, 0.1); padding: 20px; border-radius: 12px; 
                  border: 2px solid #ff6666; margin-top: 25px;">
        <div style="color: #ff6666; font-weight: bold; font-size: 18px; text-align: center; margin-bottom: 10px;">
          ❌ RESULTADO FINAL
        </div>
        <div style="text-align: center; color: #ffffff;">
          Nenhum anel especial foi encontrado na lista [${numbers.join(', ')}]
        </div>
        <div style="color: #cccccc; text-align: center; margin-top: 15px; font-size: 14px;">
          Lembre-se: o anel especial deve ser primo e seu quadrado invertido deve ser divisível pelo número original.
        </div>
      </div>
    `;
  }
}

// Função para limpar os campos
function clearFields() {
  document.getElementById('numbersInput').value = '';
  document.getElementById('calculationSteps').innerHTML =
    '<div style="color: #cccccc; text-align: center; font-style: italic;">Digite os números e clique em ENCONTRAR para verificar os anéis.</div>';
  document.getElementById('finalResult').textContent = '';
}

// Adiciona os event listeners quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('findButton').addEventListener('click', processInput);
  document.getElementById('returnButton').addEventListener('click', clearFields);

  // Permite submeter com Enter
  document.getElementById('numbersInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      processInput();
    }
  });
});
