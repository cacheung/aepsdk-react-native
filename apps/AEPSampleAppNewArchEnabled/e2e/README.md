# E2E Tests for ContentCardsView

This directory contains end-to-end tests for the ContentCardsView features using Detox framework.

## Quick Start

```bash
# Install dependencies
npm install

# Generate native folders (Expo only, first time)
npx expo prebuild

# iOS
npm run e2e:ios

# Android
npm run e2e:android
```

## Test Coverage

### Mock Data Tests (`contentCards.mock.test.ts`)

Tests using mock/local data without API calls:

- ✅ **Navigation** - Navigate to ContentCardsView
- ✅ **View Type Selection** - Switch between 7 view types:
  - Remote
  - Inbox
  - Carousel
  - Container with Styling
  - Empty
  - Custom Card View
  - Templates
- ✅ **Theme Switching** - Light, Dark, and System themes
- ✅ **Template Switching** - Small Image, Large Image, Image Only
- ✅ **Content Card Rendering** - Verify cards render correctly with mock data
- ✅ **Empty State** - Verify empty state displays correctly
- ✅ **Theme & Template Combinations** - All combinations work correctly
- ✅ **View Persistence** - State maintained across operations

**Total: ~35 test cases**

### API Integration Tests (`contentCards.api.test.ts`)

Tests using real Adobe Experience Platform API:

- ✅ **Remote Content Fetching** - Load content from API
- ✅ **Track Action** - Track user actions and refresh content
- ✅ **Loading States** - Handle loading indicators
- ✅ **Error Handling** - Gracefully handle API errors
- ✅ **Multiple Track Actions** - Sequential and rapid actions
- ✅ **Surface-based Loading** - Platform-specific surfaces (iOS/Android)
- ✅ **Content Refresh** - Real-time content updates
- ✅ **Edge Cases** - Network errors, empty responses, recovery

**Total: ~25 test cases**

## Test Files

```
e2e/
├── README.md                    # This file
├── SETUP.md                     # Detailed setup instructions
├── jest.config.js               # Jest configuration for Detox
├── setup.ts                     # Test setup and teardown
├── helpers.ts                   # Helper functions
├── contentCards.mock.test.ts    # Mock data tests
└── contentCards.api.test.ts     # API integration tests
```

## Helper Functions

### Navigation
- `navigateToContentCards()` - Navigate to ContentCardsView from home screen

### View Management
- `selectViewType(type)` - Select view type (remote, inbox, carousel, etc.)
- `switchTheme(theme)` - Switch theme (light, dark, system)
- `switchTemplate(template)` - Switch template (smallimage, largeimage, imageonly)

### Actions
- `trackAction(actionName)` - Track an action with given name

### Verification
- `verifyContentCardContainerVisible(testId?)` - Verify container is visible
- `verifyEmptyStateVisible()` - Verify empty state is displayed

### Utilities
- `scrollToElement(elementId, scrollViewId?)` - Scroll to element
- `waitForLoadingComplete(timeout?)` - Wait for loading
- `takeScreenshot(name)` - Capture screenshot

## Running Tests

### All tests
```bash
# Build and test iOS
npm run e2e:ios

# Build and test Android
npm run e2e:android
```

### Individual test files
```bash
# Mock data tests
detox test -c ios.sim.debug e2e/contentCards.mock.test.ts

# API integration tests
detox test -c android.emu.debug e2e/contentCards.api.test.ts
```

### Specific test suites
```bash
# Run only Navigation tests
detox test -c ios.sim.debug --testNamePattern="Navigation"

# Run only Theme Switching tests
detox test -c ios.sim.debug --testNamePattern="Theme Switching"
```

### Build only
```bash
npm run detox:build:ios
npm run detox:build:android
```

### Test only (using existing build)
```bash
npm run detox:test:ios
npm run detox:test:android
```

## Configuration

### Detox Config (`.detoxrc.js`)

Configurations for iOS and Android:
- **iOS Simulator**: iPhone 15 Pro
- **Android Emulator**: Pixel_7_API_34

### Jest Config (`e2e/jest.config.js`)

- Test timeout: 120 seconds
- Max workers: 1 (sequential execution)
- Setup file: `e2e/setup.ts`

## Screenshots

Tests automatically capture screenshots at key points:
- View transitions
- Theme changes
- Template switches
- Content rendering
- Error states

Saved to: `e2e/artifacts/{platform}/`

## testID Reference

All interactive elements have testIDs for Detox:

### Navigation
- `content-cards-nav-button` - Main navigation button

### View Selection
- `view-picker-button` - View type picker button
- `view-picker-modal` - View picker modal
- `view-option-{type}` - View option buttons (e.g., `view-option-inbox`)
- `modal-cancel-button` - Modal cancel button

### Theme Switcher
- `theme-light` - Light theme button
- `theme-dark` - Dark theme button
- `theme-system` - System theme button

### Template Switcher
- `template-smallimage` - Small Image template button
- `template-largeimage` - Large Image template button
- `template-imageonly` - Image Only template button

### Track Action
- `track-action-input` - Track action input field
- `track-action-button` - Track button

### Content Cards
- `content-cards-container` - Main container
- `content-card-container-{view}` - Specific view containers
- `content-card-empty-state` - Empty state component
- `content-cards-template-list` - Template list (FlatList)

## Test Data

### Mock Data

Located in `/mocks/contentCards/`:
- `container/mockSettings.ts` - Container settings for each view type
- `templates/demoitems.ts` - Template demo items
- `templates/smallImage.ts` - Small image templates
- `templates/largeImage.ts` - Large image templates
- `templates/imageOnly.ts` - Image only templates

### API Data

Tests use real Adobe Experience Platform API with surfaces:
- **Android**: `rn/android/remote_image`
- **iOS**: `rn/ios/remote_image`

## Best Practices

1. **Wait for elements** - Always use `waitFor()` with timeouts
2. **Clear state** - Tests reload app before each test
3. **Take screenshots** - Helps debug failures
4. **Use helpers** - Reuse helper functions for common operations
5. **Test isolation** - Each test should be independent

## Troubleshooting

### Common Issues

**"Cannot find element"**
- Element may not be visible yet - increase timeout
- Check testID matches exactly
- Verify element is actually rendered

**"Test timeout"**
- Network might be slow - increase timeout
- Check Metro bundler is running
- Verify simulator/emulator is responsive

**"App crashes"**
- Check logs with `detox test --loglevel trace`
- Verify native dependencies are installed
- Rebuild app: `npm run detox:build:{platform}`

**"Flaky tests"**
- Add appropriate waits
- Use `device.reloadReactNative()` between tests
- Check for race conditions

### Debug Mode

Run with verbose logging:
```bash
detox test -c ios.sim.debug --loglevel trace
```

### View Test Artifacts

After test run, check:
```
e2e/artifacts/
├── ios/
│   ├── screenshots/
│   └── logs/
└── android/
    ├── screenshots/
    └── logs/
```

## CI/CD

These tests are designed to run in CI/CD pipelines. See `SETUP.md` for GitHub Actions example.

## Resources

- [Detox Documentation](https://wix.github.io/Detox/)
- [Detox Matchers](https://wix.github.io/Detox/docs/api/matchers)
- [Detox Actions](https://wix.github.io/Detox/docs/api/actions)
- [Jest API](https://jestjs.io/docs/api)

## Contributing

When adding new features to ContentCardsView:
1. Add appropriate `testID` props
2. Add helper functions if needed
3. Write tests covering the new functionality
4. Update this README

## Support

For issues or questions:
1. Check `SETUP.md` for detailed setup instructions
2. Review troubleshooting section
3. Check Detox documentation
4. Contact the team

