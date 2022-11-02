import React from 'react';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/utils/RootNavigation';
import {HomeScreen} from './src/screens/HomeScreen';
import {ArticleDetails} from './src/screens/ArticleDetails';

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
      </Stack.Navigator>
      <AlanView
        projectid={
          '180c557ece62e952a5feb248f0c9bfa22e956eca572e1d8b807a3e2338fdd0dc/stage'
        }
      />
    </NavigationContainer>
  );
};

export default App;
