import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchEvents } from '../redux/slices/eventSlice';
import EventItem from '../components/EventItem';

const EventsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  console.log('Redux State - Events:', events);

  const Events = events?.events

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#17C964" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={Events}
        keyExtractor={item => item.event_id.toString()} // Corrected keyExtractor
        renderItem={({ item }) => (
          <EventItem
            event={{
              id: item.event_id.toString(),
              title: item.event_name,
              date: item.readable_from_date || 'N/A',
              location: `${item.city}, ${item.country}`,
              price: item.event_price_from > 0 ? `$${item.event_price_from}` : 'Free',
              tags: item.keywords || [],
              image: item.event_profile_img || '',
              dateId: item.event_date_id.toString()
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F2F2F2' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
});

export default EventsScreen;
