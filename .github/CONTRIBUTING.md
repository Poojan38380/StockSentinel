# 🤝 Contributing to Signalist

First off, thank you for considering contributing to Signalist! It's people like you that make Signalist such a great tool for the trading community. 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🚀 Getting Started

### Ways to Contribute

- 🐛 **Report bugs** - Found something broken? Let us know!
- 💡 **Suggest features** - Have an idea? We'd love to hear it!
- 📝 **Improve documentation** - Help others understand the project better
- 🎨 **Design improvements** - Make Signalist more beautiful and user-friendly
- 🔧 **Code contributions** - Fix bugs or implement new features
- 🧪 **Write tests** - Help us maintain code quality
- 🌍 **Translations** - Make Signalist accessible to more people

### Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Read the documentation** - Familiarize yourself with the project
3. **Try the live demo** - Understand how the app works
4. **Set up your environment** - Follow the development setup guide

## 💻 Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm
- MongoDB (local or Atlas)
- Git

### Installation Steps

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/StockSentinel.git
cd signalist

# 3. Add upstream remote
git remote add upstream https://github.com/Poojan38380/StockSentinel.git

# 4. Install dependencies
npm install

# 5. Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 6. Start development server
npm run dev

# 7. Open http://localhost:3000
```

### Environment Setup

Get your API keys from:
- **MongoDB**: https://www.mongodb.com/cloud/atlas
- **Finnhub**: https://finnhub.io
- **Inngest**: https://www.inngest.com

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please:
1. **Search existing issues** to avoid duplicates
2. **Test on the latest version** to ensure it's not already fixed
3. **Gather information** about your environment

When creating a bug report, include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information
- Console errors or logs

Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml)

### 💡 Suggesting Features

We love new ideas! Before suggesting:
1. **Check the roadmap** - It might already be planned
2. **Search existing feature requests** - Others might want the same thing
3. **Consider if it fits the project vision** - Keep Signalist focused

When suggesting features, include:
- Clear problem statement
- Proposed solution
- Use cases and benefits
- Alternative approaches considered
- Willingness to contribute

Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.yml)

### 🔧 Code Contributions

#### Good First Issues

Look for issues labeled:
- `good first issue` - Perfect for newcomers
- `help wanted` - We'd love your help!
- `beginner-friendly` - Great starting point

#### Feature Implementation

1. **Discuss first** - Comment on the issue or create a discussion
2. **Get approval** - Wait for maintainer feedback before starting large features
3. **Create a branch** - Use a descriptive name: `feature/your-feature-name`
4. **Write tests** - Ensure your code is well-tested
5. **Update docs** - Keep documentation in sync

## 🎨 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ DO: Use proper types
interface StockData {
  symbol: string;
  price: number;
  change: number;
}

// ❌ DON'T: Use 'any'
function getData(): any { }

// ✅ DO: Use descriptive names
const fetchStockPrice = async (symbol: string) => { }

// ❌ DON'T: Use vague names
const fetch = async (s: string) => { }
```

### React Best Practices

```typescript
// ✅ DO: Use functional components with hooks
const MyComponent = ({ data }: Props) => {
  const [state, setState] = useState();
  return <div>{data}</div>;
}

// ✅ DO: Memoize expensive computations
const expensiveValue = useMemo(() => 
  calculateExpensiveValue(data), 
  [data]
);

// ✅ DO: Use proper cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### File Organization

```
src/
├── app/              # Next.js pages and routes
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   └── [Feature]/   # Feature-specific components
├── lib/             # Utilities and helpers
│   ├── actions/     # Server actions
│   └── utils.ts     # Helper functions
├── hooks/           # Custom React hooks
├── types/           # TypeScript definitions
└── database/        # Database models and config
```

### Styling Guidelines

```tsx
// ✅ DO: Use Tailwind utilities
<div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">

// ✅ DO: Use cn() for conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)}>

// ❌ DON'T: Mix inline styles with Tailwind
<div className="p-4" style={{ padding: '16px' }}>
```

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(watchlist): add real-time price updates

Implemented WebSocket connection for live price streaming.
Includes automatic reconnection and error handling.

Closes #123

---

fix(search): resolve keyboard navigation bug

Fixed issue where arrow keys weren't working in search.

Fixes #456

---

docs: update installation instructions

Added detailed steps for MongoDB Atlas setup
```

### Commit Best Practices

```bash
# ✅ DO: Write clear, concise messages
git commit -m "feat(auth): add password reset functionality"

# ❌ DON'T: Be vague
git commit -m "fixed stuff"

# ✅ DO: Commit logical chunks
git add src/components/Auth/PasswordReset.tsx
git commit -m "feat(auth): add password reset component"

# ❌ DON'T: Commit everything at once
git add .
git commit -m "lots of changes"
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch** with the latest changes
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests** and ensure they pass
   ```bash
   npm run lint
   npm run build
   ```

3. **Test thoroughly** on multiple browsers if UI changes

4. **Update documentation** if you changed functionality

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested locally
- [ ] Screenshots/videos added for UI changes
- [ ] Commit messages follow conventions

### After Submitting

1. **Respond to feedback** - Be open to suggestions
2. **Make requested changes** - Address reviewer comments
3. **Keep it updated** - Rebase if conflicts arise
4. **Be patient** - Reviews take time

### Review Timeline

- **Small PRs**: Usually reviewed within 1-2 days
- **Medium PRs**: 2-4 days
- **Large PRs**: May take up to a week

## 🎯 Priority Areas

We're especially interested in contributions for:

### 🔥 High Priority
- **Price Alerts** - Real-time notification system
- **Portfolio Tracking** - Track actual investments
- **Mobile Responsiveness** - Improve mobile experience
- **Performance** - Optimize loading times
- **Accessibility** - WCAG 2.1 compliance

### 🌟 Nice to Have
- **Dark/Light Theme Toggle** - Theme customization
- **Multi-language Support** - i18n implementation
- **Options Analysis** - Options chain and Greeks
- **Social Features** - Share watchlists
- **Advanced Charts** - Custom indicators

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test
npm test -- WatchlistTable

# Check test coverage
npm test -- --coverage
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { WatchlistTable } from './WatchlistTable';

describe('WatchlistTable', () => {
  it('should render stock symbols', () => {
    const stocks = [{ symbol: 'AAPL', company: 'Apple' }];
    render(<WatchlistTable initialWatchlist={stocks} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });
});
```

## 🆘 Getting Help

### Where to Ask

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and community chat
- **Pull Request Comments** - Specific code questions

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🌟 Recognition

Contributors are recognized in:
- **README.md** - Contributors section
- **GitHub Contributors** - Automatic recognition
- **Release Notes** - Feature contributions highlighted

## 📬 Contact

- **Project Maintainer**: [@Poojan38380](https://github.com/Poojan38380)
- **Email**: Via GitHub issues/discussions
- **Live App**: [stock-sentinel-umber.vercel.app](https://stock-sentinel-umber.vercel.app)

---

## 💖 Thank You!

Your contributions make Signalist better for everyone. Whether you're fixing typos, adding features, or helping others, your work is appreciated!

**Happy Coding! 🚀**

---

*This guide is adapted from successful open-source projects. If you have suggestions to improve it, please submit a PR!*

