const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths configuration
const paths = {
  // Source token files
  sourceTokens: path.resolve('./tokens/all-tokens.json'),
  transformedTokens: path.resolve('./tokens/transformed-tokens.json'),
  
  // Target locations
  stylesDir: path.resolve('./src/styles'),
  tokensDir: path.resolve('./src/styles/tokens'),
  
  // Files to be updated/synced
  tailwindConfig: path.resolve('./src/styles/tailwind.config.js'),
  rootTailwindConfig: path.resolve('./tailwind.config.js'),
  postcssConfig: path.resolve('./postcss.config.js'),
  appCss: path.resolve('./src/App.css'),
  indexCss: path.resolve('./src/styles/index.css'),
};

// Check if required packages are installed
function checkRequiredPackages() {
  const requiredPackages = [
    'style-dictionary',
    'tailwindcss',
    'autoprefixer',
    'postcss'
  ];
  
  let missingPackages = [];
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const allDependencies = {
      ...packageJson.dependencies || {},
      ...packageJson.devDependencies || {}
    };
    
    missingPackages = requiredPackages.filter(pkg => !allDependencies[pkg]);
    
    if (missingPackages.length > 0) {
      console.error(`Missing required packages: ${missingPackages.join(', ')}`);
      console.log('Installing missing packages...');
      
      execSync(`npm install --save-dev ${missingPackages.join(' ')}`, {
        stdio: 'inherit'
      });
      
      console.log('Required packages installed successfully.');
    } else {
      console.log('All required packages are already installed.');
    }
  } catch (err) {
    console.error('Error checking required packages:', err);
  }
}

// Ensure directories exist
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy file from source to destination
function copyFile(source, dest) {
  try {
    fs.copyFileSync(source, dest);
    console.log(`Copied ${source} to ${dest}`);
  } catch (err) {
    console.error(`Error copying ${source} to ${dest}:`, err);
  }
}

// Update import paths in tailwind.config.js
function updateTailwindConfig() {
  try {
    // Read the tailwind config file
    const tailwindConfigPath = paths.tailwindConfig;
    if (fs.existsSync(tailwindConfigPath)) {
      let content = fs.readFileSync(tailwindConfigPath, 'utf8');
      
      // Update the path to transformed-tokens.json
      content = content.replace(
        /require\(['"](.*)transformed-tokens\.json['"]\)/,
        `require('../../tokens/transformed-tokens.json')`
      );
      
      // Write back the updated config
      fs.writeFileSync(tailwindConfigPath, content);
      console.log(`Updated ${tailwindConfigPath}`);
      
      // Copy to root tailwind config if needed
      if (fs.existsSync(paths.rootTailwindConfig)) {
        // For root config, use a different path
        content = content.replace(
          /require\(['"](.*)transformed-tokens\.json['"]\)/,
          `require('./tokens/transformed-tokens.json')`
        );
        fs.writeFileSync(paths.rootTailwindConfig, content);
        console.log(`Updated ${paths.rootTailwindConfig}`);
      }
    } else {
      console.error(`Tailwind config file not found at ${tailwindConfigPath}`);
    }
  } catch (err) {
    console.error('Error updating tailwind config:', err);
  }
}

// Run Style Dictionary to generate token files
function generateTokens() {
  try {
    console.log('Running Style Dictionary to generate token files...');
    execSync('node config/sd.config.js', { stdio: 'inherit' });
    console.log('Token files generated successfully');
  } catch (err) {
    console.error('Error running Style Dictionary:', err);
  }
}

// Update or create App.js import of css
function updateAppCssImport() {
  try {
    const appCssPath = paths.appCss;
    const indexCssPath = paths.indexCss;
    
    // If App.css exists and index.css exists, we should update App.js to import index.css
    if (fs.existsSync(appCssPath) && fs.existsSync(indexCssPath)) {
      // Find App.js/jsx/tsx
      const appFiles = ['src/App.js', 'src/App.jsx', 'src/App.tsx'];
      let appFile = null;
      
      for (const file of appFiles) {
        if (fs.existsSync(file)) {
          appFile = file;
          break;
        }
      }
      
      if (appFile) {
        console.log(`Updating CSS import in ${appFile}...`);
        let content = fs.readFileSync(appFile, 'utf8');
        
        // Replace App.css import with styles/index.css
        content = content.replace(
          /import ['"]\.\/App\.css['"]/,
          `import './styles/index.css'`
        );
        
        fs.writeFileSync(appFile, content);
        console.log(`Updated CSS import in ${appFile}`);
      }
    }
  } catch (err) {
    console.error('Error updating App.css import:', err);
  }
}

// Sync tailwind config files using the dedicated script
function syncTailwindConfigs() {
  try {
    console.log('Synchronizing tailwind config files...');
    execSync('node sync-tailwind-configs.js', { stdio: 'inherit' });
    console.log('Tailwind config synchronization completed');
  } catch (err) {
    console.error('Error synchronizing tailwind configs:', err);
  }
}

// Clean up redundant files
function cleanupRedundantFiles() {
  // Files to be removed (relative to project root)
  const filesToRemove = [
    './backup/src/styles/tokens/tokens.css',
    './docs/design/tokens/figma-export.css',
  ];
  
  filesToRemove.forEach(file => {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Removed redundant file: ${filePath}`);
      } catch (err) {
        console.error(`Error removing ${filePath}:`, err);
      }
    }
  });
}

// Main function to run the sync process
function syncTokens() {
  console.log('Starting token synchronization...');
  
  // Check required packages
  checkRequiredPackages();
  
  // Ensure directories exist
  ensureDirExists(paths.stylesDir);
  ensureDirExists(paths.tokensDir);
  
  // Generate token files using Style Dictionary
  generateTokens();
  
  // Update tailwind config
  updateTailwindConfig();
  
  // Sync tailwind configs using the dedicated script
  syncTailwindConfigs();
  
  // Update App.css import in App.js
  updateAppCssImport();
  
  // Clean up redundant files
  cleanupRedundantFiles();
  
  console.log('Token synchronization completed!');
}

// Run the sync process
syncTokens(); 