import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import FormRow from '../components/FormRow';
import firebase from 'firebase';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      isLoading: false
    };
  }

  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyCLwAPDCMq2u00yWjNS0hStGcaZ_tDtmss',
      authDomain: 'series-1d48b.firebaseapp.com',
      databaseURL: 'https://series-1d48b.firebaseio.com',
      projectId: 'series-1d48b',
      storageBucket: 'series-1d48b.appspot.com',
      messagingSenderId: '688493391311'
    };
    firebase.initializeApp(config);
  }

  onChangeHandler(field, value) {
    // const newState = {};
    // newState[field] = value;
    // this.setState(newState);
    this.setState({
      [field]: value
    });
  }

  tryLogin() {
    this.setState({ isLoading: true });
    const { mail, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .then(user => {
        this.props.navigation.navigate('Main');
      })
      .catch(error => {
        Alert.alert(
          'Email/Senha não encontrado',
          'Digite seu email e/ou senha ou crie uma conta!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      })
      .then(() => this.setState({ isLoading: false }));
  }

  createLogin() {
    this.setState({ isLoading: true });
    const { mail, password } = this.state;
    if (password.length >= 6) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(user => {
          Alert.alert(
            'Acesso criado',
            mail + ' cadastrado com sucesso!',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        })
        .catch(error => {
          Alert.alert(
            'Acesso não criado',
            'Digite email e/ou senha corretamente!',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        })
        .then(() => this.setState({ isLoading: false }));
    } else {
      this.setState({ isLoading: false });
      Alert.alert(
        'Aviso',
        'Digite uma senha com 6 caracteres ou mais!',
        [{ text: 'OK' }],
        { cancelable: false }
      );
     
    }
  }

  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator size="large" color="#26a69a" />;

    return (
      <View style={styles.alignButton}>
        <TouchableOpacity
          style={styles.styleButton}
          onPress={() => this.tryLogin()}
        >
          <Text style={styles.styleText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.styleButton}
          onPress={() => this.createLogin()}
        >
          <Text style={styles.styleText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.alignContent}>
          <Text style={styles.title}>Autenticação</Text>
        </View>
        <FormRow>
          <TextInput
            style={styles.styleInput}
            placeholder="Email"
            underlineColorAndroid={'#26a69a'}
            value={this.state.mail}
            onChangeText={value => this.onChangeHandler('mail', value)}
          />
          <TextInput
            style={styles.styleInput}
            placeholder="Senha"
            underlineColorAndroid={'#26a69a'}
            secureTextEntry
            value={this.state.password}
            onChangeText={value => this.onChangeHandler('password', value)}
          />
        </FormRow>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold'
  },
  container: {
    padding: 20
  },
  alignContent: {
    alignItems: 'center',
    marginBottom: 10
  },
  styleInput: {
    width: '85%'
  },
  styleButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#26a69a',
    borderRadius: 10,
    width: 175
  },
  styleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  alignButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
