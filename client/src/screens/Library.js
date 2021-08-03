import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View, Button, StyleSheet } from 'react-native'
import Ebook from '../components/Ebook'

export default function Library ({ navigation }) {
const ebooks = useSelector(state => state.ebooks)

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.buttomContainer}>
        <Text>Library</Text>
      <View style={styles.ebooksContainer}>
        { ebooks ? ebooks.map((ebook, index) => <Ebook key={index} ebook={ebook} navigation={navigation}  />)  
        : <View></View> }
      </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  buttomContainer: {
    flex: 1,
    borderWidth: 1,
    textAlign: 'center',
  },
  ebooksContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
  }
})