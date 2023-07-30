import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import Header from '../Components/Header';

export const screenOptions = {
  tabBarShowLabel: false,
  tabBarInactiveTintColor: '#212121CC',

  header: ({ navigation, route, options }) => {
    const title = getHeaderTitle(options, route.name);

    return <Header title={title} />;
  },
};

export const postsOptions = {
  tabBarIcon: ({ focused, size, color }) => {
    const iconColor = focused ? '#FFFFFF' : color;
    const ovalColor = focused ? '#FF6C00' : '#FFFFFF';

    return (
      <View style={[styles.iconWrapper, { backgroundColor: ovalColor }]}>
        <Feather name="grid" size={24} color={iconColor} />
      </View>
    );
  },
};

export const createPostOptions = {
  tabBarIcon: ({ focused, size, color }) => {
    const iconColor = focused ? '#FFFFFF' : color;
    const ovalColor = focused ? '#FF6C00' : '#FFFFFF';

    return (
      <View style={[styles.iconWrapper, { backgroundColor: ovalColor }]}>
        <Feather name="plus" size={24} color={iconColor} />
      </View>
    );
  },
};

export const profileOptions = {
  headerShown: false,
  tabBarIcon: ({ focused, size, color }) => {
    const iconColor = focused ? '#FFFFFF' : color;
    const ovalColor = focused ? '#FF6C00' : '#FFFFFF';

    return (
      <View style={[styles.iconWrapper, { backgroundColor: ovalColor }]}>
        <Feather name="user" size={24} color={iconColor} />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});