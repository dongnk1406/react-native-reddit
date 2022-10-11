import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
class FiledForm extends Component {
  render = () => {
    return (
      <View style={styles.filedForm}>
        <Text style={styles.titleForm}>{this.props.title}</Text>
        <View style={styles.inputBlock}>
          <View style={styles.inputBlockLeft}>
            <AntDesign style={styles.iconInput} name={this.props.iconName} />
            <TextInput
              onChangeText={this.props.handleTextInput}
              placeholder={this.props.placeholder}
              style={styles.textInput}
              value={this.props.textInput}
              secureTextEntry={this.props.secureTextEntry}
            />
          </View>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#fff"
            onPress={this.props.handleHidePassword}>
            <AntDesign
              style={styles.iconInput}
              name={this.props.iconShowHide}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  };
}

class Login extends Component {
  state = {
    isHidePassword: false,
    password: '',
  };

  handleTypePassword = (value) => {
    this.setState({
      password: value,
    });
  };

  handleHidePassword = () => {
    this.setState({
      isHidePassword: !this.state.isHidePassword,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.logo}>
            <Image source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}} />
          </View>

          <View style={styles.filedContainer}>
            <View>
              <FiledForm
                title="Email Address"
                iconName="mail"
                placeholder="example@gmail.com"
              />
              <FiledForm
                title="Password"
                iconName="lock"
                placeholder="password"
                iconShowHide={this.state.isHidePassword ? 'eye' : 'eyeo'}
                handleHidePassword={this.handleHidePassword}
                handleTextInput={this.handleTypePassword}
                secureTextEntry={this.state.isHidePassword}
              />
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="#535495"
                style={styles.loginBtn}
                onPress={() => this.props.handleOpenProfile(true)}>
                <Text style={styles.textLogin}>Login</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.textBtnContainer}>
              <TouchableOpacity>
                <Text style={styles.textBtn}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textBtn}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    minHeight: 246,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filedContainer: {
    paddingHorizontal: 24,
  },
  filedForm: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleForm: {
    color: '#5c5c5c',
    fontSize: 16,
  },
  inputBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  inputBlockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconInput: {
    fontSize: 16,
  },
  textInput: {
    marginLeft: 8,
    width: '86%',
  },
  loginBtn: {
    backgroundColor: '#333474',
    borderRadius: 50,
    paddingVertical: 16,
    marginTop: 24,
  },
  textLogin: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  textBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  textBtn: {
    color: '#5c5c5c',
  },
});

export default Login;
