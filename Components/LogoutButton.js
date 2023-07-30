import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { logOut } from '../redux/auth/authOperations';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const singOut = () => {
    dispatch(logOut());
  };

  return (
    <TouchableOpacity onPress={singOut}>
      <Feather name="log-out" size={24} style={styles.LogoutButton} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  LogoutButton: {
    color: '#BDBDBD',
  },
});

export default LogoutButton;