import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Text, StyleSheet, useWindowDimensions, Easing, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import Draggable from 'react-native-draggable'

const BOX_SIZE = 100
const BOX_HALF_SIZE = BOX_SIZE / 2

export default function A1p3 () {
  const dimensions = useWindowDimensions()
  const divider = dimensions.width / 5

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Draggable
          renderSize={100}
          renderColor='orange'
          x={0}
          y={dimensions.height / 2 - 65 }
        >
          <Text style={styles.textStyle}>A</Text>
        </Draggable>
        <Draggable
          renderSize={100}
          renderColor='orange'
          x={ dimensions.width / 2}
          y={ dimensions.height / 2 - 65 }
        >
          <Text style={styles.textStyle}>B</Text>
        </Draggable>
        <Draggable
          renderText='C'
          renderSize={100}
          renderColor='orange'
          y={dimensions.height / 2 - 65 }
        >
          <Text style={styles.textStyle}>C</Text>
        </Draggable>
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