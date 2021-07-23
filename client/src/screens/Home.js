import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux'
import Shelf from '../components/Shelf'

export default function Home ({ navigation }) {
  const shelves = useSelector(state => state.shelves)

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Home</Text>
      </View>
      <View style={styles.shelfContainer}>
      { shelves ? shelves.map((shelf, index) => <Shelf key={index} shelf={shelf} navigation={navigation} />) : '' }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {

  },
  shelfContainer: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

