import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

interface IOption {
  text: string;
  type: 'navigate' | 'goBack' | 'logout';
  to: string;
}

interface INavbarProps {
  title: string;
  option: Array<IOption>;
}

const Navbar = ({title, option}: INavbarProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const theme = useColorScheme();

  const logoutFunction = (to: string) => {
    auth()
      .signOut()
      .then(() => navigation.navigate(to));
  };

  const handleOnPress = (
    valType: 'navigate' | 'goBack' | 'logout',
    to: string,
  ) => {
    if (valType === 'logout') {
      logoutFunction(to);
    }
    if (valType === 'navigate') {
      navigation.navigate(to);
    }
    if (valType === 'goBack') {
      navigation.goBack();
    }
  };

  const styles = StyleSheet.create({
    navbarWrapper: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? 'white' : 'black',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? 'black' : 'white',
    },
    navbarTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme === 'light' ? 'black' : 'white',
    },
    btnWrapper: {
      flexDirection: 'row',
      gap: 12,
    },
    logoutBtnWrapper: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 7,
      borderColor: theme === 'light' ? 'black' : 'white',
      borderWidth: 1,
    },
    logoutBtnText: {
      color: 'black',
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.navbarWrapper}>
      <Text style={styles.navbarTitle}>{title}</Text>
      <View style={styles.btnWrapper}>
        {option.map((val, index) => {
          return (
            <TouchableOpacity
              key={String(index)}
              onPress={() => handleOnPress(val.type, val.to)}
              style={styles.logoutBtnWrapper}>
              <Text style={styles.logoutBtnText}>{val.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Navbar;
