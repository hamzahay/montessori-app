import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default function Ebook (props) {
  const detail = props.ebook
  const navigation = props.navigation

  function toBookReader () {
    navigation.navigate('EbookReader', { detail: detail })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title={`ebook ${detail}`} onPress={() => toBookReader()} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    marginHorizontal: 3,
  }
})