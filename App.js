import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment'

const DATA = {
  timer: 1234567,
  laps: [123, 456, 789]
}

function Timer({ interval }) {
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return <Text style={styles.timer}>
    {duration.minutes()}:{duration.seconds()},{centiseconds}
  </Text>
}

function RoundButton({ title, color, background }) {
  return (
    <View style={[ styles.button, { backgroundColor: background}]}>
      <View style={ styles.buttonBorder }>
        <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </View>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Timer interval={DATA.timer}/>
      <ButtonsRow>
        <RoundButton title='Reset' color='#FFFFFF' background='#3D3D3D'></RoundButton>
        <RoundButton title='Start' color='#50D167' background='#1B361F'></RoundButton>
      </ButtonsRow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  timer: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: '100',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 16,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
  },
});
