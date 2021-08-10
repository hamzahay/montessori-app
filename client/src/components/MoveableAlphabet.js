import React, { useRef, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, useWindowDimensions, PanResponder, FlatList } from 'react-native'
import Draggable from 'react-native-draggable'

export default function MoveableAlphabet (props) {

  const currentLMA = props.currentLMA
  const dimensions = useWindowDimensions()
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

  return (
      <View style={styles.container}>
        <View style={{
          borderWidth: 1,
          borderColor: 'red',
          flex: 1
        }}></View>
        <FlatList style={{
          height: dimensions.height,
          borderWidth: 1,
          borderColor: 'green',
          flexDirection: 'column',
          flex: 1
        }}>
          <Draggable 
            children={<Text>I</Text>}
          />
        </FlatList>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 100,
    alignSelf: 'center',
    marginHorizontal: 35,
  }
})