import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import { storeData } from '../storages/localStorage';

const SignUp = ({ navigation }) => {
  const [SignupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  function submitSignup() {
    if (SignupForm.username == '') {
      Alert.alert('Username harus diisi');
      return;
    }
    if (SignupForm.email == '') {
      Alert.alert('Email harus diisi');
      return;
    }
    if (SignupForm.password == '') {
      Alert.alert('Password harus diisi');
      return;
    }
    Alert.alert('Sign Up Berhasil');

    storeData('auth', SignupForm);

    navigation.replace('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#debc40" />
      <Text style={styles.tittle}>ToDo</Text>
      <Text style={styles.tittlePage}>Create Account</Text>
      <Text style={styles.tittleMini}>
        Please enter your data to create an account
      </Text>
      <View style={styles.SignupForm}>
        <Input
          label="Username"
          placeholder="John Doe"
          required
          value={SignupForm.username}
          onChange={(isiText) => {
            setSignupForm({
              ...SignupForm,
              username: isiText,
            });
          }}
        />
        <Input
          label={'Email'}
          placeholder={'JohnDoe@example.com'}
          required={true}
          keyboardType="email-address"
          value={SignupForm.email}
          onChange={(isiText) => {
            setSignupForm({
              ...SignupForm,
              email: isiText,
            });
          }}
        />
        <Input
          label={'Password'}
          placeholder={'**********'}
          required={true}
          secure
          value={SignupForm.password}
          onChange={isiText => {
            setSignupForm({
              ...SignupForm,
              password: isiText,
            });
          }}
        />

        <TouchableOpacity
          onPress={() => submitSignup()}
          style={styles.btnSignup}
        >
          <Text style={styles.btnSignupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  tittle: {
    fontSize: 65,
    fontWeight: '900',
    color: '#ffde69',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  tittlePage: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 30,
    marginHorizontal: 15,
    color: 'black',
  },
  tittleMini: {
    fontSize: 15,
    color: 'grey',
    marginTop: 3,
    marginHorizontal: 15,
  },
  SignupForm: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 8,
  },
  btnSignup: {
    backgroundColor: '#ffde69',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    height: 45,
  },
  btnSignupText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
