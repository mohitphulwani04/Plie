import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EventItem from '../components/EventItem';

const FavoritesScreen: React.FC = () => {
  // Get all events and favorite IDs
  const allEvents = useSelector((state: RootState) => state.events.events?.events || []);
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);

  // Filter only favorite events
  const favoriteEvents = allEvents.filter(event => favoriteIds.includes(event.event_date_id.toString()));

  return (
    <View style={styles.container}>
      {favoriteEvents.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={item => item.event_id.toString()}
          renderItem={({ item }) => (
            <EventItem
              event={{
                id: item.event_id.toString(),
                title: item.event_name,
                date: item.readable_from_date,
                location: `${item.city}, ${item.country}`,
                price: item.event_price_from === 0 && item.event_price_to === 0
                  ? 'Free'
                  : `€${item.event_price_from} - €${item.event_price_to}`,
                tags: item.keywords,
                image: item.event_profile_img,
                dateId: item.event_date_id.toString()
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F2F2F2' },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
});

export default FavoritesScreen;
