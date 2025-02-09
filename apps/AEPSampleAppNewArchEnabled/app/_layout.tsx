import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {  
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Home Screen' }} />
      <Drawer.Screen name="CoreView" options={{ title: 'Core/Lifecycle/Signal' }} />
      <Drawer.Screen name="ProfileView" options={{ title: 'UserProfile' }} />
      <Drawer.Screen name="EdgeView" options={{ title: 'Edge' }} />
      <Drawer.Screen name="EdgeIdentityView" options={{ title: 'EdgeIdentity' }} />
      <Drawer.Screen name="ConsentView" options={{ title: 'Consent' }} />
      <Drawer.Screen name="EdgeBridgeView" options={{ title: 'Edge Bridge' }} />
      <Drawer.Screen name="AssuranceView" options={{ title: 'Assurance' }} />
    </Drawer>
  </ThemeProvider>
  );
}
