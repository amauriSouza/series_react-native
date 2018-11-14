import { StackNavigator } from 'react-navigation';
import LoginPage from './src/pages/LoginPage';
import SeriesPage from './src/pages/SeriesPage';
export default StackNavigator(
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        title: 'Series',
      }
    },
    Main:{
      screen: SeriesPage
    }
  },
  {
    navigationOptions: {
      title: 'Series',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#26a69a',
        borderBottomWidth: 1,
        borderBottomColor: '#C5C5C5'
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20
      }
    }
  }
);
