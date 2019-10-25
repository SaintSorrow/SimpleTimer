import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Timer from './Timer'

export default function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastestLap,
    slowest && styles.slowestLap,
  ]

  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={lapStyle} interval={interval}/>
    </View>
  )
}

const styles = StyleSheet.create({
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  fastestLap: {
    color: '#4BC05F',
  },
  slowestLap: {
    color: '#CC3531',
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
})
