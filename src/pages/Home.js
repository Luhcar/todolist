import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getData, removeData } from '../storages/localStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/atoms/Input';
import Add from '../components/atoms/Add';
import InputTodo from '../components/atoms/InputTodo';
import AddTodo from '../components/AddTodo';

const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData('auth').then(async res => {
      if (!res) {
        navigation.replace('Login');
      } else {
        setUser(res);
      }
    });
  });

  function submitLogout() {
    removeData('auth').then(() => {
      navigation.replace('Login');
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTodo}>TODO</Text>
      <Text style={styles.textList}>LIST</Text>
      <View>
        <AddTodo />
      </View>
      <TouchableOpacity onPress={submitLogout} style={styles.btn}>
        <Text style={styles.btntext}>
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textTodo: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 15,
    color: 'black',
  },
  textList: {
    fontSize: 50,
    fontWeight: '400',
    marginTop: -10,
    marginLeft: 15,
    color: '#ffde69',
  },
  addTodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  btn: {
    backgroundColor: '#ffde69',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btntext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
