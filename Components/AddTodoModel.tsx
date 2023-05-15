import {
  StyleSheet,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddTodoModel = () => {
  const [todo, setTodo] = useState('');

  const user = auth().currentUser?.uid;

  const theme = useColorScheme();

  const styles = StyleSheet.create({
    addTodoWrapper: {
      flex: 1,
      backgroundColor: theme === 'light' ? 'white' : 'black',
      alignItems: 'center',
      paddingTop: 12,
    },
    todoInput: {
      width: '90%',
      paddingLeft: 12,
      paddingRight: 12,
      backgroundColor: theme === 'light' ? 'white' : 'black',
      borderRadius: 8,
      color: theme === 'light' ? 'black' : 'white',
      borderColor: theme === 'light' ? 'black' : 'white',
      borderWidth: 1,
    },
    btnWrapper: {
      marginTop: 12,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 7,
      borderColor: theme === 'light' ? 'black' : 'white',
      borderWidth: 1,
      width: '90%',
    },
    btnText: {
      color: 'black',
      fontWeight: '500',
      textAlign: 'center',
    },
  });

  const createTodoFunction = () => {
    if (user) {
      firestore()
        .collection('Todo')
        .add({
          task: todo,
          time: firestore.FieldValue.serverTimestamp(),
          userId: user,
        })
        .then(() => {
          console.log('Data Added');
        });
    }
  };

  return (
    <View style={styles.addTodoWrapper}>
      <TextInput
        style={styles.todoInput}
        multiline={true}
        numberOfLines={5}
        onChangeText={todo => setTodo(todo)}
        value={todo}
        placeholder="Add Todo here..."
      />
      <TouchableOpacity style={styles.btnWrapper} onPress={createTodoFunction}>
        <Text style={styles.btnText}>Create Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoModel;
