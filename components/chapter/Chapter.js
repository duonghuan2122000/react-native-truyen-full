import React, {useEffect, useReducer, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Button} from 'react-native-elements';
import {
  ScrollView,
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import reducer, {initialState} from '../../store/reducer';
import ActionChapter from '../../store/Chapter';
import HTMLView from 'react-native-htmlview';
import {StyleSheet, ActivityIndicator} from 'react-native';
const Chapter = ({navigation, route}) => {
  let gotoListChapters = () => {
    navigation.replace('ListChapters', {
      truyenID: route.params.truyenID,
      urlStory: route.params.urlStory,
    });
  };
  const [state, setState] = useState({chapter: route.params.urlChapter});
  const [store, dispatch] = useReducer(reducer, initialState);

  let gotoNextChapter = () => {
    if (store.data.chapter_next != null) {
      setState({chapter: store.data.chapter_next});
    }
  };

  let gotoPrevChapter = () => {
    if (store.data.chapter_prev != null) {
      setState({chapter: store.data.chapter_prev});
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon={{name: 'list'}} type="clear" onPress={gotoListChapters} />
      ),
    });
  });

  useEffect(() => {
    ActionChapter(dispatch, state.chapter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.chapter]);

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
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            gotoNextChapter();
          }
        }}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) {
              gotoPrevChapter();
            }
          }}>
          <ScrollView style={{padding: 10}}>
            <Text h3 style={{textAlign: 'center'}}>
              {store.data && store.data.nameStory}
            </Text>
            <Text h4 style={{textAlign: 'center'}}>
              {store.data && store.data.chapter}
            </Text>
            <HTMLView
              value={store.data && `<p>${store.data.content}</p>`}
              stylesheet={styles}
            />
          </ScrollView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  p: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Chapter;
