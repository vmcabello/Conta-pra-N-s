import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import {
  Box,
  HStack,
  Pressable,
  Switch,
  Text,
  useColorMode,
  useDisclose,
  useTheme,
  View,
  VStack,
} from "native-base";
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { StyleSheet, Dimensions, Platform, ScrollView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import AppContext from "../Context/AppContext";
import {
  IconArrowRight,
  IconCar,
  IconCircle,
  IconFurto,
  IconSteal,
  IconStrokeCircle,
} from "../lib/icons";
import ButtonLabel from "../components/common/ButtonLabel";

export default function Register({ navigation }: any) {
  const { colors } = useTheme();
  const { isOpen, onToggle } = useDisclose();

  const [events, setEvents] = useState([]);

  const { Filters } = useContext(AppContext);

  useEffect(() => {
    const getEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const events = querySnapshot.docs.map((doc) => doc.data());
      setEvents(events as any);
    };
    getEvents();
  }, []);

  useEffect(() => {
    filterEventsByDate();
  }, [Filters]);

  const filterEventsByDate = () => {
    const eventsByDateAndTime = events.filter(
      (event: any) =>
        filterDate(
          parseDate(event.date.seconds, event.date.nanoseconds),
          Filters?.date_start
        ) &&
        filterDate(
          Filters?.date_end,
          parseDate(event.date.seconds, event.date.nanoseconds)
        ) &&
        filterTime(
          parseDate(event.date.seconds, event.date.nanoseconds),
          Filters?.time_start
        ) &&
        filterTime(
          Filters?.time_end,
          parseDate(event.date.seconds, event.date.nanoseconds)
        )
    );
    setEvents(eventsByDateAndTime);
  };

  const filterDate = (date1: any, date2: any) => {
    const date1Total =
      date1.getFullYear() * 525600 +
      (date1.getMonth() + 1) * 43800 +
      date1.getDate() * 1440;
    const date2Total =
      date2.getFullYear() * 525600 +
      (date2.getMonth() + 1) * 43800 +
      date2.getDate() * 1440;
    return date1Total >= date2Total;
  };

  const filterTime = (time1: any, time2: any) => {
    const time1Total = time1.getHours() * 60 + time1.getMinutes();
    const time2Total = time2.getHours() * 60 + time2.getMinutes();
    return time1Total >= time2Total;
  };

  const parseDate = (seconds: any, nanoseconds: any) => {
    var t = new Date(seconds * 1000 + nanoseconds / 1000000);
    return t;
  };

  return (
    <Layout>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        minZoomLevel={15}
        initialRegion={{
          latitude: -22.82057054218252,
          longitude: -47.069679887540005,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}
      >
        {events.length > 0 && (
          <Heatmap
            points={events.map((event: any) => {
              return {
                latitude: event.latitude,
                longitude: event.longitude,
                intensity: 10,
              };
            })}
            radius={40}
            opacity={0.7}
          />
        )}
      </MapView>

      {/* <Layout> */}
      <Pressable
        style={{
          position: "absolute",
          bottom: 0,
        }}
        onPress={() => navigation.navigate("RegisterEvent")}
      >
        <Box
          pt={10}
          px={5}
          backgroundColor="dark.50"
          pb={6}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: widthPercentageToDP("100%"),
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box alignItems="center" flex={0.3} pt={1}>
            <IconStrokeCircle color={colors.primary[50]} size={20} />
          </Box>
          <VStack space={1} alignItems="flex-start" flex={1}>
            <Text fontSize="md" fontWeight="medium" color="dark.800">
              Registrar ocorrência
            </Text>
            <Text fontSize="xs" color="dark.500">
              Ajude a tornar a comunidade mais informada e segura.
            </Text>
          </VStack>
          <Box justifyContent="center" flex={0.3}>
            <IconArrowRight color={colors.primary[50]} size={25} />
          </Box>
        </Box>
      </Pressable>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// google maps style dark

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c5a71",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];
