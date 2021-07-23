import React, { useState } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'

export default function Auth ({ route, navigation }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [parentPin, setParentPin] = useState('')
  const [childrenPin, setChildrenPin] = useState('')
  const { shelf } = route.params

  function checkInputNumber (input) {
    const result = typeof input
    console.log(result)
  }

  function register () {
    // register to server
    navigation.navigate('ShelfDetail', { shelf })
  }

  return (
    <View style={styles.container}>
      <View style={styles.authBox}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>REGISTRATION</Text>
          <TextInput
            style={styles.input}
            placeholder="NAME"
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="AGE"
            keyboardType="numeric"
            onChangeText={text => setAge(text)}
            value={age}
          />
          <TextInput
            style={styles.input}
            placeholder="PARENT PIN"
            keyboardType="numeric"
            onChangeText={text => setParentPin(text)}
            value={parentPin}
          />
          <TextInput
            style={styles.input}
            placeholder="CHILDREN PIN"
            keyboardType="numeric"
            onChangeText={text => setChildrenPin(text)}
            value={childrenPin}
          />
        </View>
        <View style={styles.rigthContainer}>
          <Button title="Register" onPress={() => register()} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  authBox: {
    flex: 1,
    borderWidth: 1,
    margin: 50,
    flexDirection: 'row',
    padding: 5,
  },
  leftContainer: {
    flex: 2,
    paddingHorizontal: 25,
    paddingVertical: 25,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rigthContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column-reverse'
  },
  input: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  }
})