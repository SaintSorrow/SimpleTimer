import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TimerScreen from './Screens/TimerScreen'
import ClockScreen from './Screens/ClockScreen'
import ChronometerScreen from './Screens/ChronometerScreen'
import Icon from 'react-native-vector-icons/Ionicons'

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Timer: { 
      screen: TimerScreen,
      navigationOptions: {
        tabBarLabel: 'Timer',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-hourglass'}/>
          </View>
        )
      } 
    },
    Chronometer: { 
      screen: ChronometerScreen,
      navigationOptions: {
        tabBarLabel: 'Chronometer',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-stopwatch'}/>
          </View>
        )
      } 
    },
    Clock: { 
      screen: ClockScreen,
      navigationOptions:  {
        tabBarLabel: 'Clock',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-clock'}/>
          </View>
        )
      }
    }
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
