import {
  Box,
  Button,
  IButtonProps,
  Icon,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import { Ads } from "../screens/game/Game";
import { Ionicons } from "@expo/vector-icons";

interface DuoCardProps extends IButtonProps {
  data: Ads;
}

export const DuoCard = ({ data, ...rest }: DuoCardProps) => {
  return (
    <Box>
      <VStack
        bg="shape"
        borderRadius="md"
        shadow="2"
        p="4"
        w="200"
        space="4"
        flex="unset"
      >
        <DuoInfo title="Nome" value={data.name} />
        <DuoInfo title="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
        <DuoInfo
          title="Disponibilidade"
          value={`${data.weekDay.length} dias \u2022 ${
            data.hourStart.split(":")[0]
          }h - ${data.hourEnd.split(":")[0]}h`}
        />
        <DuoInfo
          title="Chamada de áudio?"
          value={`${data.useVoiceChannel ? "Sim" : "Não"}`}
          color={data.useVoiceChannel ? "success" : "alert"}
        />

        <Button
          _text={{
            color: "text",
            fontSize: "lg",
            fontWeight: "bold",
          }}
          bg="primary"
          rounded="lg"
          _pressed={{
            opacity: 0.5,
          }}
          leftIcon={
            <Icon
              as={Ionicons}
              name="game-controller-outline"
              color="text"
              size={6}
            />
          }
          {...rest}
        >
          Conectar
        </Button>
      </VStack>
    </Box>
  );
};

interface DuoInfoProps {
  title: string;
  value: string | number;
  color?: string;
}

const DuoInfo = ({ title, value, color }: DuoInfoProps) => {
  return (
    <VStack w="full" space="1">
      <Text fontSize="lg" color="white">
        {title}
      </Text>

      <Text
        fontSize="lg"
        color={color ? color : "white"}
        fontWeight="bold"
        numberOfLines={1}
      >
        {value}
      </Text>
    </VStack>
  );
};
