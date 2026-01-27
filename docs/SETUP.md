# PolydraIQ Setup Instructions

This document describes how to get the PolydraIQ standalone application running from this repository.

## 🧩 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- A modern browser with ES2020 support

## 🚀 Local Development

From the repository root:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open:

```text
http://localhost:3000
```

Hot module reloading (HMR) is enabled via Vite.

## 📦 Production Build

```bash
# Type-check the code
npm run type-check

# Lint the codebase
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## 🧪 Testing & Quality

See the following documents for more detail:

- [Testing Strategy](./TESTING.md)
- [Code Quality Report](./CODE_QUALITY_REPORT.md)

## 🔄 Keeping Your Fork Up To Date

If you fork this repository:

```bash
# Add an upstream remote
git remote add upstream https://github.com/reactlabs-dev/polydra-ai.git

# Fetch latest changes
git fetch upstream

# Rebase your main branch
git checkout main
git rebase upstream/main
```

## 🤝 Contributing

If you plan to contribute changes back to the main project, read:

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

These documents describe expectations around code style, testing, and community behavior.
