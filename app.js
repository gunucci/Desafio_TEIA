const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const objExpress = express();
const PORTA = process.env.PORT || 8000;

// Express analisa o corpo das requisições JSON
objExpress.use(bodyParser.json());

// Serve arquivos estáticos
objExpress.use(express.static(path.join(__dirname, 'public')));

// Rota POST para manipulação da string
objExpress.post('/api/manipulacao-string', (req, res) => {
    const { texto } = req.body;

    // Verificar se a string é um palíndromo
    const isPalindrome = isPalindromo(texto);

    // Contar o número de ocorrências de cada caractere na string
    const occurrences = countOccurrences(texto);

    // Retornar resposta no formato JSON
    res.json({
        palindromo: isPalindrome,
        ocorrencias_caracteres: occurrences
    });
});

// Função para verificar se uma string é um palíndromo
function isPalindromo(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

// Função para contar o número de ocorrências de cada caractere na string
function countOccurrences(str) {
    const occurrences = {};
    for (const char of str) {
        if (occurrences[char]) {
            occurrences[char]++;
        } else {
            occurrences[char] = 1;
        }
    }
    return occurrences;
}

// Iniciar o servidor
objExpress.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
