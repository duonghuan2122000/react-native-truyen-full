import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './home/Home';
import InfoStory from './story/InfoStory';
import Chapter from './chapter/Chapter';
import ListChapters from './chapter/ListChapters';
import CatStory from './category/CatStory';
const ContainerStack = createStackNavigator();

const getHeaderTitle = route => {
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "UpdateStory" as that's the first screen inside the navigator
      route.params?.screen || 'UpdateStory';
  switch (routeName) {
    case 'UpdateStory':
      return 'Trang chủ';
    case 'Category':
      return 'Thể loại';
    case 'Search':
      return 'Tìm kiếm';
    default:
      return 'Trang chủ';
  }
};

const Container = () => {
  return (
    <ContainerStack.Navigator initialRouteName="Home">
      <ContainerStack.Screen
        name="Home"
        component={Home}
        options={({route}) => ({headerTitle: getHeaderTitle(route)})}
      />
      <ContainerStack.Screen
        name="InfoStory"
        component={InfoStory}
        options={{headerTitle: 'Thông tin truyện'}}
      />
      <ContainerStack.Screen
        name="Chapter"
        component={Chapter}
        options={{headerTitle: 'Đọc truyện'}}
      />
      <ContainerStack.Screen
        name="ListChapters"
        component={ListChapters}
        options={{headerTitle: 'Danh sách chương'}}
      />
      <ContainerStack.Screen name="CatStory" component={CatStory} />
    </ContainerStack.Navigator>
  );
};

export default Container;
