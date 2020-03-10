import React, {useState, useReducer, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItemStory from '../ListItemStory';
import reducer, {initialState} from '../../store/reducer';
import ActionUpdateStory from '../../store/UpdateStory';
import {ActivityIndicator, FlatList} from 'react-native';
import {Button, Text} from 'react-native-elements';
const UpdateStory = ({navigation}) => {
  const [state, setState] = useState({
    isRefreshing: false,
  });

  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ActionUpdateStory(dispatch);
    setState({isRefreshing: false});
  }, [state.isRefreshing]);

  let pullToRefresh = () => {
    setState({isRefreshing: true});
  };

  let retryPage = () => {
    ActionUpdateStory(dispatch);
  };

  if (store.loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  if (store.error) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text h4>Có lỗi xảy ra</Text>
        <Button title="Thử lại" type="outline" onPress={retryPage} />
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
        refreshing={state.isRefreshing}
        onRefresh={pullToRefresh}
      />
    </SafeAreaView>
  );
};

export default UpdateStory;
