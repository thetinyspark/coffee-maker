# Contributing to Coffee Maker

We love your input! We want to make contributing to Coffee Maker as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `master`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coffee-maker.git
cd coffee-maker
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Coding Standards

### TypeScript Style Guide

- Use PascalCase for type names
- Use PascalCase for enum values
- Use camelCase for function names
- Use camelCase for property names and local variables
- Use whole words in names when possible
- Use `_` prefix for private properties

### Comments and Documentation

- Use JSDoc style comments for documentation
- Always include parameter and return type descriptions
- Include examples in complex component documentation

Example:
```typescript
/**
 * Represents a service that can be injected
 * @example
 * ```typescript
 * @Injectable()
 * class UserService {
 *     getUsers(): User[] {
 *         return [];
 *     }
 * }
 * ```
 */
export function Injectable() {
    // Implementation
}
```

### Testing

- Write tests for all new functionality
- Tests should be clear and maintainable
- Follow the existing test patterns in the codebase

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

Example:
```
feat(ioc): add support for circular dependencies

Added detection and resolution of circular dependencies in the IoC container.
Implemented using a dependency graph to detect cycles.

Closes #123
```

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the version numbers in package.json following [SemVer](http://semver.org/)
3. Add your changes to the CHANGELOG.md file
4. The PR may be merged once you have the sign-off of at least one other developer

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

- [TypeDoc](https://typedoc.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Jest](https://jestjs.io/docs/getting-started)