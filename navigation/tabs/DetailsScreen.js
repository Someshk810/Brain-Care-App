import * as React from 'react';
import { View, Text,FlatList,Dimensions } from 'react-native';
import {PLACES, TOP_PLACES} from '../../constant/data';
import TopPlacesCarousel from '../../components/TopPlacesCarausel';
import Card from '../../components/Card';
import houses from '../../constant/houses';

import TopHotelCard from '../../components/TopHotelCard';

export default function DetailsScreen({ navigation }) {
  const {width} = Dimensions.get('screen');
    return (
      <>
        {/*<TopPlacesCarousel list={TOP_PLACES} />*/}
        {/*<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Details Screen</Text>
        </View>*/}
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          horizontal
          data={houses}
          renderItem={({item}) => <Card house={item} navigation= {navigation} />}
        />
        <FlatList
          data={houses}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => <TopHotelCard hotel={item} />}
        />
        </>
    );
}