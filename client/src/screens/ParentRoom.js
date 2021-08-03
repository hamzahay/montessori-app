import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default function ParentRoom ({ route, navigation }) {
  const { activity } = route.params

  function toClassroom () {
    navigation.navigate('Classroom', { activity })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Button title="To Classroom" onPress={() => toClassroom()} />
        <Button title="Setting" />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.tray}>
          <Text>Tray 1</Text>
        </View>
        <View style={styles.tray}>
          <Text>Tray 2</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  topContainer: {
    flexDirection: 'row-reverse',
    marginHorizontal: 5,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    justifyContent: 'space-evenly'
  },
  tray: {
    borderWidth: 1,
  },
  trayTwo: {

  }
})