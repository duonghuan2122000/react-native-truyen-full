import React, {useEffect, useReducer} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Card} from 'react-native-elements';
import reducer, {initialState} from '../../store/reducer';
import ActionListChapters from '../../store/ListChapters';
import {ActivityIndicator} from 'react-native';
const ListItemChapter = ({navigation, chapter, urlChapter, route}) => {
  let gotoChapter = () => {
    navigation.replace('Chapter', {
      urlChapter,
      truyenID: route.params.truyenID,
      urlStory: route.params.urlStory,
    });
  };
  return (
    <TouchableOpacity onPress={gotoChapter}>
      <Card>
        <Text>{chapter}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const ListChapters = ({route, navigation}) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    ActionListChapters(dispatch, route.params.truyenID, route.params.urlStory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.truyenID, route.params.urlStory]);
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
          <ListItemChapter navigation={navigation} route={route} {...item} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default ListChapters;
