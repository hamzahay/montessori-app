import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

export default function Book (props) {
  const book = props.book
  const activityIndex = props.activityIndex
  const navigation = props.navigation
  const userType = useSelector(state => state.user.userType)

  function toActivity () {
    if (userType === 'children') {
      navigation.navigate('Classroom', { activity: book, activityIndex })
    } else if (userType === 'parent') {
      navigation.navigate('ParentRoom', { activity: book })
    }
  }

  return (
    <View style={styles.container}>
      <Button title={ `${book}` } onPress={() => toActivity() } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  book: {

  }
})