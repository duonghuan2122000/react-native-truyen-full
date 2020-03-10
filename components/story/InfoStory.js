import React, {useReducer, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Image, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {View, ActivityIndicator} from 'react-native';
import reducer, {initialState} from '../../store/reducer';
import ActionInfoStory from '../../store/InfoStory';
import HTMLView from 'react-native-htmlview';
const InfoStory = ({navigation, route}) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ActionInfoStory(dispatch, route.params.urlStory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let gotoChapter = () => {
    navigation.navigate('Chapter', {
      urlChapter: store.data.urlFirstChapter,
      truyenID: store.data.truyenID,
      urlStory: route.params.urlStory,
    });
  };
  let gotoListChapters = () => {
    navigation.navigate('ListChapters', {
      truyenID: store.data.truyenID,
      urlStory: route.params.urlStory,
    });
  };

  if (store.loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Image
          source={{
            uri: `${store.data && store.data.imgStory}`,
          }}
          resizeMode="cover"
          style={{height: 200}}
        />
        <View style={{padding: 10}}>
          <Text h3>{store.data && store.data.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 10,
            }}>
            <Button title="Đọc truyện" type="outline" onPress={gotoChapter} />
            <Button
              title="Danh sách chương"
              type="outline"
              onPress={gotoListChapters}
            />
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Text style={{fontWeight: 'bold'}}>Tác giả: </Text>
            <Text>{store.data && store.data.author}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Text style={{fontWeight: 'bold'}}>Thể loại: </Text>
            <Text>{store.data && store.data.cats.join(', ')}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Text style={{fontWeight: 'bold'}}>Nguồn: </Text>
            <Text>{store.data && store.data.source}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Text style={{fontWeight: 'bold'}}>Tình trạng: </Text>
            <Text>{store.data && store.data.status}</Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>Tóm tắt: </Text>
            <HTMLView value={store.data && store.data.description} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoStory;
