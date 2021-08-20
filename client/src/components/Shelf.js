import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import * as SecureStore from 'expo-secure-store'

export default function Shelf (props) {
  const shelf = props.shelf
  const navigation = props.navigation

  async function checkAuth () {
    try {
      const result = await SecureStore.getItemAsync('access_token')
      if (result) {
        navigation.navigate('ShelfDetail', { shelf })
      } else {
        navigation.navigate('Auth', { shelf })
      }
    } catch (err) {
      console.log("err", err)
    }
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