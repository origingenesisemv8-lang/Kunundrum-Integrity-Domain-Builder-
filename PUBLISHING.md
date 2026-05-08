# Publishing Guide

## 🚀 Publishing to npm

This package is configured to automatically publish to npm when you push a git tag.

### Prerequisites

1. **npm Account**: https://www.npmjs.com/signup
2. **GitHub Secrets**: Add your npm token to the repository

### Step 1: Add npm Token to GitHub

1. Go to https://www.npmjs.com/settings/tokens
2. Create a new **Automation** token (do NOT use Classic token)
3. Copy the token
4. Go to your GitHub repository
5. Navigate to **Settings** → **Secrets and variables** → **Actions**
6. Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
7. Click **Add secret**

### Step 2: Update Version in package.json

```bash
# Option 1: Manual edit
# Update "version" in package.json to the new version (e.g., 1.0.1, 1.1.0)

# Option 2: Use npm version command
npm version minor  # or major, patch, premajor, preminor, prepatch
```

### Step 3: Create Git Tag and Push

```bash
# Commit your changes first
git add package.json
git commit -m "Bump version to 1.0.1"

# Create git tag (must start with 'v')
git tag v1.0.1

# Push both commit and tag
git push origin main
git push origin v1.0.1
```

**That's it!** The GitHub Actions workflow will:
- ✅ Detect the git tag
- ✅ Run npm publish
- ✅ Create a GitHub Release with release notes
- ✅ Make it available on npm

### Step 4: Verify Publishing

```bash
# Check npm registry (wait 1-2 minutes after publishing)
npm view create-integrity-domain

# Or test the CLI
npx create-integrity-domain test-domain
```

---

## 📋 Workflow Details

The GitHub Actions workflow (`.github/workflows/publish.yml`) will:

1. Trigger on any tag push starting with `v` (e.g., `v1.0.0`)
2. Checkout the code
3. Setup Node.js 20
4. Install dependencies
5. Publish to npm using the `NPM_TOKEN` secret
6. Create a GitHub Release automatically

---

## 🔍 Troubleshooting

### "npm ERR! 403 Forbidden"
- Check that `NPM_TOKEN` is set correctly in GitHub Secrets
- Verify the token is an **Automation** token (not Classic)
- Make sure the package name `create-integrity-domain` is available on npm

### "git tag already exists"
```bash
# Delete local tag
git tag -d v1.0.1

# Delete remote tag
git push origin --delete v1.0.1

# Create new tag and push
git tag v1.0.2
git push origin v1.0.2
```

### Workflow didn't run
- Check **Actions** tab in GitHub to see if workflow ran
- Verify tag name starts with `v`
- Make sure `NPM_TOKEN` secret exists

---

## 💡 Tips

- Update README.md and CHANGELOG.md before publishing
- Test locally with `npm link` before publishing
- Use semantic versioning: MAJOR.MINOR.PATCH
- Add meaningful release notes when creating tags

---

## 📦 What Gets Published

When you publish, npm will include:
- ✅ `cli/index.js` - The CLI executable
- ✅ `package.json` - Metadata and bin entry
- ✅ `README.md` - Documentation
- ✅ Other root-level files

To exclude files, add them to `.npmignore`

---

**Happy publishing! 🎉**
