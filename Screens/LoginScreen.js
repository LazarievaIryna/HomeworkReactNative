import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

import { logIn } from '../redux/auth/authOperations';

const initValue = {
  email: '',
  password: '',
};

const LoginScreen = ({ navigation }) => {
  const [value, setValue] = useState(initValue);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusMail, setIsFocusMail] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    dispatch(logIn(value));
    setValue(initValue);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bcgImage}
          source={require('../assets/images/PhotoBG.jpeg')}
        >
          <View
            style={{ ...styles.form, marginBottom: isShowKeyboard ? -240 : 0 }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <Text style={styles.formTitle}>Вхід</Text>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  ...(isFocusMail ? styles.inputFocus : null),
                }}
                placeholder="Адреса електронної пошти"
                value={value.email}
                onFocus={() => {
                  setIsShowKeyboard(true), setIsFocusMail(true);
                }}
                onBlur={() => setIsFocusMail(false)}
                onChangeText={value =>
                  setValue(prevState => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 43,
                  ...(isFocusPassword ? styles.inputFocus : null),
                }}
                placeholder="Пароль"
                value={value.password}
                secureTextEntry={true}
                onFocus={() => {
                  setIsShowKeyboard(true), setIsFocusPassword(true);
                }}
                onBlur={() => setIsFocusPassword(false)}
                onChangeText={value =>
                  setValue(prevState => {
                    return { ...prevState, password: value };
                  })
                }
              />

              {/* Navigation */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submitBtn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>

              <View style={styles.navigationContainer}>
                <Text style={styles.navigationText}>Немає аккаунту?</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Registration')}
                >
                  <Text style={styles.navigationText}> Зареєструватись</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bcgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  form: {
    justifyContent: 'flex-start',
    textAlign: 'start',
    height: 489,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 32,
    backgroundColor: '#ffffff',
    paddingRight: 16,
    paddingLeft: 16,
  },

  formTitle: {
    fontSize: 30,
    fontStyle: 'bold',
    // fontFamily: 'Roboto-Bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 33,
  },

  input: {
    height: 50,
    padding: 16,

    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,

    backgroundColor: '#F6F6F6',

    fontSize: 16,
    // fontFamily: 'Roboto-Regular',
  },

  inputFocus: {
    borderColor: '#FF6C00',
    backgroundColor: '#ffffff',
  },

  submitBtn: {
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FF6C00',

    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 32,
    paddingLeft: 32,
    marginBottom: 16,
  },

  btnText: {
    textAlign: 'center',
    fontSize: 16,
    // fontFamily: 'Roboto-Regular',
    color: '#ffffff',
    lineHeight: 19,
  },

  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  navigationText: {
    fontSize: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
});

export default LoginScreen;