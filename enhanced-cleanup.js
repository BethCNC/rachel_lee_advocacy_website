const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  // Primary files - these are the source of truth
  primaryFiles: {
    tokens: path.resolve('./tokens/transformed-tokens.json'),
    css: path.resolve('./src/styles/variables.css'),
    tailwind: path.resolve('./tailwind.config.js'),
  },
  
  // Directories to scan for duplicates and cleanup
  scanDirectories: [
    './src/styles',
    './src/components',
    './tokens',
    './backup',
    './docs/design/tokens',
    './config'
  ],
  
  // CSS files to keep and their purposes
  cssFiles: {
    'src/styles/index.css': 'Main CSS entry point with Tailwind directives',
    'src/styles/variables.css': 'Source of truth for design tokens',
    'src/styles/typography.css': 'Typography styles',
    'src/styles/tokens/tokens.css': 'Generated design tokens from Style Dictionary',
    'src/components/Header.css': 'Styles for the Header component',
    'src/components/NavBar.css': 'Styles for the NavBar component',
  },
  
  // Token files to keep and their purposes
  tokenFiles: {
    'tokens/all-tokens.json': 'Raw tokens from Figma',
    'tokens/transformed-tokens.json': 'Processed tokens for use in Tailwind and components',
    'src/styles/tokens/tokens.css': 'CSS variables from tokens',
    'src/styles/tokens/tokens.scss': 'SCSS variables from tokens',
    'src/styles/tokens/tokens.js': 'JavaScript exports for tokens',
    'src/styles/tokens/tokens.ts': 'TypeScript types for tokens',
    'src/styles/tokens/tokens.json': 'JSON representation of tokens for reference',
  },
  
  // Config files to check
  configFiles: {
    'tailwind.config.js': 'Root Tailwind config (primary, used by build process)',
    'src/styles/tailwind.config.js': 'Styles directory Tailwind config (should be in sync with root)',
    'config/tailwind.config.ts': 'TypeScript Tailwind config (for IDE integration)',
    'postcss.config.js': 'PostCSS configuration',
    'config/sd.config.js': 'Style Dictionary configuration',
  },
  
  // Scripts for token management
  tokenScripts: {
    'sync-tokens.js': 'Synchronizes tokens across the project',
    'sync-tailwind-configs.js': 'Keeps tailwind configs in sync',
    'verify-tokens.js': 'Verifies token values against source of truth',
    'cleanup-tokens.js': 'Cleans up token files',
  },
  
  // Empty/obsolete directories to clean up
  emptyDirectories: [
    './backup/src/styles/tokens',
    './backup/tokens',
    './docs/design/tokens'
  ],
};

// Utility functions
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isDirectory(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

function isEmptyDirectory(dirPath) {
  try {
    return fs.readdirSync(dirPath).length === 0;
  } catch (err) {
    return false;
  }
}

function removeEmptyDirectories() {
  console.log('\nChecking for empty directories...');
  
  config.emptyDirectories.forEach(dir => {
    const dirPath = path.resolve(dir);
    
    if (isDirectory(dirPath) && isEmptyDirectory(dirPath)) {
      try {
        fs.rmdirSync(dirPath);
        console.log(`Removed empty directory: ${dir}`);
      } catch (err) {
        console.error(`Error removing directory ${dir}:`, err);
      }
    } else if (isDirectory(dirPath)) {
      console.log(`Directory not empty, skipping: ${dir}`);
    }
  });
}

function findDuplicateCssImports() {
  console.log('\nChecking for duplicate CSS imports...');
  
  // Get JavaScript/React files
  const jsFiles = [];
  config.scanDirectories.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir, { recursive: true })
          .filter(file => /\.(js|jsx|ts|tsx)$/.test(file) && !file.includes('node_modules'));
        
        jsFiles.push(...files.map(file => path.join(dir, file)));
      }
    } catch (err) {
      console.error(`Error scanning directory ${dir}:`, err);
    }
  });
  
  // Check for duplicate imports
  const cssImports = {};
  
  jsFiles.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const imports = content.match(/import\s+['"]\.\/.*\.css['"]/g) || [];
        
        imports.forEach(importStmt => {
          if (!cssImports[importStmt]) {
            cssImports[importStmt] = [];
          }
          cssImports[importStmt].push(file);
        });
      }
    } catch (err) {
      console.error(`Error reading file ${file}:`, err);
    }
  });
  
  // Report duplicates
  Object.entries(cssImports).forEach(([importStmt, files]) => {
    if (files.length > 1) {
      console.log(`\nMultiple files import ${importStmt}:`);
      files.forEach(file => console.log(`  - ${file}`));
    }
  });
}

function checkConfigConsistency() {
  console.log('\nChecking config file consistency...');
  
  // Check tailwind configs
  const rootTailwindPath = path.resolve(config.configFiles['tailwind.config.js']);
  const stylesTailwindPath = path.resolve(config.configFiles['src/styles/tailwind.config.js']);
  
  if (fs.existsSync(rootTailwindPath) && fs.existsSync(stylesTailwindPath)) {
    const rootTailwind = fs.readFileSync(rootTailwindPath, 'utf8');
    const stylesTailwind = fs.readFileSync(stylesTailwindPath, 'utf8');
    
    // Check for path differences
    const rootPath = rootTailwind.match(/require\(['"](.*)transformed-tokens\.json['"]\)/);
    const stylesPath = stylesTailwind.match(/require\(['"](.*)transformed-tokens\.json['"]\)/);
    
    if (rootPath && stylesPath) {
      if (rootPath[1] === './tokens/' && stylesPath[1] === '../../tokens/') {
        console.log('✅ Tailwind config paths are correctly set');
      } else {
        console.log('⚠️ Tailwind config paths need to be fixed:');
        console.log(`  - Root should be: './tokens/' (currently: ${rootPath[1]})`);
        console.log(`  - Styles should be: '../../tokens/' (currently: ${stylesPath[1]})`);
      }
    }
    
    // Check for functionality differences (excluding paths)
    const normRootContent = rootTailwind
      .replace(/require\(['"](.*)transformed-tokens\.json['"]\)/, 'TOKENS_PATH_PLACEHOLDER')
      .replace(/\s+/g, ' ');
    
    const normStylesContent = stylesTailwind
      .replace(/require\(['"](.*)transformed-tokens\.json['"]\)/, 'TOKENS_PATH_PLACEHOLDER')
      .replace(/\s+/g, ' ');
    
    if (normRootContent === normStylesContent) {
      console.log('✅ Tailwind configs have matching functionality');
    } else {
      console.log('⚠️ Tailwind configs have different functionality - run npm run tailwind:sync to fix');
    }
  }
  
  // Check if config/tailwind.config.ts is synchronized
  const tsTailwindPath = path.resolve(config.configFiles['config/tailwind.config.ts']);
  if (fs.existsSync(tsTailwindPath)) {
    const tsTailwind = fs.readFileSync(tsTailwindPath, 'utf8');
    
    if (!tsTailwind.includes('tokens')) {
      console.log('⚠️ TypeScript Tailwind config is not using design tokens');
    }
  }
}

function checkCssConsistency() {
  console.log('\nChecking CSS file consistency...');
  
  // Check index.css for imports
  const indexCssPath = path.resolve('./src/styles/index.css');
  if (fs.existsSync(indexCssPath)) {
    const indexCss = fs.readFileSync(indexCssPath, 'utf8');
    
    // Check for required imports
    const requiredImports = [
      '@tailwind',
      './tokens/tokens.css',
      './typography.css',
      './variables.css'
    ];
    
    requiredImports.forEach(importStr => {
      if (indexCss.includes(importStr)) {
        console.log(`✅ index.css includes ${importStr}`);
      } else {
        console.log(`⚠️ index.css is missing ${importStr}`);
      }
    });
  }
  
  // Check App.jsx for correct CSS import
  const appFiles = ['src/App.js', 'src/App.jsx', 'src/App.tsx'];
  let appFile = null;
  
  for (const file of appFiles) {
    if (fs.existsSync(file)) {
      appFile = file;
      break;
    }
  }
  
  if (appFile) {
    const appContent = fs.readFileSync(appFile, 'utf8');
    
    if (appContent.includes("import './styles/index.css'")) {
      console.log(`✅ ${appFile} correctly imports styles/index.css`);
    } else if (appContent.includes("import './App.css'")) {
      console.log(`⚠️ ${appFile} imports App.css instead of styles/index.css`);
    } else {
      console.log(`⚠️ ${appFile} may be missing CSS imports`);
    }
  }
  
  // Check component CSS imports
  const componentDir = './src/components';
  if (fs.existsSync(componentDir)) {
    const componentFiles = fs.readdirSync(componentDir)
      .filter(file => /\.(js|jsx|ts|tsx)$/.test(file));
    
    componentFiles.forEach(file => {
      const filePath = path.join(componentDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const cssName = file.replace(/\.(js|jsx|ts|tsx)$/, '.css');
      const cssPath = path.join(componentDir, cssName);
      
      if (content.includes(`import './${cssName}'`) && fs.existsSync(cssPath)) {
        console.log(`✅ ${file} correctly imports its CSS`);
      } else if (content.includes(`import './${cssName}'`) && !fs.existsSync(cssPath)) {
        console.log(`⚠️ ${file} imports a non-existent CSS file: ${cssName}`);
      }
    });
  }
}

function findRedundantFiles() {
  console.log('\nFinding redundant files...');
  
  // List of known good files
  const keepFiles = new Set([
    ...Object.keys(config.cssFiles).map(f => path.resolve(f)),
    ...Object.keys(config.tokenFiles).map(f => path.resolve(f)),
    ...Object.keys(config.configFiles).map(f => path.resolve(f)),
    ...Object.keys(config.tokenScripts).map(f => path.resolve(f)),
    path.resolve('./src/App.css'),
    path.resolve('./enhanced-cleanup.js')
  ]);
  
  // Find all CSS, token, and config files
  let allFiles = [];
  
  config.scanDirectories.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir, { recursive: true })
          .filter(file => 
            /\.(css|scss|json)$/.test(file) || 
            file.includes('token') || 
            file.includes('tailwind') ||
            file === 'postcss.config.js'
          )
          .filter(file => !file.includes('node_modules'));
        
        allFiles.push(...files.map(file => path.resolve(path.join(dir, file))));
      }
    } catch (err) {
      console.error(`Error scanning directory ${dir}:`, err);
    }
  });
  
  // Find redundant files
  const redundantFiles = allFiles.filter(file => !keepFiles.has(file));
  
  // Report redundant files
  if (redundantFiles.length > 0) {
    console.log('The following files may be redundant:');
    redundantFiles.forEach(file => console.log(`  - ${file}`));
  } else {
    console.log('No redundant files found');
  }
  
  return redundantFiles;
}

function generateDocumentation() {
  console.log('\nGenerating documentation for project structure...');
  
  const docContent = `# Project Structure Documentation

## CSS Files
${Object.entries(config.cssFiles)
  .map(([file, desc]) => `- \`${file}\` - ${desc}`)
  .join('\n')}

## Token Files
${Object.entries(config.tokenFiles)
  .map(([file, desc]) => `- \`${file}\` - ${desc}`)
  .join('\n')}

## Config Files
${Object.entries(config.configFiles)
  .map(([file, desc]) => `- \`${file}\` - ${desc}`)
  .join('\n')}

## Token Management Scripts
${Object.entries(config.tokenScripts)
  .map(([file, desc]) => `- \`${file}\` - ${desc}`)
  .join('\n')}

## Import Structure
- \`App.jsx\` imports \`./styles/index.css\`
- \`index.css\` imports:
  - Tailwind directives
  - \`./tokens/tokens.css\`
  - \`./typography.css\`
  - \`./variables.css\`
- Component files import their own CSS files directly

## Build Process
- The build process uses the root \`tailwind.config.js\`
- Token synchronization ensures all token files are in sync

## Managing Styles
1. Edit design tokens in Figma
2. Use \`npm run tokens:sync\` to synchronize tokens
3. Use \`npm run tailwind:sync\` to keep Tailwind configs in sync
4. Use \`npm run tokens:verify\` to check token consistency
`;
  
  fs.writeFileSync('docs/css-structure.md', docContent);
  console.log('Documentation written to docs/css-structure.md');
}

// Main function to clean up the project
function enhancedCleanup() {
  console.log('Starting enhanced project cleanup...');
  
  // Create docs directory if it doesn't exist
  ensureDirExists('./docs');
  
  // Check config consistency
  checkConfigConsistency();
  
  // Check CSS consistency
  checkCssConsistency();
  
  // Find duplicate CSS imports
  findDuplicateCssImports();
  
  // Find redundant files
  const redundantFiles = findRedundantFiles();
  
  // Remove empty directories
  removeEmptyDirectories();
  
  // Generate documentation
  generateDocumentation();
  
  console.log('\nEnhanced cleanup complete!');
  
  if (redundantFiles.length > 0) {
    console.log(`\nFound ${redundantFiles.length} potentially redundant files.`);
    console.log('To remove these files, run:');
    console.log('node enhanced-cleanup.js --remove-redundant');
  }
}

// Check if we should remove redundant files
if (process.argv.includes('--remove-redundant')) {
  console.log('Removing redundant files...');
  const redundantFiles = findRedundantFiles();
  
  redundantFiles.forEach(file => {
    try {
      fs.unlinkSync(file);
      console.log(`Removed: ${file}`);
    } catch (err) {
      console.error(`Error removing ${file}:`, err);
    }
  });
} else {
  // Run the main cleanup function
  enhancedCleanup();
} 