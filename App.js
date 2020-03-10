import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Container from './components/Container';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Container />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
