import React from 'react';
import {AppRegistry,  View} from 'react-native';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Store from './src/utils/store';
import App from './src/app/App';
import colors from "./src/assets/theme/colors";

console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
  },
};

const Root = () => {
  return (
    <View style={{flex:1}}>
      <Provider store={Store}>
        <PaperProvider theme={theme}>
          <App/>
        </PaperProvider>
      </Provider>
    </View>
  );
};


AppRegistry.registerComponent('spotwash', () => Root);
