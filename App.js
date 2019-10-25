import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TimerScreen from './Screens/TimerScreen'
import ClockScreen from './Screens/ClockScreen'
import ChronometerScreen from './Screens/ChronometerScreen'

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Timer: { screen: TimerScreen },
    Chronometer: { screen: ChronometerScreen },
    Clock: { screen: ClockScreen }
  },
  {
    initialRouteName: 'Timer',
    activeColor: '#F0EDF6',
    inactiveColor: '#3E2465',
    barStyle: { backgroundColor: '#694FAD'},
  }
)

export default createAppContainer(TabNavigator)

const styles = StyleSheet.create({

})
