const fs = require('fs');
const path = require('path');

// Paths configuration
const paths = {
  // Reference file (source of truth)
  variablesCss: path.resolve('./src/styles/variables.css'),
  
  // Generated token files
  tokensCss: path.resolve('./src/styles/tokens/tokens.css'),
  tailwindConfig: path.resolve('./tailwind.config.js'),
  transformedTokens: path.resolve('./tokens/transformed-tokens.json'),
  allTokens: path.resolve('./tokens/all-tokens.json'),
};

// Extract CSS variables from a CSS file
function extractCssVariables(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const variableRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  
  const variables = {};
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const name = match[1].trim();
    const value = match[2].trim();
    variables[name] = value;
  }
  
  return variables;
}

// Extract token categories from the CSS file
function extractTokenCategories(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const categoryRegex = /\/\* ([^*]+) \*\//g;
  
  const categories = [];
  let match;
  
  while ((match = categoryRegex.exec(content)) !== null) {
    categories.push(match[1].trim());
  }
  
  return categories;
}

// Normalize variable values for comparison
function normalizeValue(value) {
  return value.replace(/\s+/g, ' ').trim();
}

// Compare two sets of variables
function compareVariables(reference, generated) {
  const differences = {
    missing: [],
    different: [],
    extra: []
  };
  
  // Check for missing and different variables
  Object.keys(reference).forEach(varName => {
    if (!generated[varName]) {
      differences.missing.push(varName);
    } else if (normalizeValue(reference[varName]) !== normalizeValue(generated[varName])) {
      differences.different.push({
        name: varName,
        reference: reference[varName],
        generated: generated[varName]
      });
    }
  });
  
  // Check for extra variables
  Object.keys(generated).forEach(varName => {
    if (!reference[varName]) {
      differences.extra.push(varName);
    }
  });
  
  return differences;
}

// Verify token files based on variables.css
function verifyTokens() {
  console.log('\n=== TOKEN VERIFICATION REPORT ===\n');
  
  // Extract variables from reference file
  console.log(`Using "${paths.variablesCss}" as reference...`);
  const referenceVariables = extractCssVariables(paths.variablesCss);
  console.log(`Found ${Object.keys(referenceVariables).length} variables in reference file.\n`);
  
  // Extract token categories
  const tokenCategories = extractTokenCategories(paths.variablesCss);
  console.log('Token Categories:');
  tokenCategories.forEach(category => console.log(`  - ${category}`));
  
  // Verify tokens.css
  console.log('\n--- Verifying tokens.css ---');
  const tokensCssVariables = extractCssVariables(paths.tokensCss);
  console.log(`Found ${Object.keys(tokensCssVariables).length} variables in tokens.css.`);
  
  const tokensDifferences = compareVariables(referenceVariables, tokensCssVariables);
  
  if (tokensDifferences.missing.length > 0) {
    console.log('\nMissing variables in tokens.css:');
    tokensDifferences.missing.forEach(name => console.log(`  - --${name}`));
  }
  
  if (tokensDifferences.different.length > 0) {
    console.log('\nDifferent variable values in tokens.css:');
    tokensDifferences.different.forEach(diff => {
      console.log(`  - --${diff.name}:`);
      console.log(`      Reference: ${diff.reference}`);
      console.log(`      Generated: ${diff.generated}`);
    });
  }
  
  if (tokensDifferences.extra.length > 0) {
    console.log('\nExtra variables in tokens.css:');
    tokensDifferences.extra.forEach(name => console.log(`  - --${name}`));
  }
  
  if (tokensDifferences.missing.length === 0 && 
      tokensDifferences.different.length === 0 && 
      tokensDifferences.extra.length === 0) {
    console.log('\n✅ tokens.css is in sync with variables.css');
  }
  
  // Verify transformed-tokens.json
  console.log('\n--- Verifying transformed-tokens.json ---');
  if (fs.existsSync(paths.transformedTokens)) {
    try {
      const transformedTokens = JSON.parse(fs.readFileSync(paths.transformedTokens, 'utf8'));
      console.log(`Found token data in transformed-tokens.json.`);
      
      // Check if major categories are present
      const rootKeys = Object.keys(transformedTokens);
      console.log('\nRoot categories in transformed-tokens.json:');
      rootKeys.forEach(key => console.log(`  - ${key}`));
      
      // Check for presence of color tokens
      let hasColorTokens = false;
      if (transformedTokens['primitives/color']) {
        const colorBrands = transformedTokens['primitives/color']['Color Brand'];
        if (colorBrands) {
          hasColorTokens = true;
          console.log('\nColor brands found:', Object.keys(colorBrands).length);
        }
      }
      
      if (!hasColorTokens) {
        console.log('\nWARNING: No color tokens found in transformed-tokens.json!');
      } else {
        console.log('\n✅ Color tokens found in transformed-tokens.json');
      }
    } catch (err) {
      console.error(`ERROR: Could not parse transformed-tokens.json: ${err.message}`);
    }
  } else {
    console.log('WARNING: transformed-tokens.json does not exist!');
  }
  
  // Verify Tailwind configuration
  console.log('\n--- Verifying Tailwind Integration ---');
  if (fs.existsSync(paths.tailwindConfig)) {
    const tailwindContent = fs.readFileSync(paths.tailwindConfig, 'utf8');
    
    if (tailwindContent.includes('transformed-tokens.json')) {
      console.log('✅ tailwind.config.js references transformed-tokens.json');
    } else {
      console.log('WARNING: tailwind.config.js may not be using tokens correctly!');
    }
    
    // Check for color extraction
    if (tailwindContent.includes('extractColors')) {
      console.log('✅ tailwind.config.js includes color extraction logic');
    } else {
      console.log('WARNING: tailwind.config.js may be missing color extraction logic!');
    }
  } else {
    console.log('WARNING: tailwind.config.js does not exist!');
  }
  
  console.log('\n=== TOKEN VERIFICATION COMPLETE ===\n');
}

// Run verification
verifyTokens(); 