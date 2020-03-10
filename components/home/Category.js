import React, {useReducer, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Card} from 'react-native-elements';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {Dimensions, ActivityIndicator} from 'react-native';
import ActionCategory from '../../store/Category';
import reducer, {initialState} from '../../store/reducer';
const {width} = Dimensions.get('window');

const ListItemCategory = ({navigation, name, url}) => {
  let gotoCatStory = () => {
    navigation.navigate('CatStory', {url, name});
  };
  return (
    <TouchableOpacity style={{width: (width - 5) / 2}} onPress={gotoCatStory}>
      <Card>
        <Text>{name}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const Category = ({navigation}) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    ActionCategory(dispatch);
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
          <ListItemCategory navigation={navigation} {...item} />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Category;
