import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GestureDetector, {
  GestureRecorder,
  GesturePath,
  Cursor
} from 'react-native-gesture-detector'

const aGesture = {
  Coil: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 17.90179443359375,
      y: -10.048370361328125,
    },
    {
      x: 39.241058349609375,
      y: -13.32171630859375,
    },
    {
      x: 59.419647216796875,
      y: -10.270660400390625,
    },
    {
      x: 73.14730834960938,
      y: 9.146896362304688,
    },
    {
      x: 73.14730834960938,
      y: 30.360504150390625,
    },
    {
      x: 73.14730834960938,
      y: 55.90510559082031,
    },
    {
      x: 77.72320556640625,
      y: 75.81193542480469,
    },
    {
      x: 80.75894165039062,
      y: 98.05467224121094,
    },
    {
      x: 74.66519165039062,
      y: 77.43028259277344,
    },
    {
      x: 73.14730834960938,
      y: 55.62220764160156,
    },
    {
      x: 56.957366943359375,
      y: 36.575042724609375,
    },
    {
      x: 35.71832275390625,
      y: 35.05580139160156,
    },
    {
      x: 6.7982177734375,
      y: 41.57337951660156,
    },
    {
      x: -8.75,
      y: 58.67326354980469,
    },
    {
      x: -5.334808349609375,
      y: 79.62263488769531,
    },
    {
      x: 5.334808349609375,
      y: 99.50382995605469,
    },
    {
      x: 27.942535400390625,
      y: 105.53150939941406,
    },
    {
      x: 49.700592041015625,
      y: 105.53150939941406,
    },
    {
      x: 69.70980834960938,
      y: 98.66349792480469,
    },
  ]
}

export default function A1p4 () {
  const [newGesture, setNewGesture] = useState()
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if (mount) {
      console.log(newGesture)
    } else {
      console.log('mount', mount)
      setMount(true)
    }
  }, [newGesture])

  return (
    <View style={styles.container}>

      <View style={styles.letterBox}>
        <Text style={styles.textStyle}>a</Text>
      </View>

      {/* <GestureRecorder onPanRelease={(gesture) => setNewGesture(gesture)}>
        {({ gesture }) => (
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <GesturePath path={gesture} color="green" slopRadius={35} />
          </View>
        )}
      </GestureRecorder> */}

      <GestureDetector
        onGestureFinish={(gesture) => console.log(`Gesture "${gesture}" finished!`)}
        // onProgress={({ gesture, progress }) => {
        //   console.log(`Gesture: ${gesture}, progress: ${progress}`);
        // }}
        onPanRelease={() => {
          console.log("User released finger!");
        }}
        gestures={aGesture}
        slopRadius={35}
      >
        {({ coordinate }) => (
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <GesturePath path={aGesture["Coil"]} color="red" slopRadius={10} />
            {coordinate && <Cursor {...coordinate} />}
          </View>
        )}
      </GestureDetector>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  letterBox: {
    position: 'absolute',
    height: 250,
    width: 250,
    backgroundColor: 'orange',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 250,
    alignSelf: 'center'
  }
})