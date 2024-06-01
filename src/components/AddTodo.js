import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputTodo from './atoms/InputTodo'
import Add from './atoms/Add'

const AddTodo = () => {
  return (
    <View style={styles.container}>
      <InputTodo
        placeholder={'what your todo?'}
      />
      <Add />
    </View>
  )
}

export default AddTodo

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
})