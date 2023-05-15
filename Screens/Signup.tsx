import React, {useState, useReducer} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import FormWrapper from '../Components/FormWrapper';
import auth from '@react-native-firebase/auth';
import {INITIAL_STATE, reducerFunction} from '../Utils/reducer';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errMsg: '',
  });

  const [Loading, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleSubmit = () => {
    setFormData(prev => {
      return {
        ...prev,
        errMsg: '',
      };
    });
    dispatch({type: 'FETCH_START'});
    auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(res => {
        console.log(res.user.uid);
        navigation.navigate('Home');
        dispatch({type: 'FETCH_SUCCESS'});
      })
      .catch(error => {
        console.log(error.code);
        dispatch({type: 'FETCH_ERROR'});
        if (error.code === 'auth/email-already-in-use') {
          setFormData(prev => {
            return {
              ...prev,
              errMsg: 'That email address is already in use!',
            };
          });
        }

        if (error.code === 'auth/network-request-failed') {
          setFormData(prev => {
            return {
              ...prev,
              errMsg: 'Network Request Failed',
            };
          });
        }

        if (error.code === 'auth/weak-password') {
          setFormData(prev => {
            return {
              ...prev,
              errMsg: 'Weak Password',
            };
          });
        }

        if (error.code === 'auth/invalid-email') {
          setFormData(prev => {
            return {
              ...prev,
              errMsg: 'That email address is invalid!',
            };
          });
        }
      });
  };
  return (
    <FormWrapper
      title="Signup"
      form={{formData, setFormData, handleSubmit}}
      alterNativeText="Joined us before? Login"
      alterNativeNavigate={() => navigation.navigate('Login')}
      loadingStatus={Loading.loading}
    />
  );
};

export default Signup;
