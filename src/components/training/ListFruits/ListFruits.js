import React, {Component} from 'react';
import base64 from 'react-native-base64';
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Fruits from './Fruits';

class ListFruits extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.contentListFruit}>
            {this.props.fruits.map((fruit, index) => {
              return (
                <Fruits
                  key={index}
                  color={fruit.color}
                  name={fruit.name}
                  imageUrl={fruit.imageUrl}
                  handleRemoveFruit={this.props.handleRemoveFruit.bind(
                    this,
                    index,
                  )}
                  a={2}
                />
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingFruits: true,
      newFruit: '',
      keyboardStatus: undefined,
      fruits: [],
      value: '',
    };
    this.myRef = React.createRef();
    this.controller = new AbortController();
    this.unMounted = false;
  }

  componentDidMount() {
    this.handleFetchListFruits();

    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({keyboardStatus: true});
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({keyboardStatus: false});
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
    this.controller.abort();
    this.unMounted = true;
  }

  handleFetchListFruits = () => {
    const {signal} = this.controller;
    // if(this.unMounted) return;
    fetch('https://api.github.com/repos/minhnguyenit14/mockend/readme', {
      signal,
    })
      .then(response => response.json())
      .then(data => {
        const encodeString = String(data.content.replace(/\n/g, ''));
        this.decodeString(encodeString);
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isFetchingFruits: false});
      });
  };

  decodeString = encText => {
    const data = base64.decode(encText);
    const result = JSON.parse(data);
    this.setState({
      fruits: result.fruits,
    });
  };

  handleGetNewFruit = value => {
    this.setState({
      newFruit: value.trim(),
    });
  };

  generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  handleAddFruit = () => {
    let newArrayFruits = [...this.state.fruits];
    newArrayFruits.unshift({
      name: this.state.newFruit,
      imageUrl:
        'https://bingvsdevportalprodgbl.blob.core.windows.net/demo-images/3b7d6ad7-ef4d-4a61-a881-a5948a2dfe47.jpeg',
      color: this.generateColor(),
    });

    this.setState({
      newFruit: '',
      fruits: newArrayFruits,
    });

    Keyboard.dismiss();
    // this.myRef.current.clear();
  };

  handleRemoveFruit = index => {
    let newArrayFruits = [...this.state.fruits];
    newArrayFruits.splice(index, 1);
    this.setState({
      fruits: newArrayFruits,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://bingvsdevportalprodgbl.blob.core.windows.net/demo-images/3b7d6ad7-ef4d-4a61-a881-a5948a2dfe47.jpeg',
            }}
          />
        </View>
        <View style={styles.addFruitInput}>
          <TextInput
            style={styles.addFruitText}
            onChangeText={this.handleGetNewFruit}
            placeholder="Add fruit"
            value={this.state.newFruit}
            // ref={this.myRef}
          />

          <Button
            onPress={this.handleAddFruit}
            disabled={!this.state.newFruit.trim()}
            title="Add"
            color="#f05123"
          />
        </View>
        <ListFruits
          fruits={this.state.fruits}
          keyboardStatus={this.state.keyboardStatus}
          handleRemoveFruit={this.handleRemoveFruit}
        />
        {this.state.isFetchingFruits && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#f05123" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  addFruitInput: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  addFruitText: {
    marginRight: 'auto',
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },

  contentListFruit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 5,
  },
});

export default App;
