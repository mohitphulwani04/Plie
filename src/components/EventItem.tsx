import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleFavorite } from "../redux/slices/favoriteSlice";

type EventItemProps = {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    tags: string[];
    image: string;
    dateId: string;
  };
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const dispatch = useDispatch();

  // Use a more efficient selector to get only this event's favorite status
  const isFavorite = useSelector(
    (state: RootState) => state.favorites.favoriteIds.includes(event.dateId)
  );

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      {/* Event Image */}
      <Image source={{ uri: event.image }} style={styles.image} />

      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContainerTitle}>
          <Text style={styles.title}>{event.title}</Text>
          <Icon name="chevron-right" size={22} color="#000" />
        </View>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.price}>{event.price}</Text>

        {/* Tags */}
        <View style={styles.tagContainer}>
          {event.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Event Location & Actions */}
      <View style={styles.rightContainer}>
        <Text style={styles.location}>{event.location}</Text>
        <View style={styles.iconContainer}>
          <Icon name="share-2" size={18} color="#000" />

          {/* Heart Icon for Favorite Toggle */}
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(event.dateId))}>
            <Icon name="heart" size={20} color={isFavorite ? "green" : "#ccc"} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(EventItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 74,
    height: 88,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  detailsContainerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 80
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    fontSize: 14,
    color: "green",
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  tagContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  tag: {
    backgroundColor: "#EAEAEA",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    color: "#444",
  },
  rightContainer: {
    alignItems: "flex-end",
    paddingTop: 25,
    rowGap: 10,
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
