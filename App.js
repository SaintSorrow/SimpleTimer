import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import TimerScreen from './Screens/TimerScreen'
import ClockScreen from './Screens/ClockScreen'


function Timer({ interval, style }) {
  const pad = (num) => num < 10 ?  '0' + num : num
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

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()} 
      style={[ styles.button, { backgroundColor: background}]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={ styles.buttonBorder }>
        <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

function Lap({ number, interval, fastest, slowest }) {
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

function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER

  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap
      if (lap > max) max = lap
    });
  }

  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap 
          number={laps.length - index} 
          key={laps.length - index} 
          interval={index === 0 ? timer + lap : lap}
          slowest={lap === max}
          fastest={lap === min}
        />
      ))}
    </ScrollView>
  )
}

export class ChronometerScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      laps: [],
      start: 0,
      now: 0,
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  start = () => {
    const now = new Date().getTime()

    this.setState({
      start: now,
      now,
      laps: [0],
    })

    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  stop = () => {
    clearInterval(this.timer)
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps

    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    })
  }

  lap = () => {
    const timeStamp = new Date().getTime()
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps

    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timeStamp,
      now: timeStamp,
    })
  }

  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    })
  }

  resume = () => {
    const now = new Date().getTime()

    this.setState({
      start: now,
      now
    })

    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  render() {
    const { laps, start, now } = this.state
    const timer = now - start
    return (
      <View style={styles.container}>
        <Timer 
          interval={laps.reduce((total, curr) => total + curr, 0) + timer} 
          style={styles.timer}/>
        {laps.length === 0 && (
          <ButtonsRow>
            <RoundButton title='Lap' color='#8B8B90' background='#151515' disabled></RoundButton>
            <RoundButton title='Start' color='#50D167' background='#1B361F' onPress={this.start}></RoundButton>
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton title='Lap' color='#FFFFFF' background='#3D3D3D' onPress={this.lap}></RoundButton>
            <RoundButton title='Stop' color='#E33935' background='#3C1715' onPress={this.stop}></RoundButton>
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton title='Reset' color='#FFFFFF' background='#3D3D3D' onPress={this.reset}></RoundButton>
            <RoundButton title='Resume' color='#50D167' background='#1B361F' onPress={this.resume}></RoundButton>
          </ButtonsRow>
        )}
        <LapsTable laps={laps} timer={timer}/>
      </View>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Timer: TimerScreen,
  Chronometer: ChronometerScreen,
  Clock: ClockScreen,
});

export default createAppContainer(TabNavigator)

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
    width: 75,
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastestLap: {
    color: '#4BC05F',
  },
  slowestLap: {
    color: '#CC3531',
  },
  timerContainer: {
    flexDirection: 'row'
  }
});
