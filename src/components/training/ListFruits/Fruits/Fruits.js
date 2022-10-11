import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {config} from 'src/config';
class Fruits extends PureComponent {
  state = {
    itemRemove: undefined,
  };

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: this.props.imageUrl}} />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.textDetail}>
            {this.props.name}
          </Text>
          <Button
            onPress={this.props.handleRemoveFruit}
            title="X"
            color="#fff"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: (config.layout.windowWidth - 30) / 2,
    borderRadius: 10,
    margin: 5,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDetail: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    maxWidth: '80%',
    marginRight: 'auto',
    marginLeft: 4,
  },
});

export default Fruits;
