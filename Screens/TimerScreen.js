import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

function TimerDigits({ time }) {
  const pad = (num) => num < 10 ? '0' + num : num
  return (
    <View>
      <Text style={styles.digitsText}>{pad(time)}</Text>
    </View>
  )
}

function DigitsRow() {
  return (
    <View>
      <TimerDigits time={5}/>
      <TimerDigits time={10}/>
      <TimerDigits time={20}/>
    </View>
  )
}

export default class TimerScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      now: 0,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <DigitsRow/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
  },
  digitsText: {
    color: '#FFFFFF',
  }
})
