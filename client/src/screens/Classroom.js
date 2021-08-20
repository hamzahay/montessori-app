import React, { useState } from 'react'
import { Text, View, Button, StyleSheet, TextInput, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import SandpaperLetter from '../activity/SandpaperLetters'
import LargeMoveableAlphabet from '../activity/LargeMoveableAlphabet'
import ObjectMoveableAlphabet from '../activity/ObjectMoveableAlphabet'

export default function Classroom ({ route, navigation }) {
  const dimensions = useWindowDimensions()
  const { activityIndex } = route.params
  const books = useSelector(state => state.shelf.currentShelf[0].book)
  const [parentPin, setParentPin] = useState('')
  const [showModal, setShowModal] = useState(false)

  function toParentRoom () {
    if (showModal) {
      setShowModal(false)
      setParentPin('')
      navigation.navigate('ParentRoom', { activity: books[activityIndex] })
    } else if (!showModal) {
      setShowModal(true)
    }
  }

  function activityComponent () {
    const activity = books[activityIndex]

    switch (activity) {
      case 'Sandpaper Letter':
        return ( <SandpaperLetter /> )
      case 'Large Moveable Alphabet':
        return ( <LargeMoveableAlphabet />)
      case 'Object Moveable Alphabet':
        return( <ObjectMoveableAlphabet />)
      default:
        return (
          <View>
            <Text>Activity Room</Text>
          </View>
        )
       
    }
  }

  function toHome () {
    navigation.navigate('Home')
  }

  function toNextActivity () {
    navigation.navigate('Classroom', { activityIndex: activityIndex + 1 })
  }

  function toPrevActivity () {
    navigation.navigate('Classroom', { activityIndex: activityIndex - 1 })
  }

  return (
    <View style={styles.container}>

      <View style={styles.topContainer}>

        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly' }}>
          <Button title="Parent Room" onPress={() => toParentRoom()} />
          { showModal ? <Button title="Cancel" onPress={() => setShowModal(false)} /> : <View></View> }
          { showModal ? 
            <TextInput 
              style={styles.input} 
              onChangeText={text => setParentPin()}
              placeholder="ENTER PARENT PIN"
            /> : <View></View> 
          }
        </View>

        <View style={[{ flexDirection: 'row' }]}>
          <View style={styles.navigationContainer}>
            { activityIndex != 0 ? <Button title="<-" onPress={() => toPrevActivity() } /> : <View></View> }
          </View>

          <View style={styles.navigationContainer}>
            { activityIndex < books.length - 1 ? <Button title="->" onPress={() => toNextActivity() } /> : <View></View> }
          </View>
        </View>

        <View style={styles.toHome}>
          <Button title="Home" onPress={() => toHome()} />
        </View>

      </View>

      <View style={styles.activityContainer} >
        { activityComponent() }
      </View>

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
    justifyContent: 'space-between',
    padding: 3
  },
  bottomContainer: {
    flex: 1
  },
  navigationContainer: {
    alignSelf: 'center',
    paddingHorizontal: 3
  },
  navigationContainerLeft: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    position: 'absolute'
  },
  navigationContainerRight: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    position: 'absolute'
  },
  activityContainer: {
    flex: 1,
  },
  toHome: {
    width: 125,
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 5,
  },
  modal: {
    flexDirection: 'row'
  }
})