import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function WelcomePage ({ navigation }) {

  function door () {

  }

  return (
    <View style={styles.container}>
      <View style={styles.door}>
        <Button
          title="Door"
          onPress={() => navigation.navigate('Home')}
          color="black"
        ></Button>
      </View>
      <View style={styles.billboard}>
        <Text>Billboard</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  door: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    marginHorizontal: 50
  },
  button: {
  },
  billboard: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 50,
    borderWidth: 1,
    textAlign: 'center'
  }
});

