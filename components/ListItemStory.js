import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Image, Text} from 'react-native-elements';
import {View} from 'react-native';

const ListItemStory = ({navigation, imgStory, nameStory, urlStory}) => {
  let gotoInfoStory = () => {
    navigation.navigate('InfoStory', {urlStory});
  };
  return (
    <TouchableOpacity onPress={gotoInfoStory}>
      <Card>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <Image
              style={{height: 100}}
              source={{
                uri: `${imgStory}`,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{flex: 7, marginHorizontal: 10}}>
            <Text style={{fontSize: 18}}>{nameStory}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ListItemStory;
