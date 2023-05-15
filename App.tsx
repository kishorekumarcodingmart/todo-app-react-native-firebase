import React, {Fragment, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import LoadingScreen from './Components/LoadingScreen';
import Navbar from './Components/Navbar';
import AddTodoModel from './Components/AddTodoModel';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return <LoadingScreen />;

  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!user ? 'Login' : 'Home'}>
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{header: () => <></>}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{header: () => <></>}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: () => (
                  <Navbar
                    title="Dashboard"
                    option={[
                      {
                        text: 'Add',
                        type: 'navigate',
                        to: 'AddTodoModel',
                      },
                      {text: 'Logout', type: 'logout', to: 'Login'},
                    ]}
                  />
                ),
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="AddTodoModel"
              component={AddTodoModel}
              options={{
                header: () => (
                  <Navbar
                    title="Add Todo"
                    option={[{text: 'Cancel', type: 'goBack', to: ''}]}
                  />
                ),
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};

export default App;
