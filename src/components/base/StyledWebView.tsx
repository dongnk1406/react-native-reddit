import {config} from 'app-config';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {WebView, WebViewProps} from 'react-native-webview';

const StyledWebView = (props: WebViewProps) => {
  return (
    <View style={styles.container}>
      <WebView
        {...props}
        pullToRefreshEnabled
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.flex}>
            <ActivityIndicator size="small" color={config.color.primary} />
          </View>
        )}
        renderError={error => (
          <View style={styles.flex}>
            <Text>Error {error}</Text>
            <Text style={styles.textPullDown}>Pull down to try again</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  textPullDown: {
    marginTop: 10,
  },
});

export default React.memo(StyledWebView);
