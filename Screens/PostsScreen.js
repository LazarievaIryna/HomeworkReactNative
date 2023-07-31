import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreen from './DefaultScreen';
import MapScreen from './MapScreen';
import CommentsScreen from './CommentsScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator initialRouteName="Пости">
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Пости"
        component={DefaultScreen}
      />
      <NestedScreen.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Коментарі"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Мапа"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;