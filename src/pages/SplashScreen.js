import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getData } from '../storages/localStorage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      getData('auth').then(async res => {
        if (res) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      });
    }, 2500);
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo/todolist.png')}
        style={{ marginBottom: 0 }}
      />
      <Text style={styles.text}>ToDo List</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fedd86',
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 30,
  },
});
