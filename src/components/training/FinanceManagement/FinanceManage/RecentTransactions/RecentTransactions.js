import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FiledRecent from '../components/FiledRecent';

class ListUsers extends Component {
  // degToRad(deg) {
  //   return (deg * Math.PI) / 180;
  // }

  size = 300;
  itemSize = 25;
  radius = this.size / 2;
  center = this.radius;
  // angleRad = this.degToRad(360 / this.props.listUsers.length);
  angleRad = ( 2 * Math.PI) / this.props.listUsers.length
  tempAngleRad = this.angleRad;

  render() {
    return (
      <View style={styles.listUsers}>
        {this.props.listUsers.map((item, index) => {
          this.angleRad = this.tempAngleRad * index;
          let x =
            this.radius * Math.cos(this.angleRad - Math.PI/2) + this.center - this.itemSize;
          let y =
            this.radius * Math.sin(this.angleRad - Math.PI/2) + this.center - this.itemSize;

          return (
            <Image
              style={[styles.avatarUser, {left: x, top: y}]}
              key={index}
              source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}}
            />
          );
        })}
      </View>
    );
  }
}

class RecentTransactions extends Component {
  state = {
    selectedFilterId: null,
  };

  filterRecent = [
    {id: 1, name: 'All'},
    {id: 2, name: 'Income'},
    {id: 3, name: 'Expense'},
  ];

  listUsers = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
  ];

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.handleBackToProfile(true)}>
            <Image source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.headerBlock}>
              <Text style={styles.headerTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.headerSeeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterBlock}>
              {this.filterRecent.map((filter) => {
                return (
                  <TouchableHighlight
                    activeOpacity={0.8}
                    underlayColor="#333474"
                    onPress={() => this.setState({selectedFilterId: filter.id})}
                    style={[
                      styles.filterFiled,
                      filter.id === this.state.selectedFilterId
                        ? {backgroundColor: '#333474'}
                        : {backgroundColor: '#fff'},
                    ]}
                    key={filter.id}>
                    <Text
                      style={
                        filter.id === this.state.selectedFilterId
                          ? {color: '#fff'}
                          : {color: '#333474'}
                      }>
                      {filter.name}
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>

            <View>
              <Text style={styles.recentWalletUsedTitle}>Today</Text>
              <View>
                <FiledRecent
                  iconName="calendar"
                  recentWalletName="Payment"
                  recentWalletDescription="Payment for Andrea"
                  recentWalletValue="$30.00"
                />
              </View>
            </View>

            <View style={styles.networkingContainer}>
              <View style={styles.layer3}>
                <View style={styles.layer2}>
                  <View style={styles.layer1}>
                    <Image
                      style={styles.avatar}
                      source={{uri: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'}}
                    />
                  </View>
                </View>
                <ListUsers listUsers={this.listUsers} />
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="#535495"
          style={styles.detailBtn}>
          <Text style={styles.detailBtnText}>See Details</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333474',
  },
  headerSeeAll: {
    color: '#555',
  },
  filterBlock: {
    flexDirection: 'row',
  },
  filterFiled: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  recentWalletUsedTitle: {
    fontSize: 18,
    paddingTop: 28,
    paddingBottom: 16,
    fontWeight: '700',
    color: '#333474',
  },
  networkingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 460,
  },

  avatar: {
    borderRadius: 50,
    margin: 6,
  },

  layer1: {
    borderWidth: 4,
    borderColor: '#333474',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  layer2: {
    borderWidth: 24,
    borderColor: '#d0dffe',
    padding: 24,
    borderRadius: 999,
  },
  layer3: {
    borderWidth: 1,
    borderColor: '#d0dffe',
    padding: 36,
    borderRadius: 999,
  },
  listUsers: {
    position: 'absolute',
  },
  avatarUser: {
    height: 50,
    width: 50,
    borderRadius: 999,
    position: 'absolute',
  },
  detailBtn: {
    backgroundColor: '#333474',
    borderRadius: 50,
    paddingVertical: 16,
    marginHorizontal: 24,
  },
  detailBtnText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default RecentTransactions;
