# Quick Start - Detox E2E Testing

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd /Users/cacheung/mobilesdk/containerWithUITest/aepsdk-react-native/apps/AEPSampleAppNewArchEnabled
npm install
```

### Step 2: Install Detox CLI (one-time)
```bash
npm install -g detox-cli
```

### Step 3: Generate Native Folders (Expo - first time only)
```bash
npx expo prebuild
```

### Step 4: Platform-Specific Setup

#### iOS Setup
```bash
cd ios
pod install
cd ..
```

#### Android Setup
Create an Android emulator named `Pixel_7_API_34` (or update `.detoxrc.js` with your emulator name)

### Step 5: Run Tests!

#### iOS
```bash
npm run e2e:ios
```

#### Android
```bash
npm run e2e:android
```

## ✅ What Gets Tested

### Mock Data Tests (~35 tests)
- ✅ Navigation to ContentCardsView
- ✅ 7 View Types (Remote, Inbox, Carousel, etc.)
- ✅ 3 Themes (Light, Dark, System)
- ✅ 3 Templates (Small, Large, Image Only)
- ✅ Content rendering with mock data
- ✅ Empty state display

### API Integration Tests (~25 tests)
- ✅ Remote content fetching from Adobe API
- ✅ Track action functionality
- ✅ Content refresh and real-time updates
- ✅ Error handling and edge cases

## 📁 Test Files

```
e2e/
├── contentCards.mock.test.ts    # Mock data tests
├── contentCards.api.test.ts     # API integration tests
└── helpers.ts                   # Helper functions
```

## 🎯 Run Specific Tests

```bash
# Only mock data tests
detox test -c ios.sim.debug e2e/contentCards.mock.test.ts

# Only API tests
detox test -c ios.sim.debug e2e/contentCards.api.test.ts

# Specific test suite
detox test -c ios.sim.debug --testNamePattern="Theme Switching"
```

## 🐛 Quick Troubleshooting

**"Cannot find simulator/emulator"**
```bash
# iOS: List simulators
xcrun simctl list devices

# Android: List emulators
emulator -list-avds
```

**"Tests timeout"**
- Ensure Metro bundler is running
- Increase timeout in `e2e/jest.config.js`
- Restart simulator/emulator

**"Build fails"**
```bash
# iOS
cd ios && pod install && cd ..
npm run detox:build:ios

# Android
cd android && ./gradlew clean && cd ..
npm run detox:build:android
```

## 📸 Test Results

After tests run, check:
- **Screenshots**: `e2e/artifacts/{platform}/screenshots/`
- **Logs**: Test output in terminal
- **Reports**: Jest test results

## 📚 Need More Help?

- **Detailed Setup**: Read `e2e/SETUP.md`
- **Test Documentation**: Read `e2e/README.md`
- **Overview**: Read `DETOX_TESTING.md`

## 🎉 That's It!

You're now testing ContentCardsView features with Detox!

**Total Test Coverage**: ~60 test cases across mock and API scenarios

---

**Pro Tips:**
- Run tests before committing UI changes
- Check screenshots when tests fail
- Add testIDs to new UI elements
- Write tests as you build features

