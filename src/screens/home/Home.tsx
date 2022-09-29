import React, { useEffect, useState } from "react";
import {
  Box,
  Fab,
  FlatList,
  Image,
  Icon,
  useDisclose,
  ScrollView,
} from "native-base";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { AntDesign } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { Background } from "../../components/Background";
import { RefreshControl } from "react-native";
import { PublishAd } from "../../components/PublishAd";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclose();
  const [games, setGames] = useState<Game[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      fetch("http://192.168.254.56:3333/games")
        .then((response) => response.json())
        .then(setGames);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleNavigateToGame = (game: Game) => {
    navigation.navigate("Game", { game: game });
  };

  return (
    <Background>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchGames} />
        }
      >
        <Box flex="1" safeArea alignItems="center">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Image source={logoImg} alt="logo" mt="74px" mb="48px" />

              <Heading
                title="Encontre seu duo!"
                subtitle="Selecione o game que deseja jogar..."
              />

              <FlatList
                data={games}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <GameCard
                    data={item}
                    onPress={() => handleNavigateToGame(item)}
                  />
                )}
                ItemSeparatorComponent={() => <Box w="4" />}
                contentContainerStyle={{
                  paddingLeft: 16,
                  paddingRight: 64,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              />

              <PublishAd data={games} isOpen={isOpen} onClose={onClose} />
            </>
          )}
        </Box>
      </ScrollView>
      <Fab
        renderInPortal={false}
        bg="violet.900"
        shadow={2}
        h="16"
        w="16"
        variant="solid"
        icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
        _pressed={{
          bg: "primary",
        }}
        onPress={onOpen}
      />
    </Background>
  );
};
