import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import useRoute from './hooks/useRoute';
import { isUserLogin } from './redux/auth/authOperations';
import { getIsUserLogin } from './redux/selectors';


export default function Routes() {
  const dispatch = useDispatch();
  const userAuthorization = useSelector(getIsUserLogin);
  console.log(userAuthorization)
 
  const routing = useRoute(userAuthorization);

  useEffect(() => {
    dispatch(isUserLogin());
  }, []);


  return (<NavigationContainer>{routing}</NavigationContainer>);
}