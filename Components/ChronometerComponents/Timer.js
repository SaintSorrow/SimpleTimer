import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'

export default function Timer({ interval, style}) {
  const pad = (num) => num < 10 ? '0' + num : num
  const duration = moment.duration(interval)
  const centiSeconds = Math.floor(duration.milliseconds() / 10)

  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}.</Text>
      <Text style={style}>{pad(centiSeconds)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row-reverse'
  }
})