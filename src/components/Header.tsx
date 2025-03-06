import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello Renzo!</Text>
      <Text style={styles.subHeader}>Are you ready to dance?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "white" ,},
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  subHeader: { fontSize: 16, color: "#666", marginBottom: 15 },
});

export default Header;
