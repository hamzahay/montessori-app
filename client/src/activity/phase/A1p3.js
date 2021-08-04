import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Text, StyleSheet, useWindowDimensions, Easing, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import Draggable from 'react-native-draggable'

const BOX_SIZE = 100
const BOX_HALF_SIZE = BOX_SIZE / 2

export default function A1p3 () {
  const dimensions = useWindowDimensions()
  const divider = dimensions.width / 5
  const [reverse, setReverse] = useState(true)
  const [pan1Config, setPan1Config] = useState({ x: (dimensions.width / 2 - 65) - 150 , y: dimensions.height / 2 - 65, z: 1, reverse: true })
  const [pan2Config, setPan2Config] = useState({ x: (dimensions.width / 2 - 65), y: dimensions.height / 2 - 65, z: 1, reverse: true })
  const [pan3Config, setPan3Config] = useState({ x: (dimensions.width / 2 - 65) + 145, y: dimensions.height / 2 - 65, z: 1, reverse: true })
  const [test, setTest] = useState({ isTrue: false })
  const match = true

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Draggable
          renderColor='orange'
          x={ pan1Config.x }
          y={ pan1Config.y }
          z={ pan1Config.z }
          shouldReverse={pan1Config.reverse}
          onPressIn={() => setPan1Config({ ...pan1Config, z: 2 })}
          onDragRelease={(event) => {
            setPan1Config({ ...pan1Config, z: 1 })
            if (event.nativeEvent.pageX > 580 && event.nativeEvent.pageY > 290) {
              if (match == true) {
                console.log('its a match')
                setPan1Config({ ...pan1Config, x: 550, y: 275 })
              }
            } else {
              console.log('no match')
            }
          }}
          children={<Text style={styles.textStyle}>A</Text>}
        >
        </Draggable>
        <Draggable
          renderSize={100}
          renderColor='orange'
          x={ pan2Config.x }
          y={ pan2Config.y }
          z={ pan2Config.z }
          shouldReverse={pan2Config.reverse}
          onPressIn={() => setPan2Config({ ...pan2Config, z: 2 })}
          onDragRelease={(event) => {
            setPan2Config({ ...pan2Config, z: 1 })
            if (event.nativeEvent.pageX > 580 && event.nativeEvent.pageY > 290) {
              if (match == true) {
                console.log('its a match')
                setPan2Config({ ...pan1Config, x: 550, y: 275 })
              }
            } else {
              console.log('no match')
            }
          }}
          children={<Text style={styles.textStyle}>B</Text>}
        >
        </Draggable>
        <Draggable
          renderSize={100}
          renderColor='orange'
          width={(dimensions.width / 2 - 65)}
          x={ pan3Config.x }
          y={ pan3Config.y }
          z={ pan3Config.z }
          shouldReverse={pan3Config.reverse}
          onPressIn={() => setPan2Config({ ...pan3Config, z: 2 })}
          onDragRelease={(event) => {
            setPan3Config({ ...pan3Config, z: 1 })
            if (event.nativeEvent.pageX > 580 && event.nativeEvent.pageY > 290) {
              if (match == true) {
                console.log('its a match')
                setPan3Config({ ...pan1Config, x: 550, y: 275 })
              }
            } else {
              console.log('no match')
            }
          }}
          children={<Text style={styles.textStyle}>C</Text>}
        >
        </Draggable>
        <View style={{
          position: 'absolute',
          borderWidth: 1,
          height: 150,
          left: dimensions.width / 2 - 0.5,
        }}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  cardContainer: {
    flex: 1,
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 100,
    alignSelf: 'center',
    marginHorizontal: 35,
  }
})