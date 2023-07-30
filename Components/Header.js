import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import LogoutButton from './LogoutButton';

const Header = ({ title }) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          height: 44,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}
      >
        <Text
          style={{
            fontWeight: '500',
            fontSize: 17,
            lineHeight: 22,
            flex: 1,
            textAlign: 'center',
            marginLeft: 24,
          }}
        >
          {title}
        </Text>
        <LogoutButton />
      </View>
    </>
  );
};

export default Header;