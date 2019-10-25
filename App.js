import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import TimerScreen from './Screens/TimerScreen'
import ClockScreen from './Screens/ClockScreen'
import ChronometerScreen from './Screens/ChronometerScreen'


const TabNavigator = createBottomTabNavigator({
  Timer: TimerScreen,
  Chronometer: ChronometerScreen,
  Clock: ClockScreen,
});

export default createAppContainer(TabNavigator)

const styles = StyleSheet.create({

})
