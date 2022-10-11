import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import Login from './FinanceManage/Login';
import Profile from './FinanceManage/Profile';
import RecentTransactions from './FinanceManage/RecentTransactions';
class FinanceManagement extends Component {
  state = {
    isOpenLogin: true,
    isOpenProfile: false,
    isOpenRecentTransactions: false,
  };

  handleOpenProfile = value => {
    this.setState({
      isOpenLogin: !value,
      isOpenProfile: value,
    });
  };

  handleOpenRecentTransactions = value => {
    this.setState({
      isOpenProfile: !value,
      isOpenRecentTransactions: value,
    });
  };

  handleBackToLogin = value => {
    this.setState({
      isOpenLogin: value,
      isOpenProfile: !value,
    });
  };

  handleBackToProfile = value => {
    this.setState({
      isOpenProfile: value,
      isOpenRecentTransactions: !value,
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        {this.state.isOpenLogin && (
          <Login handleOpenProfile={this.handleOpenProfile} />
        )}
        {this.state.isOpenProfile && (
          <Profile
            handleOpenRecentTransactions={this.handleOpenRecentTransactions}
            handleBackToLogin={this.handleBackToLogin}
          />
        )}
        {this.state.isOpenRecentTransactions && (
          <RecentTransactions handleBackToProfile={this.handleBackToProfile} />
        )}
      </SafeAreaView>
    );
  }
}

export default FinanceManagement;
