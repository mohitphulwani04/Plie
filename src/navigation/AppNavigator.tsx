import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loadToken } from '../redux/slices/authSlice';
import LoginScreen from '../pages/LoginScreen';
import EventsScreen from '../pages/EventsScreen';
import FavoritesScreen from '../pages/FavoritesScreen';
import { View, ActivityIndicator } from 'react-native';
import Header from '../components/Header';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileScreen = () => <></>;
const Search = () => <></>;

const MainTabs = () => (
  <View style={{ flex: 1 }}>
    <Header />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#777',
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case 'Search':
              iconName = 'search';
              break;
            case 'Events':
              iconName = 'calendar';
              break;
            case 'Favorites':
              iconName = 'heart';
              break;
            case 'Profile':
              iconName = 'user';
              break;
          }
          return <Icon name={iconName} color={color} size={focused ? size + 2 : size} />;
        },
      })}
    >
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </View>
);

const AppNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    dispatch(loadToken()); // Load token from AsyncStorage
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#17C964" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loadToken ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
