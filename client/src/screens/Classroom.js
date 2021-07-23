import React, { useState } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'
import { useSelector } from 'react-redux'

export default function Classroom ({ route, navigation }) {
  const { activity } = route.params
  const books = useSelector(state => state.currentShelf[0].book)
  const [parentPin, setParentPin] = useState('')
  const [showModal, setShowModal] = useState(false)

  function toParentRoom () {
    console.log('toParentRoom')
    // add input parent pin before navigation
    if (showModal) {
      setShowModal(false)
      setParentPin('')
      navigation.navigate('ParentRoom', { activity })
    } else if (!showModal) {
      setShowModal(true)
    }
  }

  function toHome () {
    navigation.navigate('Home')
  }

  function toNextActivity () {
    navigation.navigate('Classroom', { activity: activity + 1 })
  }

  function toPrevActivity () {
    navigation.navigate('Classroom', { activity: activity - 1 })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Button title="Parent Room" onPress={() => toParentRoom()} />
        { showModal ? <Button title="Cancel" onPress={() => setShowModal(false)} /> : '' }
        { showModal ? 
          <TextInput 
            style={styles.input} 
            onChangeText={text => setParentPin()}
            placeholder="ENTER PARENT PIN"
          /> : '' 
        }
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.navigationContainer}>
          { activity != 1 ? <Button title="<-" onPress={() => toPrevActivity() } /> : <View></View> }
        </View>
        <View style={styles.activityContainer} >
          <View style={styles.toHome}>
            <Button title="Home" onPress={() => toHome()} />
          </View>
          <Text>Activity Room</Text>
          <Text>{ `Activity ${activity}` }</Text>
        </View>
        <View style={styles.navigationContainer}>
          { activity < books.length ? <Button title="->" onPress={() => toNextActivity() } /> : <View></View> }
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  topContainer: {
    flexDirection: 'row-reverse',
    gap: 5,
  },
  middleContainer: {
    flex: 6,
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1
  },
  navigationContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  activityContainer: {
    flex: 14,
    borderWidth: 1,
    padding: 15,
    margin: 5
  },
  toHome: {
    width: 125
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 5
  },
  modal: {
    flexDirection: 'row'
  }
})