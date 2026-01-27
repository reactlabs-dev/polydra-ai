# Contributing to PolydraIQ

First off, thank you for your interest in contributing – this project is intended to be a high-quality reference implementation for enterprise-grade React + TypeScript apps.

## 🧭 Guiding Principles

- **Quality over quantity** – small, well-tested, well-documented changes are preferred.
- **User impact first** – prioritize clarity, accessibility, and reliability.
- **Consistency** – follow existing patterns in code, tests, and docs.

## 🧱 Getting Set Up

1. **Fork** the repository on GitHub.
2. **Clone** your fork:

   ```bash
   git clone https://github.com/<your-username>/polydra-ai.git
   cd polydra-ai
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the app**:

   ```bash
   npm run dev
   ```

5. **Run tests and lint** before you start changing things:

   ```bash
   npm run lint
   npm test
   ```

## 🔄 Branching & Workflow

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feature/concise-description
   ```

2. Make focused commits with clear messages:

   ```bash
   git commit -m "feat: add composite score badge"
   ```

3. Keep your branch up to date with `main`:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

4. Open a Pull Request (PR) against `main` with:
   - A concise description of the change
   - Screenshots or GIFs for UI changes
   - Notes on testing (commands run and results)

## 🧪 Expectations for Code Changes

- **TypeScript**: types should be explicit for public APIs and non-trivial data structures.
- **Testing**: new functionality should come with tests; bug fixes should include regression tests where practical.
- **Accessibility**: UI changes must respect keyboard navigation and basic WCAG color contrast.
- **Error Handling**: fail gracefully with clear user-facing messaging.

See [TESTING.md](./TESTING.md) and [CODE_QUALITY_REPORT.md](./CODE_QUALITY_REPORT.md) for more on standards and patterns.

## 📄 Documentation

- Update relevant docs in `docs/` when you change behavior or public APIs.
- Keep commit and PR descriptions aligned with user-visible changes.

## 🔐 Secrets & Environment Variables

- Never commit **API keys, access tokens, passwords, or private keys**.
- Keep all environment-specific values in local `.env*` files, which are already ignored via `.gitignore`.
- If you accidentally push a secret, **revoke/rotate it immediately** and note this in your PR or issue.
- Use placeholder values (e.g., `https://api.example.com`, `YOUR_API_KEY_HERE`) in examples and docs.

## 🤝 Code of Conduct

By participating, you agree to uphold the project’s [Code of Conduct](./CODE_OF_CONDUCT.md).

If you’re unsure whether a change is appropriate, feel free to open a draft PR or issue first to discuss.
