import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native'
import GestureDetector, {
  GestureRecorder,
  GesturePath,
  Cursor,
} from "react-native-gesture-detector";
 
const gestures = {
  // this will result in the gesture shown in the first demo give above
  Coil: [
    { x: 10, y: -30 }, // This is a coordinate object
    { x: 25, y: -15 },
    { x: 40, y: -10 },
    { x: 55, y: -15 },
    { x: 70, y: -30 },
    { x: 85, y: -45 },
    { x: 90, y: -65 },
    { x: 85, y: -85 },
    { x: 70, y: -100 },
    { x: 55, y: -115 },
    { x: 40, y: -130 },
    { x: 20, y: -130 },
    { x: 0, y: -130 },
    { x: -20, y: -130 },
    { x: -35, y: -115 },
    { x: -50, y: -100 },
    { x: -65, y: -85 },
    { x: -80, y: -70 },
    { x: -80, y: -55 },
    { x: -80, y: -30 },
    { x: -80, y: -15 },
    { x: -80, y: 0 },
    { x: -65, y: 15 },
    { x: -50, y: 30 },
    { x: -35, y: 45 },
    { x: -20, y: 60 },
    { x: 0, y: 65 },
    { x: 20, y: 70 },
    { x: 40, y: 70 },
  ],
};
 
const CoilExample = () => (
  <GestureDetector
    onGestureFinish={(gesture) => console.log(`Gesture "${gesture}" finished!`)}
    // onProgress={({ gesture, progress }) => {
    //   console.log(`Gesture: ${gesture}, progress: ${progress}`);
    // }}
    onPanRelease={() => {
      console.log("User released finger!");
    }}
    gestures={gestures}
    slopRadius={35}
  >
    {({ coordinate }) => (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <GesturePath path={gestures["Coil"]} color="orange" slopRadius={35} />
        {coordinate && <Cursor {...coordinate} />}
      </View>
    )}
  </GestureDetector>
);
 
const RecordGestureExample = () => {
  // finishedGesture will look like gestures["Coil"] from the top
  const [finishedGesture, setFinishedGesture] = useState([]);
 
  return (
    <GestureRecorder onPanRelease={(gesture) => setFinishedGesture(gesture)}>
      {({ gesture }) => (
        <View style={{ position: "relative", width: "100%", height: "100%" }}>
          <GesturePath path={gesture} color="green" slopRadius={35} />
        </View>
      )}
    </GestureRecorder>
  );
};

export default function GestureDetectorExample () {

  return (
    <View style={styles.container}>
      <RecordGestureExample />
      {/* <CoilExample /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})