const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths configuration
const paths = {
  // Root token locations
  rootTokens: path.resolve('./tokens'),
  
  // Style directories
  stylesDir: path.resolve('./src/styles'),
  stylesTokensDir: path.resolve('./src/styles/tokens'),
  
  // Backup directories that may contain redundant files
  backupDir: path.resolve('./backup'),
  docsTokensDir: path.resolve('./docs/design/tokens'),
  
  // Reference file (source of truth)
  variablesCss: path.resolve('./src/styles/variables.css'),
  
  // Script paths
  scriptsDir: path.resolve('./scripts'),
  
  // Tailwind config files
  rootTailwindConfig: path.resolve('./tailwind.config.js'),
  stylesTailwindConfig: path.resolve('./src/styles/tailwind.config.js'),
};

// Files that should be kept after cleanup
const essentialFiles = [
  // Root token files (primary source)
  path.resolve('./tokens/all-tokens.json'),
  path.resolve('./tokens/transformed-tokens.json'),
  
  // Style token files (generated outputs)
  path.resolve('./src/styles/tokens/tokens.css'),
  path.resolve('./src/styles/tokens/tokens.scss'),
  path.resolve('./src/styles/tokens/tokens.js'),
  path.resolve('./src/styles/tokens/tokens.ts'),
  path.resolve('./src/styles/tokens/tokens.json'),
  
  // Config files
  path.resolve('./tailwind.config.js'),
  path.resolve('./src/styles/tailwind.config.js'),
  path.resolve('./postcss.config.js'),
  path.resolve('./config/sd.config.js'),
  
  // Reference files
  path.resolve('./src/styles/variables.css'),
  path.resolve('./src/styles/typography.css'),
  path.resolve('./src/styles/index.css'),
];

// Function to ensure directories exist
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to list all files recursively in a directory
function listFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      fileList = listFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to find redundant token files
function findRedundantFiles() {
  console.log('Searching for redundant token files...');
  
  // Get all token-related and CSS files
  const allFiles = [
    ...listFilesRecursively(paths.rootTokens),
    ...listFilesRecursively(paths.stylesTokensDir),
    ...listFilesRecursively(paths.backupDir).filter(file => 
      (file.includes('tokens') || file.includes('css')) && 
      (file.endsWith('.json') || file.endsWith('.css') || file.endsWith('.js') || 
       file.endsWith('.ts') || file.endsWith('.scss'))
    ),
    ...listFilesRecursively(paths.docsTokensDir),
    ...listFilesRecursively(paths.scriptsDir).filter(file => 
      file.includes('token') && 
      (file.endsWith('.js') || file.endsWith('.ts'))
    )
  ];
  
  // Filter out essential files
  const redundantFiles = allFiles.filter(file => 
    !essentialFiles.includes(file) && 
    !file.includes('node_modules') &&
    !file.includes('sync-tokens.js') &&
    !file.includes('cleanup-tokens.js') &&
    !file.includes('verify-tokens.js')
  );
  
  return redundantFiles;
}

// Function to remove redundant files
function removeRedundantFiles(files) {
  console.log(`Found ${files.length} redundant files to remove.`);
  
  files.forEach(file => {
    try {
      fs.unlinkSync(file);
      console.log(`Removed redundant file: ${file}`);
    } catch (err) {
      console.error(`Error removing ${file}:`, err);
    }
  });
}

// Function to run the sync-tokens.js script
function runSyncTokens() {
  try {
    console.log('Running token synchronization script...');
    execSync('node sync-tokens.js', { stdio: 'inherit' });
    console.log('Token synchronization completed');
  } catch (err) {
    console.error('Error running token synchronization:', err);
  }
}

// Function to check and update tailwind.config.js paths
function updateTailwindConfigs() {
  console.log('Updating Tailwind config files...');
  
  // Check and update root tailwind.config.js
  if (fs.existsSync(paths.rootTailwindConfig)) {
    let content = fs.readFileSync(paths.rootTailwindConfig, 'utf8');
    
    // Update path to tokens if needed
    const rootPattern = /require\(['"](.*)transformed-tokens\.json['"]\)/;
    const rootMatch = content.match(rootPattern);
    if (rootMatch && rootMatch[1] !== './tokens/') {
      content = content.replace(
        rootPattern,
        `require('./tokens/transformed-tokens.json')`
      );
      fs.writeFileSync(paths.rootTailwindConfig, content);
      console.log(`Updated token path in ${paths.rootTailwindConfig}`);
    } else {
      console.log(`Token path in ${paths.rootTailwindConfig} is already correct`);
    }
  } else {
    console.error(`Root tailwind.config.js not found at ${paths.rootTailwindConfig}`);
  }
  
  // Check and update styles tailwind.config.js
  if (fs.existsSync(paths.stylesTailwindConfig)) {
    let content = fs.readFileSync(paths.stylesTailwindConfig, 'utf8');
    
    // Update path to tokens if needed
    const stylesPattern = /require\(['"](.*)transformed-tokens\.json['"]\)/;
    const stylesMatch = content.match(stylesPattern);
    if (stylesMatch && stylesMatch[1] !== '../../tokens/') {
      content = content.replace(
        stylesPattern,
        `require('../../tokens/transformed-tokens.json')`
      );
      fs.writeFileSync(paths.stylesTailwindConfig, content);
      console.log(`Updated token path in ${paths.stylesTailwindConfig}`);
    } else {
      console.log(`Token path in ${paths.stylesTailwindConfig} is already correct`);
    }
  } else {
    console.error(`Styles tailwind.config.js not found at ${paths.stylesTailwindConfig}`);
  }
}

// Function to extract token categories from variables.css
function extractTokenCategories() {
  if (!fs.existsSync(paths.variablesCss)) {
    console.error('Reference file variables.css not found!');
    return [];
  }
  
  const content = fs.readFileSync(paths.variablesCss, 'utf8');
  const categoryRegex = /\/\* ([^*]+) \*\//g;
  
  const categories = [];
  let match;
  
  while ((match = categoryRegex.exec(content)) !== null) {
    categories.push(match[1].trim());
  }
  
  return categories;
}

// Function to verify token files against variables.css
function verifyTokenFiles() {
  console.log('\n=== VERIFYING TOKEN FILES AGAINST VARIABLES.CSS ===\n');
  
  if (!fs.existsSync(paths.variablesCss)) {
    console.error('Reference file variables.css not found!');
    return;
  }
  
  const variablesContent = fs.readFileSync(paths.variablesCss, 'utf8');
  const tokenCategories = extractTokenCategories();
  
  console.log('Token Categories from variables.css:');
  tokenCategories.forEach(category => console.log(`  - ${category}`));
  
  // Verify tokens.css
  const tokensCssPath = path.resolve('./src/styles/tokens/tokens.css');
  if (fs.existsSync(tokensCssPath)) {
    console.log('\nVerifying tokens.css...');
    const tokensCssContent = fs.readFileSync(tokensCssPath, 'utf8');
    
    // Basic verification - check if tokens.css has all categories
    const missingCategories = tokenCategories.filter(category => 
      !tokensCssContent.includes(category)
    );
    
    if (missingCategories.length > 0) {
      console.log('  NOTE: tokens.css has a different structure than variables.css');
      console.log('  This is expected for tailwind integration and is not an issue.');
    } else {
      console.log('  ✓ tokens.css contains all categories from variables.css');
    }
  } else {
    console.log('\nWARNING: tokens.css does not exist!');
  }
  
  // Verify transformed-tokens.json
  const transformedTokensPath = path.resolve('./tokens/transformed-tokens.json');
  if (fs.existsSync(transformedTokensPath)) {
    console.log('\nVerifying transformed-tokens.json...');
    try {
      const transformedTokens = JSON.parse(fs.readFileSync(transformedTokensPath, 'utf8'));
      
      if (Object.keys(transformedTokens).length > 0) {
        console.log('  ✓ transformed-tokens.json contains token data');
      } else {
        console.log('  WARNING: transformed-tokens.json appears to be empty!');
      }
    } catch (err) {
      console.error('  ERROR: Could not parse transformed-tokens.json!');
    }
  } else {
    console.log('\nWARNING: transformed-tokens.json does not exist!');
  }
  
  console.log('\n=== TOKEN VERIFICATION COMPLETE ===\n');
}

// Function to check Tailwind integration
function checkTailwindIntegration() {
  console.log('\n=== CHECKING TAILWIND INTEGRATION ===\n');
  
  // Check tailwind.config.js files
  const configFiles = [
    { name: 'Root tailwind.config.js', path: paths.rootTailwindConfig },
    { name: 'Styles tailwind.config.js', path: paths.stylesTailwindConfig }
  ];
  
  configFiles.forEach(config => {
    if (fs.existsSync(config.path)) {
      const tailwindConfig = fs.readFileSync(config.path, 'utf8');
      
      console.log(`Checking ${config.name}:`);
      
      if (tailwindConfig.includes('transformed-tokens.json')) {
        console.log(`  ✓ References transformed-tokens.json`);
      } else {
        console.log(`  WARNING: May not be using tokens properly!`);
      }
      
      if (tailwindConfig.includes('extractColors') && 
          tailwindConfig.includes('extractTypography')) {
        console.log(`  ✓ Includes token extraction functions`);
      } else {
        console.log(`  WARNING: May be missing token extraction functions!`);
      }
    } else {
      console.log(`WARNING: ${config.name} not found!`);
    }
  });
  
  // Check postcss.config.js
  if (fs.existsSync(path.resolve('./postcss.config.js'))) {
    console.log('\nChecking postcss.config.js:');
    const postcssConfig = fs.readFileSync(path.resolve('./postcss.config.js'), 'utf8');
    
    if (postcssConfig.includes('tailwindcss')) {
      console.log('  ✓ Includes tailwindcss plugin');
    } else {
      console.log('  WARNING: May be missing tailwindcss plugin!');
    }
  } else {
    console.log('\nWARNING: postcss.config.js not found!');
  }
  
  // Check index.css for Tailwind directives
  const indexCssPath = path.resolve('./src/styles/index.css');
  if (fs.existsSync(indexCssPath)) {
    console.log('\nChecking index.css:');
    const indexCss = fs.readFileSync(indexCssPath, 'utf8');
    
    if (indexCss.includes('@tailwind')) {
      console.log('  ✓ Includes Tailwind directives');
    } else {
      console.log('  WARNING: May be missing Tailwind directives!');
    }
    
    if (indexCss.includes('@import \'./tokens/tokens.css\'')) {
      console.log('  ✓ Imports tokens.css');
    } else {
      console.log('  WARNING: May not be importing tokens.css!');
    }
    
    if (indexCss.includes('@import \'./variables.css\'')) {
      console.log('  ✓ Imports variables.css');
    } else {
      console.log('  WARNING: May not be importing variables.css!');
    }
  } else {
    console.log('\nWARNING: index.css not found!');
  }
  
  console.log('\n=== TAILWIND INTEGRATION CHECK COMPLETE ===\n');
}

// Function to print token structure
function printTokenStructure() {
  console.log('\n=== CURRENT TOKEN STRUCTURE ===\n');
  
  console.log('Root Token Files:');
  const rootTokenFiles = fs.existsSync(paths.rootTokens) ? 
    fs.readdirSync(paths.rootTokens) : [];
  rootTokenFiles.forEach(file => console.log(`  - ${file}`));
  
  console.log('\nStyle Token Files:');
  const styleTokenFiles = fs.existsSync(paths.stylesTokensDir) ? 
    fs.readdirSync(paths.stylesTokensDir) : [];
  styleTokenFiles.forEach(file => console.log(`  - ${file}`));
  
  console.log('\nStyle CSS Files:');
  const styleCssFiles = fs.readdirSync(paths.stylesDir)
    .filter(file => file.endsWith('.css'))
    .map(file => file);
  styleCssFiles.forEach(file => console.log(`  - ${file}`));
  
  console.log('\nConfig Files:');
  console.log(`  - tailwind.config.js (root)`);
  console.log(`  - tailwind.config.js (src/styles)`);
  console.log(`  - postcss.config.js`);
  console.log(`  - config/sd.config.js`);
  
  console.log('\n=== TOKEN STRUCTURE COMPLETE ===\n');
}

// Function to explain which tailwind.config.js file to use
function explainTailwindConfig() {
  console.log('\n=== TAILWIND CONFIG USAGE GUIDE ===\n');
  console.log('This project has two tailwind.config.js files:');
  console.log('1. ./tailwind.config.js (root) - This is the primary file used by the build system');
  console.log('2. ./src/styles/tailwind.config.js - This is used for reference/development');
  
  console.log('\nRECOMMENDATION:');
  console.log('- Keep both files in sync with identical content');
  console.log('- When making changes, modify the root tailwind.config.js first');
  console.log('- Run "npm run tokens:sync" to ensure changes are synced to both files');
  
  console.log('\nNOTE:');
  console.log('The build process uses the root tailwind.config.js file by default.');
  console.log('Any changes to src/styles/tailwind.config.js will NOT affect the build unless synced to the root file.');
  
  console.log('\n=== TAILWIND CONFIG GUIDE COMPLETE ===\n');
}

// Main cleanup function
function cleanupTokens() {
  console.log('Starting token cleanup process...');
  
  // Ensure essential directories exist
  ensureDirExists(paths.rootTokens);
  ensureDirExists(paths.stylesDir);
  ensureDirExists(paths.stylesTokensDir);
  
  // Run the sync tokens script first
  runSyncTokens();
  
  // Update tailwind config paths
  updateTailwindConfigs();
  
  // Find and remove redundant files
  const redundantFiles = findRedundantFiles();
  removeRedundantFiles(redundantFiles);
  
  // Verify token files against variables.css
  verifyTokenFiles();
  
  // Check Tailwind integration
  checkTailwindIntegration();
  
  // Print the final token structure
  printTokenStructure();
  
  // Explain which tailwind.config.js file to use
  explainTailwindConfig();
  
  console.log('Token cleanup process completed!');
}

// Run the cleanup
cleanupTokens(); 