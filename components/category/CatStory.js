import React, {useEffect, useReducer, useLayoutEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import ListItemStory from '../ListItemStory';
import reducer, {initialState} from '../../store/reducer';
import ActionCatStory from '../../store/CatStory';
import {ActivityIndicator} from 'react-native';
const CatStory = ({navigation, route}) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Thể loại ${route.params.name}`,
    });
  });

  useEffect(() => {
    ActionCatStory(dispatch, route.params.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (store.loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 10}}>
      <FlatList
        data={store.data}
        renderItem={({item}) => (
          <ListItemStory navigation={navigation} {...item} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default CatStory;
