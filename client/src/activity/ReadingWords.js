import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Card () {

  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.segment}>
        <View style={cardStyles.pictureCard}>
          <View style={cardStyles.pic}></View>
          <View style={cardStyles.box}></View>
        </View>
        <View style={cardStyles.pictureCard}>
          <View style={cardStyles.pic}></View>
          <View style={cardStyles.box}></View>
        </View>
        <View style={cardStyles.pictureCard}>
          <View style={cardStyles.pic}></View>
          <View style={cardStyles.box}></View>
        </View>
      </View>
      <View style={cardStyles.segment}>
        <View style={cardStyles.pictureCard}>
          <View style={cardStyles.pic}></View>
          <View style={cardStyles.box}></View>
        </View>
        <View style={cardStyles.pictureCard}>
          <View style={cardStyles.pic}></View>
          <View style={cardStyles.box}></View>
        </View>
        <View style={cardStyles.pictureCard}>
          <View style={cardStyles.pic}></View>
          <View style={cardStyles.box}></View>
        </View>
      </View>
      <View style={cardStyles.listBox}></View>
    </View>
  )
}

const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 5,
    borderColor: 'pink',
    margin: 5,
    flexDirection: 'row'
  },
  segment: {
    flex: 2,
    flexDirection: 'column'
  },
  pictureCard: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
  },
  pic: {
    flex: 3,
    borderWidth: 1,
    borderColor: 'red',
    margin: 5,
  },
  box: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: 'blue'
  },
  listBox: {
    flex: 1,
    borderWidth: 1,
    margin: 5
  }
})

export default function ReadingWords () {

  return (
    <View style={styles.container}>
      <Card />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})