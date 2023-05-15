import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  const theme = useColorScheme();
  const styles = StyleSheet.create({
    loadingScreenWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#f1f3f6' : 'black',
    },
    loadingText: {
      color: theme === 'light' ? 'black' : 'white',
      fontSize: 20,
    },
  });

  return (
    <View style={styles.loadingScreenWrapper}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
