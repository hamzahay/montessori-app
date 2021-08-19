import React, { useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, TextInput, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { login } from '../store/action'

export default function Auth ({ route, navigation }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [parentPin, setParentPin] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('REGISTER')
  const [loginText, setLoginText] = useState('Already have an account?')
  const [toLoginBtn, setToLoginBtn] = useState('LOGIN')
  const { shelf } = route.params

  useEffect(() => {
    checkSecureStore()
  }, [])

  function checkInputNumber (input) {
    const result = typeof input
    console.log(result)
  }

  async function checkSecureStore () {
    try {
      const secureStoreEmail = await SecureStore.getItemAsync('email')
      if (secureStoreEmail) {
        const secureStoreParentPin = await SecureStore.getItemAsync('parentPin')
        const payload = {
          email: secureStoreEmail,
          parentPin: secureStoreParentPin
        }
        attempLogin(payload)
      }
    } catch (err) {
      console.log(err)
    }
  }

  function register () {
    // register to server
    // navigation.navigate('ShelfDetail', { shelf })
    const payload = {
      email,
      name,
      age,
      parentPin
    }
    console.log(payload)
    if (shelf) {
      navigation.navigate('ShelfDetail', { shelf })
    }
  }

  function attempLogin (payload = { email, parentPin }) {
    if (payload.email) {
      dispatch(login(payload))
      console.log(payload)
    } else {
      console.log('email is empty')
    }
  }

  function changeType () {
    if (type == 'REGISTER') {
      setType('LOGIN')
      setToLoginBtn('REGISTER')
      setLoginText('Not have an account yet?')
    } else {
      setType('REGISTER')
      setToLoginBtn('LOGIN')
      setLoginText('Already have an account?')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.authBox}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>REGISTRATION</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
              disableFullscreenUI={true}
            />
            { type == 'REGISTER' ? 
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="NAME"
                  onChangeText={text => setName(text)}
                  value={name}
                  disableFullscreenUI={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="AGE"
                  keyboardType="numeric"
                  onChangeText={text => setAge(text)}
                  value={age}
                  disableFullscreenUI={true}
                />
              </View> : <View></View>
            }
            <TextInput
              style={styles.input}
              placeholder="PARENT PIN"
              secureTextEntry={true}
              keyboardType="numeric"
              onChangeText={text => setParentPin(text)}
              value={parentPin}
              disableFullscreenUI={true}
            />
          </View>
        </View>
        <View style={styles.rigthContainer}>
          <View style={styles.loginTextBox} >
            <Text style={styles.toLoginBtn} onPress={() => changeType()}>{ toLoginBtn }</Text>
            <Text style={styles.loginText} >{ loginText }</Text>
          </View>
          <Button title={type} onPress={() => { if (type === 'REGISTER') {
            register()
          } else if (type === 'LOGIN') {
            attempLogin()
          } }} />
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
    marginHorizontal: 5,
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
  },
  inputBox: {
    borderWidth: 1
  },
  loginTextBox: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  loginText: {
    fontSize: 14
  },
  toLoginBtn: {
    color: 'blue'
  }
})