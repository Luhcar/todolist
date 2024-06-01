import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Label = ({text, required}) => {
  return (
    
    <Text style={styles.text}>
        {text} 
        {required ? <Text style={{color: 'red'}}>{' '}*</Text> : ''}
    </Text>

  )
}

export default Label

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 19,
        fontWeight: '500',
        marginBottom: 5,
    }
})