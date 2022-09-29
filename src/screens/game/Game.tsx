import React, { useCallback, useState } from "react";
import {
  Box,
  FlatList,
  Icon,
  Image,
  Pressable,
  useDisclose,
} from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Game as GameProps } from "../home/Home";
import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { DuoCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export interface Ads {
  id: string;
  name: string;
  weekDay: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}
interface RoutesProps {
  game: GameProps;
}
export const Game = () => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const navigation = useNavigation();
  const { game } = useRoute().params as RoutesProps;
  const [ads, setAds] = useState<Ads[]>([]);
  const [userDiscord, setUserDiscord] = useState("");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        fetch(`http://192.168.254.56:3333/games/${game.id}/ads`)
          .then((response) => response.json())
          .then(setAds);
      })();
    }, [])
  );

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const handleFetchDiscordUser = async (id: string) => {
    try {
      fetch(`http://192.168.254.56:3333/ads/${id}/discord`)
        .then((response) => response.json())
        .then((data) => {
          setUserDiscord(data.discord);
          onOpen();
        });
    } catch (error) {}
  };

  return (
    <Background>
      <Box flex="1" safeArea alignItems="center">
        <Box
          w="full"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Pressable onPress={handleNavigateGoBack} p="2">
            <Icon
              as={Entypo}
              name="chevron-thin-left"
              color="caption.300"
              size="sm"
            />
          </Pressable>

          <Image source={logoImg} alt="logo" size="md" resizeMode="contain" />

          <Box p="2">
            <Icon size="sm" />
          </Box>
        </Box>

        <Image
          source={{ uri: game.bannerUrl }}
          alt="game image"
          resizeMode="cover"
          rounded="md"
          w="90%"
          h="40"
          mx="auto"
          mt="4"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onPress={() => handleFetchDiscordUser(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <Box w="4" />}
          contentContainerStyle={{
            paddingLeft: 16,
            paddingRight: 64,
            minWidth: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListEmptyComponent={() => (
            <Box mt="4">
              <Heading
                title="Nenhum anúncio encontrado"
                subtitle="Que tal criar um anúncio?"
              />
            </Box>
          )}
        />
      </Box>
      <DuoMatch isOpen={isOpen} onClose={onClose} userDiscord={userDiscord} />
    </Background>
  );
};
