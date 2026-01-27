# 🧪 PolydraIQ Testing Strategy

## Overview

PolydraIQ implements an **enterprise-grade, object-oriented testing architecture** designed for reliability, maintainability, and scalability. The testing approach eliminates common issues like test flakiness, mock inconsistency, and maintenance overhead through centralized systems and custom utilities.

## 🎯 Testing Philosophy

### Core Principles

- **Centralized Mock Management**: All mocks in one place for consistency
- **Object-Oriented Architecture**: Reusable components and inheritance patterns
- **Reliability First**: Deterministic results, no flaky tests
- **Developer Experience**: Easy to write, easy to maintain, easy to debug
- **Production-Ready**: Enterprise-grade standards throughout

### Testing Pyramid

```
    🔺 E2E Tests
   🔺🔺 Integration Tests  
  🔺🔺🔺 Unit Tests
 🔺🔺🔺🔺 Mock Layer
```

## 🏗️ Architecture

### Centralized Mock System (`/src/__mocks__/`)

- `setup.ts` – Global configuration that imports all mock modules and configures Jest
- `three.ts` – Three.js/WebGL mock with a realistic API surface
- `MockCube3D.tsx` – Test-friendly 3D component replacement
- `primereact.tsx` – PrimeReact component mocks

### Custom Test Utilities (`/src/test-utils/`)

`index.tsx` exports a custom `render` that wraps components with the right providers (router, error boundary, etc.) so tests stay focused on behavior.

Example pattern:

```typescript
const renderComponent = (props = {}) =>
  render(<ComponentName {...defaultProps} {...props} />);
```

Data factories (e.g., `createMockFactor`, `createMockAssessment`) keep test data consistent and readable.

## ✅ Test Suite Status

At the time of documentation:

- All test suites pass
- No known flaky tests
- Coverage is high across components and utilities (80%+)

You can always regenerate precise coverage numbers locally.

## 🔧 Test Categories

- **Unit Tests** – Component isolation, utilities, hooks, error handling
- **Integration Tests** – Component interaction, data flow, router behavior
- **Accessibility Tests** – Keyboard navigation, ARIA attributes, semantic structure
- **Performance-Oriented Checks** – Ensuring no obvious regressions in render behavior

## 🛠️ Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run a specific test file
npm test -- --runTestsByPath src/app/components/calculator/Calculator.spec.tsx
```

## 🧪 Patterns & Examples

### Component Tests

```typescript
describe('ComponentName', () => {
  it('renders expected UI', () => {
    render(<ComponentName />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onSubmit = jest.fn();
    render(<ComponentName onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
```

### Hook Tests

```typescript
const { result } = renderHook(() => useAssessment());
expect(result.current.compositeScore).toBe(0);
```

## 📦 CI Integration

A typical GitHub Actions workflow for this project looks like:

```yaml
name: CI
on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage --watchAll=false
```

## ✅ Best Practices

- Use the custom `render` from `src/test-utils` rather than `render` directly
- Prefer testing user-visible behavior over implementation details
- Always include at least one error-state test for non-trivial components
- Keep mocks centralized instead of inlining them ad hoc

## 📈 Future Enhancements

- Visual regression testing (e.g., Playwright or Chromatic)
- Browser matrix testing for critical flows
- Automatic flaky-test detection in CI

The goal is to keep this codebase an exemplar of how to test a modern React + TypeScript application at an enterprise standard.
