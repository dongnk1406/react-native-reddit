import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class FiledRecent extends Component {
  render = () => {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#e0e4f3"
        onPress={() => this.props.handleOpenRecentTransactions(true)}
        style={styles.recentWalletItem}>
        <View style={styles.recentWalletItemBlock}>
          <View style={styles.recentWalletItemLeft}>
            <View style={styles.recentWalletItemIconBlock}>
              <AntDesign
                style={styles.recentWalletItemIcon}
                name={this.props.iconName}
              />
            </View>
            <View style={styles.recentWalletItemTextBlock}>
              <Text style={styles.recentWalletItemName}>
                {this.props.recentWalletName}
              </Text>
              <Text style={styles.recentWalletItemDescription}>
                {this.props.recentWalletDescription}
              </Text>
            </View>
          </View>
          <Text style={styles.recentWalletItemRight}>
            {this.props.recentWalletValue}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };
}

const styles = StyleSheet.create({
  recentWalletItem: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 24,
    shadowColor: '#333474',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
  },
  recentWalletItemBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  recentWalletItemLeft: {
    flexDirection: 'row',
  },
  recentWalletItemIconBlock: {
    backgroundColor: '#e0e4f3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
  },
  recentWalletItemIcon: {
    fontSize: 18,
    color: '#333474',
  },
  recentWalletItemTextBlock: {
    paddingLeft: 16,
    justifyContent: 'center',
  },
  recentWalletItemName: {
    fontWeight: '700',
    fontSize: 15,
  },
  recentWalletItemDescription: {
    fontWeight: '300',
    fontSize: 12,
    paddingVertical: 4,
  },
  recentWalletItemRight: {
    fontWeight: '700',
    color: '#333474',
  },
});

export default FiledRecent;
