import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TodoComponent from '../Components/TodoComponent';
import LoadingScreen from '../Components/LoadingScreen';

interface IData {
  [x: string]: string;
}

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [data, setData] = useState<undefined | IData[]>(undefined);

  const user = auth().currentUser?.uid;

  useEffect(() => {
    firestore()
      .collection('Todo')
      .where('userId', '==', user)
      .get()
      .then(result => {
        let val = result.docs.map(doc => {
          return {...doc.data()};
        });
        console.log(val);
        setData(val);
      });
  }, []);

  const theme = useColorScheme();

  const styles = StyleSheet.create({
    homeWrapper: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#f1f3f6' : 'black',
      paddingTop: 12,
      paddingBottom: 12,
    },
  });

  if (typeof data === undefined) {
    return <LoadingScreen />;
  }

  if (typeof data === 'object' && data.length === 0) {
    return <Text>Nothing here!</Text>;
  }
  return (
    <View style={styles.homeWrapper}>
      <TodoComponent />
    </View>
  );
};

export default Home;
