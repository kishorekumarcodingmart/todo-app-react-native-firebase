import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';

interface IFromData {
  email: string;
  password: string;
  errMsg: string;
}

interface IForm {
  formData: IFromData;
  setFormData: React.Dispatch<React.SetStateAction<IFromData>>;
  handleSubmit: () => void;
}

interface IFormWrapper {
  title: string;
  form: IForm;
  alterNativeText: string;
  alterNativeNavigate: () => void;
  loadingStatus: boolean;
}

const FormWrapper = ({
  title,
  form,
  alterNativeText,
  alterNativeNavigate,
  loadingStatus,
}: IFormWrapper) => {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    loginWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#f1f3f6' : 'black',
    },
    formWrapper: {
      padding: 5,
      width: '80%',
    },
    formHeader: {
      fontSize: 25,
      color: theme === 'light' ? 'black' : 'white',
      marginBottom: 15,
    },
    errMsgText: {
      marginBottom: 15,
      color: 'red',
      fontSize: 15,
      fontWeight: '500',
    },
    input: {
      width: '100%',
      paddingLeft: 12,
      paddingRight: 12,
      backgroundColor: theme === 'light' ? 'white' : 'black',
      borderRadius: 8,
      marginBottom: 15,
      color: theme === 'light' ? 'black' : 'white',
      borderColor: theme === 'light' ? 'black' : 'white',
      borderWidth: 1,
    },
    submitButtonWrapper: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      borderColor: theme === 'light' ? 'black' : 'white',
      borderWidth: 1,
      marginBottom: 15,
    },
    submitButtonText: {
      textAlign: 'center',
      color: 'black',
      fontSize: 15,
    },
    alterNativeText: {
      color: theme === 'light' ? 'black' : 'white',
      textAlign: 'center',
    },
  });

  const {handleSubmit, formData, setFormData} = form;

  const handleChange = (e: string, type: 'email' | 'password') => {
    if (type === 'email') {
      setFormData(prev => {
        return {
          ...prev,
          email: e,
        };
      });
    } else {
      setFormData(prev => {
        return {
          ...prev,
          password: e,
        };
      });
    }
  };

  return (
    <View style={styles.loginWrapper}>
      <View style={styles.formWrapper}>
        <Text style={styles.formHeader}>{title}</Text>
        {formData.errMsg && (
          <Text style={styles.errMsgText}>{formData.errMsg}</Text>
        )}

        <TextInput
          value={formData.email}
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          onChangeText={e => handleChange(e, 'email')}
        />
        <TextInput
          value={formData.password}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          onChangeText={e => handleChange(e, 'password')}
        />
        <TouchableOpacity
          style={styles.submitButtonWrapper}
          onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {loadingStatus ? 'Loading...' : title}
          </Text>
        </TouchableOpacity>
        <Text onPress={alterNativeNavigate} style={styles.alterNativeText}>
          {alterNativeText}
        </Text>
      </View>
    </View>
  );
};

export default FormWrapper;
