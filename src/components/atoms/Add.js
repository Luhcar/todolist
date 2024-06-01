import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Add = () => {
  return (
    <View>
      <View style={styles.btnAdd}>
        <Text style={styles.textAdd}>+</Text>
      </View>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: '#ffde69',
    borderColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 29,
  },
  textAdd: {
    fontSize: 60,
    fontWeight: '400',
    color: 'black',
    marginTop: -17,
    marginRight: 0,
  },
});
