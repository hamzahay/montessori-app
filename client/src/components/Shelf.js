import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default function Shelf (props) {
  const shelf = props.shelf
  const navigation = props.navigation

  function checkAuth () {
    // add auth checker later
    // navigation.navigate('ShelfDetail', { shelf }) if already registered
    navigation.navigate('Auth', { shelf })
  }

  return (
    <View style={styles.shelf} >
      <Button title={`Shelf ${shelf}`} onPress={() => checkAuth()} ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  shelf: {
    flex: 1,
    borderWidth: 1,
    margin: '10%'
  }
})