import React, {useState, useReducer} from 'react';
import FormWrapper from '../Components/FormWrapper';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {INITIAL_STATE, reducerFunction} from '../Utils/reducer';

const Login = () => {
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
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(res => {
        console.log(res.user.uid);
        navigation.navigate('Home');
        dispatch({type: 'FETCH_SUCCESS'});
      })
      .catch(error => {
        dispatch({type: 'FETCH_ERROR'});

        if (error.code === 'auth/user-not-found') {
          setFormData(prev => {
            return {
              ...prev,
              errMsg: 'Email address is not Found!',
            };
          });
        }

        if (error.code === 'auth/wrong-password') {
          setFormData(prev => {
            return {
              ...prev,
              errMsg: 'Password is invalid!',
            };
          });
        }
      });
  };

  return (
    <FormWrapper
      title="Login"
      form={{formData, setFormData, handleSubmit}}
      alterNativeText="New to Todo? Register"
      alterNativeNavigate={() => navigation.navigate('Signup')}
      loadingStatus={Loading.loading}
    />
  );
};

export default Login;
