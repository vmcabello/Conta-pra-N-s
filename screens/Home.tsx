import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  HStack,
  Switch,
  Text,
  useColorMode,
  ScrollView,
  Spacer,
  useTheme,
  useDisclose,
  Stagger,
  VStack,
  Pressable,
  Modal,
} from "native-base";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import ButtonLabel from "../components/common/ButtonLabel";
import {
  IconCircle,
  IconSteal,
  IconFurto,
  IconCar,
  IconPoint,
  IconLine,
  IconArrowDown,
  IconSearchPerson,
  IconOther,
} from "../lib/icons";
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { widthPercentageToDP } from "react-native-responsive-screen";
import uuid from "react-native-uuid";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import AppContext from "../Context/AppContext";
import { signOut } from "firebase/auth";

export default function Home({ navigation }: any) {
  const { colors } = useTheme();
  const { isOpen, onToggle } = useDisclose();
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const [events, setEvents] = useState([]);
  const [eventsFiltered, setEventsFiltered] = useState([]);
  const [roubos, setRoubos] = useState([]);
  const [furtos, setFurtos] = useState([]);
  const [acidentes, setAcidentes] = useState([]);
  const [desaparecimientos, setDesaparecimientos] = useState([]);
  const [outros, setOutros] = useState([]);

  const { Filters } = useContext(AppContext);

  useEffect(() => {
    const getEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const events = querySnapshot.docs.map((doc) => doc.data());
      setEvents(events as any);
      setEventsFiltered(events as any);
      filterEventsByCategory(events);
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
    setEventsFiltered(eventsByDateAndTime);
    filterEventsByCategory(eventsByDateAndTime);
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

  const filterEventsByCategory = (eventos: any) => {
    const roubos = eventos.filter((event: any) => event.category === "steal");
    setRoubos(roubos);
    const furtos = eventos.filter((event: any) => event.category === "furto");
    setFurtos(furtos);
    const acidentes = eventos.filter((event: any) => event.category === "car");
    setAcidentes(acidentes);
    const desaparecimientos = eventos.filter(
      (event: any) => event.category === "disappearance"
    );
    setDesaparecimientos(desaparecimientos);
    const outros = eventos.filter((event: any) => event.category === "other");
    setOutros(outros);
  };

  return (
    <Layout>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
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
        {/* TODOS */}
        {selectedCategory === 0 && eventsFiltered.length > 0 && (
          <Heatmap
            points={eventsFiltered.map((event: any) => {
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
        {/* ROUBOS */}
        {selectedCategory === 1 && roubos.length > 0 && (
          <Heatmap
            points={roubos.map((event: any) => {
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
        {/* FURTOS */}
        {selectedCategory === 2 && furtos.length > 0 && (
          <Heatmap
            points={furtos.map((event: any) => {
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
        {/* DESAPEARECIMIENTOS */}
        {selectedCategory === 3 && desaparecimientos.length > 0 && (
          <Heatmap
            points={desaparecimientos.map((event: any) => {
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
        {/* ACIDENTES */}
        {selectedCategory === 4 && acidentes.length > 0 && (
          <Heatmap
            points={acidentes.map((event: any) => {
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
        {/* OUTROS */}
        {selectedCategory === 5 && outros.length > 0 && (
          <Heatmap
            points={outros.map((event: any) => {
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
      <Box
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        {/* ICON POINT*/}
        <Box
          backgroundColor="dark.400"
          style={{
            width: 56,
            height: 56,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            borderRadius: 4,
            marginRight: 15,
            marginBottom: 15,
          }}
        >
          <IconPoint />
        </Box>
        {/* BOTTOM MENU*/}

        <Box
          pt={isOpen ? 0 : 10}
          px={5}
          backgroundColor="dark.50"
          pb={6}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: widthPercentageToDP("100%"),
          }}
        >
          {isOpen && (
            <Pressable onPress={onToggle}>
              <Box pt={5} pb={10} alignItems="center">
                <IconLine size={40} />
              </Box>
            </Pressable>
          )}

          <Stagger
            visible={isOpen}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 10,
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <Box display={isOpen ? "flex" : "none"}>
              <HStack space={6} alignItems="center">
                <Box
                  flex={1}
                  backgroundColor="primary.50"
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconSteal size={42} color="black" />
                </Box>
                <VStack flex={4}>
                  <Text fontSize="xl" fontWeight="medium">
                    {selectedEvent?.category}
                  </Text>
                  <Text fontSize="md" fontWeight="medium">
                    {addZeroBefore(
                      parseDate(
                        selectedEvent?.date.seconds,
                        selectedEvent?.date.nanoseconds
                      ).getHours()
                    ) +
                      ":" +
                      addZeroBefore(
                        parseDate(
                          selectedEvent?.date.seconds,
                          selectedEvent?.date.nanoseconds
                        ).getMinutes()
                      ) +
                      "  •  " +
                      getParsedDate(
                        parseDate(
                          selectedEvent?.date.seconds,
                          selectedEvent?.date.nanoseconds
                        )
                      )}
                  </Text>
                </VStack>
              </HStack>
              <Text fontSize="sm" fontWeight="normal" mt="6">
                Local: {selectedEvent?.address}
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                Boletim de Ocorrência: anexado.
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("Detail", {
                    event: selectedEvent,
                  });
                }}
                fontSize="sm"
                fontWeight="normal"
                mt="6"
                color="primary.50"
              >
                Saiba mais
              </Text>
            </Box>
          </Stagger>
          {!isOpen && (
            <ScrollView horizontal={true}>
              <ButtonLabel
                icon={IconCircle}
                label="Todos"
                isFocused={selectedCategory == 0}
                onPress={() => {
                  setSelectedCategory(0);
                }}
              />
              <ButtonLabel
                icon={IconSteal}
                label="Roubo"
                isFocused={selectedCategory == 1}
                onPress={() => {
                  setSelectedCategory(1);
                }}
              />
              <ButtonLabel
                icon={IconFurto}
                label="Furto"
                isFocused={selectedCategory == 2}
                onPress={() => {
                  setSelectedCategory(2);
                }}
              />
              <ButtonLabel
                icon={IconSearchPerson}
                label="Desaparecimento"
                onPress={() => {
                  setSelectedCategory(3);
                }}
                isFocused={selectedCategory == 3}
              />
              <ButtonLabel
                icon={IconCar}
                label="Acidente de transito"
                isFocused={selectedCategory == 4}
                onPress={() => {
                  setSelectedCategory(4);
                }}
              />
              <ButtonLabel
                icon={IconOther}
                label="Outros"
                isFocused={selectedCategory == 5}
                onPress={() => {
                  setSelectedCategory(5);
                }}
              />
            </ScrollView>
          )}
        </Box>
      </Box>
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

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

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

const parseDate = (seconds: any, nanoseconds: any) => {
  var t = new Date(seconds * 1000 + nanoseconds / 1000000);
  return t;
};

function addZeroBefore(n: number) {
  return (n < 10 ? "0" : "") + n;
}

const getParsedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
