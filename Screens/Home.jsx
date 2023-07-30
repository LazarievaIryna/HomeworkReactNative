import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const MainTab = createBottomTabNavigator();

import {
  screenOptions,
  postsOptions,
  createPostOptions,
  profileOptions,
} from '../options/tabOptions';

import PostsScreen from './PostsScreen';
import CreatePostScreen from './CreatePostScreen';
import ProfileScreen from './ProfileScreen';

const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator screenOptions={screenOptions}>
      <MainTab.Screen
        options={postsOptions}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={createPostOptions}
        name="Створити публікацію"
        component={CreatePostScreen}
      />

      <MainTab.Screen
        options={profileOptions}
        name="Профіль"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;