import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment'

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

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      laps: [],
      start: 0,
      now: 0,
    }
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
    }, 25)
  }

  render() {
    const { laps, start, now } = this.state
    const timer = now - start
    return (
      <View style={styles.container}>
        <Timer interval={timer} style={styles.timer}/>
        <ButtonsRow>
          <RoundButton title='Reset' color='#FFFFFF' background='#3D3D3D'></RoundButton>
          <RoundButton title='Start' color='#50D167' background='#1B361F' onPress={this.start}></RoundButton>
        </ButtonsRow>
        <LapsTable laps={laps} timer={timer}/>
      </View>
    )
  }
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
    borderWidth: 2,
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
