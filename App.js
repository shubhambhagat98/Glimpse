import React from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/utils/RootNavigation';
import {HomeScreen} from './src/screens/HomeScreen';
import {ArticleDetails} from './src/screens/ArticleDetails';
import {ArticleWebView} from './src/screens/ArticleWebView';
import {ALAN_KEY} from '@env';
import {MenuProvider} from 'react-native-popup-menu';
import {Walkthrough} from './src/components/walkthrough/Walkthrough';
import {usePersistStore} from './src/store/PersistStore';
import {useStore} from './src/store/Store';

const Stack = createNativeStackNavigator();
const App = () => {
  const isOnboardingDone = usePersistStore(state => state.isOnboardingDone);
  const isRehydrated = usePersistStore(state => state.isRehydrated);

  if (isRehydrated) {
    return (
      <MenuProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={isOnboardingDone ? 'Home' : 'AlanWalkthrough'}
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
            <Stack.Screen name="AlanWalkthrough" component={Walkthrough} />
          </Stack.Navigator>
          {isOnboardingDone && <AlanView projectid={ALAN_KEY} />}
        </NavigationContainer>
      </MenuProvider>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" style={styles.activityIndicatorStyle} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  activityIndicatorStyle: {
    // flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
