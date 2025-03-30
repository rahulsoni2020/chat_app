const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2]; // Example: "Custom1/Pp1"
const useTypeScript = process.argv.includes("--ts"); // Check if --ts flag is provided

if (!inputPath) {
  console.error("❌ Please provide a component path! Example: node generateComponent.js Custom1/Pp1");
  process.exit(1);
}

// Extract folder and component name
const pathParts = inputPath.split("/");
const componentName = pathParts.pop(); // Last part is the component name
const componentFolder = path.join(__dirname,"frontend", "src", "components", ...pathParts, componentName);
const fileExtension = useTypeScript ? "tsx" : "jsx";
const componentFile = path.join(componentFolder, `${componentName}.${fileExtension}`);
const cssFile = path.join(componentFolder, `${componentName}.css`);

// Component template
const componentTemplate = `import "./${componentName}.css";

const ${componentName} = () => {
  return (
    <div className="container">
      ${componentName} works!
    </div>
  );
};

export default ${componentName};
`;

fs.mkdirSync(componentFolder, { recursive: true });

// Create component file and CSS file
fs.writeFileSync(componentFile, componentTemplate);
fs.writeFileSync(cssFile, '');

console.log(`✅ Component ${componentName} created at ${componentFolder}`);
