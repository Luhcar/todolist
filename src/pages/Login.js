import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Label from '../components/atoms/Label';
import Input from '../components/atoms/Input';
import { getData, storeData } from '../storages/localStorage.js';
import axios from 'axios';

const Login = ({ navigation }) => {
  // Lebih Rapihnya
  const [LoginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  function submitLogin() {
    if (LoginForm.email == '') {
      Alert.alert('Email harus diisi');
      return;
    }

    if (LoginForm.password == '') {
      Alert.alert('Password harus diisi');
      return;
    }

    // Untuk melihat data yang sudah di simpan di local storage
    // getData('auth').then(async res => {
    //   console.log('Data dari local storage', res);
    // });

    axios.post('https://example-api.darms.my.id/api/login', LoginForm)
    .then((response) => {
      Alert.alert(`Login Berhasil, Selamat Datang ${response.data.user.name}`);

      // Menyimpan data ke local storage
      storeData('auth', response.data.user);
      storeData('token', response.data.token);

       // Jika sudah behasil login, maka akan direset menjadi kosong
    setLoginForm({
      email: '',
      password: '',
    });
    navigation.replace('Home');

      console.log(response.data);
    }).catch((error) => {
      Alert.alert('Login Gagal', error.message);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titlePage}>Welcome.</Text>  
      <Text style={styles.titlemini}>Make Your ToDo List</Text>
      <View style={styles.LoginForm}>
        <Input
          label="Email"
          placeholder="Insert Email"
          required
          keyboardType="email-address"
          value={LoginForm.email}
          onChange={(isiText) => {
            setLoginForm({
              ...LoginForm,
              email: isiText,
            });
          }}
        />

        <Input
          label="Password"
          placeholder="Insert Password"
          required
          secure
          value={LoginForm.password}
          onChange={(isiText) => {
            setLoginForm({
              ...LoginForm,
              password: isiText,
            });
          }}
        />

        {/* TOUCHABLE OPACITY */}
        <TouchableOpacity onPress={() => submitLogin()} style={styles.btnLogin}>
          <Text style={styles.btnLoginText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.register}>
          <Text style={styles.textDontHave}>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
    color: 'black',
  },
  titlemini: {
    fontSize: 20,
    color: 'black',
    marginTop: 15,
    marginLeft: 10,
  },
  labelLoginInput: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  btnLogin: {
    backgroundColor: '#ffde69',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
  },
  btnLoginText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginForm: {
    flex: 1,
    marginVertical: 100,
    marginHorizontal: 7,
  },
  textDontHave: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 20,
  },
  textRegister: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 7,
  },
  register: {
    flexDirection: 'row',
  },
});
