import React from 'react';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/utils/RootNavigation';
import {HomeScreen} from './src/screens/HomeScreen';
import {ArticleDetails} from './src/screens/ArticleDetails';
import {ArticleWebView} from './src/screens/ArticleWebView';
import {ALAN_KEY} from '@env';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
        <Stack.Screen name="ArticleWebView" component={ArticleWebView} />
      </Stack.Navigator>
      <AlanView projectid={ALAN_KEY} />
    </NavigationContainer>
  );
};

export default App;
