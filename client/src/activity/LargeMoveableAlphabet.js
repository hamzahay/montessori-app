import React, { useState, useRef, useEffect } from 'react'
import { Animated, View, Text, Button, ScrollView, StyleSheet, useWindowDimensions } from 'react-native'
import Draggable from 'react-native-draggable'
import { DraxList, DraxProvider, DraxView } from 'react-native-drax'

const currentLMA = 'A'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function LargeMoveableAlphabet () {
  const dimensions = useWindowDimensions()
  const [match, setMatch] = useState(true)
  const cardPosition = useRef(new Animated.Value(0 - dimensions.width / 2)).current
  const [panConfig1, setPanConfig1] = useState({
    x: dimensions.width - 130,
    y: (dimensions.height / 2 - 65) - 100,
    z: 1,
    letter: 'A'
  })
  const [panConfig2, setPanConfig2] = useState({
    x: dimensions.width - 130,
    y: (dimensions.height / 2 - 65) + 100,
    z: 1,
    letter: 'B'
  })


  useEffect(() => {
    comeIn()
  }, [])

  function comeIn () {
    Animated.spring(cardPosition, {
      toValue: 0,
      friction: 7,
      delay: 1000,
      useNativeDriver: true
    }).start()
  }

  function comeOut () {
    Animated.spring(cardPosition, {
      toValue: 0 - dimensions.width / 2,
      speed: 1,
      delay: 200,
      useNativeDriver: true
    }).start()
  }
  
  return (
    <View style={styles.container}>

      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <Button title="Start" onPress={() => comeIn()} />
        <Button title="End" onPress={() => comeOut()} />
      </View>

      <Animated.View
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          justifyContent: 'center',
          top: dimensions.height / 2 - 100 ,
          backgroundColor: 'orange',
          transform: [{ translateX: cardPosition }]
        }}
      >
        <Text style={styles.currentLMA}>{ currentLMA }</Text>
      </Animated.View>

        <Draggable
          x={ panConfig1.x}
          y={ panConfig1.y}
          z={ panConfig1.z}
          onPressIn={() => setPanConfig1({ ...panConfig1, z: 2}) }
          onDragRelease={(event) => {
            setPanConfig1({ ...panConfig1, z: 1 })
              if (event.nativeEvent.pageX < 230) {
                console.log('its in')
                if (panConfig1.letter === currentLMA) {
                  console.log('its a match')
                  setTimeout(() => {
                    comeOut()
                  }, 1000)
                  // setPanConfig1({ ...panConfig1, x: 550, y: 275 })
                } else {
                  console.log('not a match')
                }
              }
          }}
          shouldReverse
          renderColor={'orange'}
          children={<Text style={styles.textStyle}>{ panConfig1.letter }</Text>}
        />

        <Draggable
          x={ panConfig2.x}
          y={ panConfig2.y}
          z={ panConfig2.z}
          onPressIn={() => setPanConfig2({ ...panConfig2, z: 2}) }
          onDragRelease={(event) => {
            setPanConfig2({ ...panConfig2, z: 1 })
              if (event.nativeEvent.pageX < 230) {
                console.log('its in')
                if (panConfig2.letter === currentLMA) {
                  console.log('its a match')
                  setTimeout(() => {
                    comeOut()
                  }, 1000)
                  // setPanConfig2({ ...panConfig2, x: 550, y: 275 })
                } else {
                  console.log('not a match')
                }
              }
          }}
          shouldReverse
          renderColor={'orange'}
          children={<Text style={styles.textStyle}>{ panConfig2.letter }</Text>}
        />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentLMA: {
    fontSize: 200,
    alignSelf: 'center',
    marginHorizontal: 35,
  },
  textStyle: {
    fontSize: 100,
    alignSelf: 'center',
    marginHorizontal: 35,
  }
})