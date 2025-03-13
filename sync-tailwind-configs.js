const fs = require('fs');
const path = require('path');

// Paths configuration
const paths = {
  // Tailwind config files
  rootTailwindConfig: path.resolve('./tailwind.config.js'),
  stylesTailwindConfig: path.resolve('./src/styles/tailwind.config.js'),
};

// Function to update a tailwind config path
function updateTailwindConfigPath(filePath, targetPath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const pattern = /require\(['"](.*)transformed-tokens\.json['"]\)/;
  const match = content.match(pattern);
  
  if (match && match[1] !== targetPath) {
    content = content.replace(pattern, `require('${targetPath}transformed-tokens.json')`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated token path in ${filePath}`);
    return true;
  } else {
    console.log(`Token path in ${filePath} is already correct`);
    return false;
  }
}

// Function to sync both tailwind config files
function syncTailwindConfigs() {
  console.log('Starting Tailwind config synchronization...');
  
  // Make sure both files exist
  if (!fs.existsSync(paths.rootTailwindConfig)) {
    console.error(`Root tailwind.config.js not found at ${paths.rootTailwindConfig}`);
    return;
  }
  
  if (!fs.existsSync(paths.stylesTailwindConfig)) {
    console.error(`Styles tailwind.config.js not found at ${paths.stylesTailwindConfig}`);
    return;
  }
  
  // First, update paths in both files
  updateTailwindConfigPath(paths.rootTailwindConfig, './tokens/');
  updateTailwindConfigPath(paths.stylesTailwindConfig, '../../tokens/');
  
  // Then, copy the content from root to styles (preserving the path)
  let rootContent = fs.readFileSync(paths.rootTailwindConfig, 'utf8');
  let stylesContent = fs.readFileSync(paths.stylesTailwindConfig, 'utf8');
  
  // Get the transformed-tokens.json path from styles config to preserve it
  const stylesPathMatch = stylesContent.match(/require\(['"](.*)transformed-tokens\.json['"]\)/);
  const stylesPath = stylesPathMatch ? stylesPathMatch[1] : '../../tokens/';
  
  // Update root content with the correct path for styles
  rootContent = rootContent.replace(
    /require\(['"](.*)transformed-tokens\.json['"]\)/,
    `require('${stylesPath}transformed-tokens.json')`
  );
  
  // Write the updated content to styles config
  fs.writeFileSync(paths.stylesTailwindConfig, rootContent);
  console.log(`Synchronized content from root to styles config`);
  
  // Set the path back to correct one in root config
  updateTailwindConfigPath(paths.rootTailwindConfig, './tokens/');
  
  console.log('Tailwind config synchronization completed!');
}

// Run the sync
syncTailwindConfigs(); 