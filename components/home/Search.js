import React, {useState, useReducer} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import ListItemStory from '../ListItemStory';
import reducer, {initialState} from '../../store/reducer';
import ActionSearch from '../../store/Search';
import {ActivityIndicator} from 'react-native';
const Search = ({navigation}) => {
  const [state, setState] = useState({keyword: '', data: [1, 2, 3, 4, 5]});
  const [store, dispatch] = useReducer(reducer, initialState);
  let submitSearch = () => {
    ActionSearch(dispatch, state.keyword);
  };

  let data = null;
  if (store.loading) {
    data = (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  } else {
    data = (
      <FlatList
        data={store.data}
        renderItem={({item}) => (
          <ListItemStory navigation={navigation} {...item} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 10}}>
      <TextInput
        placeholder="Nhập tên truyện cần tìm kiếm..."
        onChangeText={text => setState({keyword: text})}
        value={state.keyword}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          margin: 10,
          paddingLeft: 10,
        }}
        onSubmitEditing={submitSearch}
      />
      {data}
    </SafeAreaView>
  );
};

export default Search;
