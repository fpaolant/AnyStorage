import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/stores'
import { NavigationContainer } from '@react-navigation/native';
import  RootNavigator from './src/navigation/RootNavigator';
import { navigationService } from './src/navigation/NavigationService';
import moment from 'moment';
import 'moment/locale/it'
// Set moment to IT
moment().locale('it');

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationService}>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
      <StatusBar style='auto'/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


