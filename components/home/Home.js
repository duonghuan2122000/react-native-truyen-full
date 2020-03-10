import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UpdateStory from './UpdateStory';
import Category from './Category';
import {Icon} from 'react-native-elements';
import Search from './Search';
const HomeTab = createBottomTabNavigator();

const Home = () => {
  return (
    <HomeTab.Navigator initialRouteName="UpdateStory">
      <HomeTab.Screen
        name="UpdateStory"
        component={UpdateStory}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: props => <Icon name="home" {...props} />,
        }}
      />
      <HomeTab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: 'Thể loại',
          tabBarIcon: props => <Icon name="tag" type="antdesign" {...props} />,
        }}
      />
      <HomeTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Tìm kiếm',
          tabBarIcon: props => <Icon name="search" {...props} />,
        }}
      />
    </HomeTab.Navigator>
  );
};

export default Home;
