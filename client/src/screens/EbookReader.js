import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, Button, StyleSheet } from 'react-native'

export default function EbookReader ({ route, navigation }) {
  const { detail } = route.params
  const ebooks = useSelector(state => state.shelf.ebooks)

  function toNextEbook () {
    navigation.navigate('EbookReader', { detail: detail + 1 })
  }

  function toPrevEbook () {
    navigation.navigate('EbookReader', { detail: detail - 1 })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Button title="Library" onPress={() => navigation.navigate('Library')} />
      </View>
      <View style={styles.buttomContainer}>
        <View style={styles.navigationContainer}>
          { detail != 1 ? <Button title="<-" onPress={() => toPrevEbook()} /> : <View></View> }
        </View>
        <View style={styles.readerBox}> 
          <Text>{ `Ebook ${detail}` }</Text>
        </View>
        <View style={styles.navigationContainer}>
          { detail < ebooks.length ? <Button title="->" onPress={() => toNextEbook()} /> : <View></View> }
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  buttomContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  navigationContainer: {
    flex: 1,
    padding: 15,
    alignSelf: 'center'
  },
  readerBox: {
    flex: 14,
    borderWidth: 1,
  }
})