import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import InputTodo from './atoms/InputTodo';
import Add from './atoms/Add';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddTodo = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <InputTodo placeholder={'what your todo?'} />
        <Add />
      </View>

      {/* <View style={styles.line}></View> */}
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'lightgrey',
    marginVertical: 15,
  },
});
