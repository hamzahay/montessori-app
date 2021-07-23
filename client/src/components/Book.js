import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

export default function Book (props) {
  const book = props.book
  const navigation = props.navigation
  const userType = useSelector(state => state.userType)

  function toActivity () {
    if (userType == 'children') {
      navigation.navigate('Classroom', { activity: book })
    } else if (userType == 'parent') {
      navigation.navigate('ParentRoom', { activity: book })
    }
  }

  return (
    <View style={styles.container}>
      <Button title={`Book ${book}`} onPress={() => toActivity() } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 'auto'
  },
  book: {

  }
})