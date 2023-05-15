import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';

const TodoComponent = () => {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    todoComponentWrapper: {
      borderWidth: 1,
      borderColor: theme === 'light' ? 'black' : 'white',
      borderRadius: 4,
      width: '95%',
      padding: 5,
      backgroundColor: theme === 'light' ? 'white' : 'black',
      marginBottom: 12,
    },
    todoCreatedDateTime: {
      color: theme === 'light' ? 'black' : 'white',
      fontWeight: '500',
      fontSize: 14,
    },
    todoText: {
      color: theme === 'light' ? 'black' : 'white',
    },
  });

  return (
    <View style={styles.todoComponentWrapper}>
      <Text style={styles.todoCreatedDateTime}>
        {new Date().toLocaleTimeString()}
      </Text>
      <Text style={styles.todoText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </View>
  );
};

export default TodoComponent;
