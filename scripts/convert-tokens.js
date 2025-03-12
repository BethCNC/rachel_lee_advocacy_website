const fs = require('fs');
const path = require('path');

// Read the tokens-studio-latest.json file
const tokensStudioFile = path.join(__dirname, '../tokens/tokens-studio-latest.json');
const outputFile = path.join(__dirname, '../tokens/all-tokens.json');

// Read the file
const tokensStudio = JSON.parse(fs.readFileSync(tokensStudioFile, 'utf8'));

// Create a new object to store the converted tokens
const convertedTokens = {};

// Function to flatten the tokens
function flattenTokens(obj, prefix = '') {
  for (const key in obj) {
    const value = obj[key];
    
    // If the value has a 'value' property, it's a token
    if (value && typeof value === 'object' && 'value' in value) {
      const tokenName = prefix ? `${prefix}-${key}` : key;
      convertedTokens[tokenName] = {
        value: value.value,
        type: value.type || 'string'
      };
    } 
    // If the value is an object but doesn't have a 'value' property, it's a group
    else if (value && typeof value === 'object') {
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      flattenTokens(value, newPrefix);
    }
  }
}

// Process the tokens
flattenTokens(tokensStudio);

// Write the converted tokens to the output file
fs.writeFileSync(outputFile, JSON.stringify(convertedTokens, null, 2));

console.log(`Converted tokens written to ${outputFile}`); 