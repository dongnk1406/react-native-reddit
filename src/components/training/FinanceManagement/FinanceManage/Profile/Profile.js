import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FiledRecent from '../components/FiledRecent';

class FiledBottomTab extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="#333474"
        style={[
          styles.bottomTabIconBlock,
          this.props.isActive && {backgroundColor: '#333474'},
        ]}
        onPress={this.props.handleEvent}>
        <AntDesign
          style={[styles.bottomTabIcon, this.props.isActive && {color: '#fff'}]}
          name={this.props.iconName}
        />
      </TouchableHighlight>
    );
  }
}

class BottomTab extends Component {
  state = {
    selectedId: null,
  };

  bottomTabs = [
    {id: 1, name: 'home'},
    {id: 2, name: 'folder1'},
    {id: 3, name: 'plus'},
    {id: 4, name: 'instagram'},
    {id: 5, name: 'cloudo'},
  ];

  render() {
    return (
      <View style={styles.bottomTabContainer}>
        {this.bottomTabs.map((tab) => {
          return (
            <FiledBottomTab
              key={tab.id}
              isActive={tab.id === this.state.selectedId}
              handleEvent={
                tab.id === 1
                  ? this.props.handleBackToLogin
                  : () => {
                      this.setState({selectedId: tab.id});
                    }
              }
              iconName={tab.name}
            />
          );
        })}
      </View>
    );
  }
}

class Profile extends Component {
  render = () => {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentBlock}>
            <View style={styles.portfolio}>
              <View style={styles.profileIcons}>
                <TouchableHighlight>
                  <Image
                    source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}}
                  />
                </TouchableHighlight>
                <TouchableHighlight>
                  <Image
                    source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}}
                  />
                </TouchableHighlight>
              </View>

              <View style={styles.profileAvatar}>
                <View>
                  <Image source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}} />
                  <Text style={styles.profileName}>Hira Riaz</Text>
                  <Text style={styles.profileDescription}>UI/UX Designer</Text>
                </View>
              </View>

              <View style={styles.wallets}>
                <View style={styles.walletItem}>
                  <Text style={styles.walletText}>$1000</Text>
                  <Text style={styles.walletDetail}>Income</Text>
                </View>
                <View style={styles.walletItem}>
                  <Text style={styles.walletText}>$2000</Text>
                  <Text style={styles.walletDetail}>Expenses</Text>
                </View>
                <View>
                  <Text style={styles.walletText}>$3000</Text>
                  <Text style={styles.walletDetail}>Loan</Text>
                </View>
              </View>
            </View>

            <View style={styles.overview}>
              <View style={styles.overviewLeft}>
                <Text style={styles.overviewLeftText}>Overview</Text>
                <TouchableHighlight>
                  <Image source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}} />
                </TouchableHighlight>
              </View>
              <View style={styles.overviewRight}>
                <Text style={styles.overviewRightText}>June 14, 2022</Text>
              </View>
            </View>
            <View>
              <FiledRecent
                iconName="up"
                recentWalletName="Sent"
                recentWalletDescription="Sending Payment to Clients"
                recentWalletValue="$150"
                handleOpenRecentTransactions={
                  this.props.handleOpenRecentTransactions
                }
              />
              <FiledRecent
                iconName="down"
                recentWalletName="Receive"
                recentWalletDescription="Receiving Salary from company"
                recentWalletValue="$250"
                handleOpenRecentTransactions={
                  this.props.handleOpenRecentTransactions
                }
              />
              <FiledRecent
                iconName="calendar"
                recentWalletName="Loan"
                recentWalletDescription="Loan for the Car"
                recentWalletValue="$350"
                handleOpenRecentTransactions={
                  this.props.handleOpenRecentTransactions
                }
              />
            </View>
          </View>
        </ScrollView>
        <BottomTab handleBackToLogin={this.props.handleBackToLogin} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentBlock: {
    paddingHorizontal: 24,
  },
  portfolio: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    paddingBottom: 40,
    shadowColor: '#333474',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
  },
  profileIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileAvatar: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#333474',
    paddingTop: 20,
  },
  profileDescription: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  wallets: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  walletItem: {
    borderRightWidth: 1,
    borderColor: '#333474',
    paddingRight: 30,
  },
  walletText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#333474',
    paddingBottom: 4,
  },
  walletDetail: {
    textAlign: 'center',
    fontSize: 12,
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  overviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewLeftText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333474',
    marginRight: 8,
  },
  overviewRightText: {
    fontWeight: '500',
    color: '#333474',
  },
  bottomTabContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f6fe',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTabIconBlock: {
    borderRadius: 10,
  },
  bottomTabIcon: {
    fontSize: 24,
    color: '#333474',
    padding: 10,
  },
});

export default Profile;
