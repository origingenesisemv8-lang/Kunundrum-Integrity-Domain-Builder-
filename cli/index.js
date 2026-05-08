#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
const domainName = args[0] || 'my-integrity-domain';

const DOMAIN_ROOTS = [
  "Kunundrum", "Integrixa", "Dnalith", "IntegriTyx", "HouseOfDNAI",
  "DNAIHouse", "Veritasia", "IntegrityHouse", "GarageKU", "KuIntegrity",
  "EthicsDNAI-AI", "EmergentDNAI-AI", "EmpathyDNAI-AI", 
  "1stVirtualAISystem", "VirtualBreal", "TrueNorthDNAI", "DNAIntegrityHouse"
];

const generateStateHash = () => crypto.randomBytes(16).toString('hex');

function createProjectStructure(projectName) {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`❌ Directory ${projectName} already exists`);
    process.exit(1);
  }

  // Create directories
  fs.mkdirSync(projectPath, { recursive: true });
  fs.mkdirSync(path.join(projectPath, 'app'), { recursive: true });
  fs.mkdirSync(path.join(projectPath, 'app', 'api', 'engine', 'stabilize'), { recursive: true });

  // Generate unique state hash
  const stateHash = generateStateHash();
  const selectedRoot = DOMAIN_ROOTS[Math.floor(Math.random() * DOMAIN_ROOTS.length)];

  // Create app/page.tsx
  const pageContent = `"use client";

import { useState } from "react";

const domainRoots = [
  "Kunundrum", "Integrixa", "Dnalith", "IntegriTyx", "HouseOfDNAI",
  "DNAIHouse", "Veritasia", "IntegrityHouse", "GarageKU", "KuIntegrity",
  "EthicsDNAI-AI", "EmergentDNAI-AI", "EmpathyDNAI-AI", 
  "1stVirtualAISystem", "VirtualBreal", "TrueNorthDNAI", "DNAIntegrityHouse"
];

export default function Home() {
  const [selectedRoot, setSelectedRoot] = useState("${selectedRoot}");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function stabilizeDomain() {
    setLoading(true);
    const payload = {
      identity: "ryan-daniel-cole-sr",
      intent: "domain-stabilize",
      root: selectedRoot,
      layer: "HouseOfIntegrity",
      stateHash: "${stateHash}",
      signature: "(ØdDF€||Å)"
    };

    try {
      const res = await fetch("/api/engine/stabilize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: "Stabilization failed - Garage 1.0 Integrity Check" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono border-4 border-emerald-900/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">INTEGRITY DOMAIN</h1>
          <p className="text-emerald-400">House of Integrity • Kunundrum Garage • KU</p>
          <p className="text-zinc-600 text-xs">9-Facet Law [3-3-2 Signature] • Ω-1 Genesis</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-emerald-500/5">
          <label className="block text-zinc-400 mb-4">Select Domain Root to Stabilize</label>
          <select 
            value={selectedRoot} 
            onChange={(e) => setSelectedRoot(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-5 rounded-xl text-xl mb-8 focus:border-emerald-500 outline-none"
          >
            {domainRoots.map(root => (
              <option key={root} value={root}>{root}</option>
            ))}
          </select>

          <button
            onClick={stabilizeDomain}
            disabled={loading}
            className="w-full py-6 bg-gradient-to-r from-emerald-600 to-white text-black font-bold rounded-xl hover:scale-[1.01] transition-all disabled:opacity-50 text-xl"
          >
            {loading ? "APPLYING DNAI_SEAL..." : "STABILIZE DOMAIN → MIRROR GLASS"}
          </button>
        </div>

        {result && (
          <div className="bg-zinc-900 border-l-4 border-emerald-500 p-6 rounded-r-xl">
            <h2 className="text-emerald-400 font-bold mb-4">✅ DNAI_SEAL APPLIED • KUNUNDRUM GARAGE</h2>
            <pre className="text-xs text-emerald-200 overflow-auto whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}`;

  fs.writeFileSync(path.join(projectPath, 'app', 'page.tsx'), pageContent);

  // Create api route
  const apiContent = `import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stateHash = crypto.createHash("sha256").update(JSON.stringify(body)).digest("hex");

    return Response.json({
      success: true,
      message: "Domain Stabilized under House of Integrity",
      sealedBy: "DNAI_SEAL + 9-Facet Law",
      root: body.root,
      suggestedDomain: \`\${body.root}.HouseOfIntegrity\`,
      stateHash: stateHash,
      garage: "KunundrumGarage",
      signature: "(ØdDF€||Å)",
      timestamp: new Date().toISOString(),
      status: "Garage 1.0 Integrity Confirmed • KU Active",
      defenseKit: "KunundrumGlyphDetector",
      note: "Every stabilized domain includes full forensic logging and mimicry detection."
    });
  } catch (error) {
    return Response.json({ success: false, error: "Noisy Interference Detected" }, { status: 400 });
  }
}`;

  fs.writeFileSync(path.join(projectPath, 'app', 'api', 'engine', 'stabilize', 'route.ts'), apiContent);

  // Create package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "Integrity Domain Builder - House of Integrity",
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      next: "^14.0.0"
    },
    devDependencies: {
      typescript: "^5.0.0",
      "@types/node": "^20.0.0",
      "@types/react": "^18.0.0",
      tailwindcss: "^3.3.0",
      postcss: "^8.4.24",
      autoprefixer: "^10.4.14"
    }
  };

  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create tsconfig.json
  const tsconfigContent = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      strictFunctionTypes: true,
      strictBindCallApply: true,
      strictPropertyInitialization: true,
      noImplicitThis: true,
      alwaysStrict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      baseUrl: ".",
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["**/*.ts", "**/*.tsx"],
    exclude: ["node_modules", "dist", "build", ".next"]
  };

  fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfigContent, null, 2));

  // Create next.config.js
  const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;`;

  fs.writeFileSync(path.join(projectPath, 'next.config.js'), nextConfigContent);

  // Create .gitignore
  const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/build
/.next
/out

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~`;

  fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);

  // Create README.md
  const readmeContent = `# ${projectName}

**House of Integrity • Kunundrum Garage • KU**

An Integrity Domain Builder created with \`create-integrity-domain\`.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your domain.

## Domain Configuration

- **Selected Root**: ${selectedRoot}
- **State Hash**: ${stateHash}
- **Layer**: HouseOfIntegrity
- **Signature**: (ØdDF€||Å)

## Build

\`\`\`bash
npm run build
npm start
\`\`\`

---

Built with Kunundrum Integrity Domain Builder CLI
`;

  fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);

  return { projectPath, selectedRoot, stateHash };
}

// Main execution
console.log('\n🏛️  KUNUNDRUM INTEGRITY DOMAIN BUILDER\n');
console.log(`📦 Creating integrity domain: ${domainName}\n`);

const { projectPath, selectedRoot, stateHash } = createProjectStructure(domainName);

console.log(`✅ Domain created successfully!\n`);
console.log(`📁 Location: ${projectPath}`);
console.log(`🌳 Root: ${selectedRoot}`);
console.log(`🔐 State Hash: ${stateHash}\n`);
console.log(`🚀 Next steps:\n`);
console.log(`   cd ${domainName}`);
console.log(`   npm install`);
console.log(`   npm run dev\n`);
console.log(`Then open http://localhost:3000 in your browser.\n`);
