import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class DigitalClock extends Component {
  state = {
    timeStamp: new Date().toLocaleTimeString(),
  };

  componentDidMount = () => {
    this.timerId = setInterval(() => {
      const timeStampNow = new Date().toLocaleTimeString();
      this.setState({
        timeStamp: timeStampNow,
      });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerId);
  };

  render() {
    return (
      <>
        {!!this.state.timeStamp && (
          <View style={styles.container}>
            <Text style={styles.timeStamp}>{this.state.timeStamp}</Text>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '25%',
    padding: 2,
    borderRadius: 4,
  },
  timeStamp: {
    color: '#b03b60',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DigitalClock;
