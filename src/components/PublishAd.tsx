import React, { forwardRef, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Icon,
  IInputProps,
  Input,
  Modal,
  Select,
  ISelectProps,
  Image,
  Text,
  Pressable,
  Box,
  IPressableProps,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Game } from "../screens/home/Home";

interface PublishAdProps {
  isOpen: boolean;
  onClose: () => void;
  data: Game[];
}
const maskTime = (value: string) => {
  return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1:$2");
};

export const PublishAd = ({ data, isOpen, onClose }: PublishAdProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = useRef<TextInput>(null);
  const secondaryRef = useRef<TextInput>(null);
  const finalRef = useRef<TextInput>(null);
  const [gameId, setGameId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([1, 2, 3, 4, 5]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [yearsPlaying, setYearsPlaying] = useState("");
  const [userDiscord, setUserDiscord] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const handlePublishAd = () => {
    setIsLoading(true);
    try {
      const data = {
        name: userNickname,
        discord: userDiscord,
        yearsPlaying: Number(yearsPlaying),
        weekDay: days.map((day) => String(day)),
        hourStart: startTime,
        hourEnd: endTime,
        useVoiceChannel: useVoiceChannel,
      };
      fetch(`http://192.168.1.12:3333/games/${gameId}/ads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      onClose();
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDays = (value: number) => {
    const isAlreadySelected = days.includes(value);
    if (isAlreadySelected) {
      const filteredDays = days.filter((item) => item !== value);
      setDays(filteredDays);
    } else {
      setDays((oldValue) => [...oldValue, value]);
    }
  };

  const handleChangeStartTime = (value: string) => {
    if (value.length < 4) {
      setStartTime(value);
    } else {
      setStartTime(maskTime(value));
    }
  };
  const handleChangeEndTime = (value: string) => {
    if (value.length < 4) {
      setEndTime(value);
    } else {
      setEndTime(maskTime(value));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bg="overlay"
      size="xl"
      avoidKeyboard
      isKeyboardDismissable={true}
      shadow="9"
    >
      <Modal.Content bg="shape">
        <Modal.CloseButton
          _icon={{
            color: "white",
          }}
          _pressed={{
            bg: "primary",
          }}
        />
        <Modal.Header
          bg="shape"
          borderColor="shape"
          _text={{
            color: "text",
            fontSize: "lg",
            fontWeight: "bold",
          }}
        >
          Publique um anúncio
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <SelectModal
              title="Qual o game?"
              selectedValue={gameId}
              onValueChange={setGameId}
              data={data}
              placeholder="Selecione o game que deseja jogar"
            />
          </FormControl>

          <FormControl mt="3">
            <InputModal
              value={userNickname}
              onChangeText={setUserNickname}
              ref={initialRef}
              onSubmitEditing={() => secondaryRef.current?.focus()}
              blurOnSubmit={false}
              returnKeyType="next"
              title="Seu nome (ou nickname)"
              placeholder="Como te chamam dentro do game?"
            />
          </FormControl>

          <HStack
            mt="3"
            justifyContent="space-between"
            space="2"
            alignItems="center"
          >
            <FormControl flex="1">
              <InputModal
                value={yearsPlaying}
                onChangeText={setYearsPlaying}
                ref={secondaryRef}
                onSubmitEditing={() => finalRef.current?.focus()}
                blurOnSubmit={false}
                returnKeyType="done"
                title="Joga há quantos anos?"
                placeholder="Tudo bem ser ZERO"
                keyboardType="numeric"
              />
            </FormControl>

            <FormControl flex="1">
              <InputModal
                value={userDiscord}
                onChangeText={setUserDiscord}
                ref={finalRef}
                title="Qual seu Discord?"
                placeholder="Usuário#0000"
              />
            </FormControl>
          </HStack>

          <Box mt="3">
            <FormControl.Label
              _text={{
                color: "text",
                fontSize: "md",
              }}
            >
              Quando costuma jogar?
            </FormControl.Label>
            <HStack space="1">
              <DaysModal
                value="D"
                isSelected={days.includes(0)}
                onPress={() => handleChangeDays(0)}
              />
              <DaysModal
                value="S"
                isSelected={days.includes(1)}
                onPress={() => handleChangeDays(1)}
              />
              <DaysModal
                value="T"
                isSelected={days.includes(2)}
                onPress={() => handleChangeDays(2)}
              />
              <DaysModal
                value="Q"
                isSelected={days.includes(3)}
                onPress={() => handleChangeDays(3)}
              />
              <DaysModal
                value="Q"
                isSelected={days.includes(4)}
                onPress={() => handleChangeDays(4)}
              />
              <DaysModal
                value="S"
                isSelected={days.includes(5)}
                onPress={() => handleChangeDays(5)}
              />
              <DaysModal
                value="S"
                isSelected={days.includes(6)}
                onPress={() => handleChangeDays(6)}
              />
            </HStack>
          </Box>

          <Box mt="3">
            <FormControl.Label
              _text={{
                color: "text",
                fontSize: "md",
              }}
            >
              Qual horário do dia?
            </FormControl.Label>

            <HStack space="2" w="full">
              <InputComponent
                placeholder="De"
                keyboardType="numeric"
                value={startTime}
                onChangeText={handleChangeStartTime}
                maxLength={5}
              />
              <InputComponent
                placeholder="Até"
                keyboardType="numeric"
                value={endTime}
                onChangeText={handleChangeEndTime}
                maxLength={5}
              />
            </HStack>
          </Box>

          <Checkbox
            value="permission"
            bg="background.800"
            onChange={setUseVoiceChannel}
            isChecked={useVoiceChannel}
            borderColor="background.800"
            mt="3"
            _pressed={{
              bg: "background.800",
              borderColor: "background.800",
            }}
            _checked={{
              bg: "background.800",
              borderColor: "background.800",
              _icon: {
                color: "success",
              },
            }}
            _text={{
              color: "text",
            }}
          >
            Costumo me conectar ao chat de voz
          </Checkbox>
        </Modal.Body>
        <Modal.Footer bg="shape" borderColor="shape">
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              bg="trueGray.500"
              colorScheme="blueGray"
              onPress={onClose}
              _text={{
                color: "text",
              }}
              _pressed={{
                opacity: 0.5,
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={handlePublishAd}
              _text={{
                color: "text",
              }}
              bg="primary"
              leftIcon={
                <Icon
                  as={Ionicons}
                  name="game-controller-outline"
                  color="text"
                />
              }
              _pressed={{
                opacity: 0.5,
              }}
              _spinner={{
                color: "white",
              }}
              _loading={{
                bg: "primary",
              }}
              isLoading={isLoading}
            >
              Encontrar duo
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

interface InputModalProps extends IInputProps {
  title: string;
}
const InputModal = forwardRef(({ title, ...rest }: InputModalProps, ref) => {
  return (
    <>
      <FormControl.Label
        _text={{
          color: "text",
          fontSize: "md",
        }}
      >
        {title}
      </FormControl.Label>
      <Input
        ref={ref as any}
        borderColor="background.900"
        bg="background.800"
        fontSize="sm"
        color="text"
        placeholderTextColor="gray.400"
        _focus={{
          bg: "background.900",
          borderColor: "primary",
        }}
        {...rest}
      />
    </>
  );
});

interface SelectModalProps extends ISelectProps {
  title: string;
  placeholder: string;
  data: Game[];
}
const SelectModal = ({ title, data, ...rest }: SelectModalProps) => {
  return (
    <>
      <FormControl.Label
        _text={{
          color: "text",
          fontSize: "md",
        }}
      >
        {title}
      </FormControl.Label>
      <Select
        borderColor="background.900"
        bg="background.800"
        fontSize="sm"
        color="text"
        placeholderTextColor="gray.400"
        _actionSheet={{
          bg: "overlay",
        }}
        _actionSheetContent={{
          bg: "background.800",
        }}
        {...rest}
      >
        {data.map((item) => (
          <Select.Item
            key={item.id}
            bg="background.800"
            _text={{
              color: "text",
            }}
            _stack={{
              alignItems: "center",
            }}
            label={item.title}
            value={item.id}
            leftIcon={
              <Image alt="banner " source={{ uri: item.bannerUrl }} size={5} />
            }
          />
        ))}
      </Select>
    </>
  );
};

interface DaysModalProps extends IPressableProps {
  value: string;
  isSelected: boolean;
}
const DaysModal = ({ value, isSelected, ...rest }: DaysModalProps) => {
  return (
    <Pressable
      h="10"
      w="10"
      bg={isSelected ? "primary" : "background.800"}
      alignItems="center"
      justifyContent="center"
      rounded="md"
      _pressed={{
        bg: "primary",
      }}
      {...rest}
    >
      <Text color="text">{value}</Text>
    </Pressable>
  );
};

interface InputComponentProps extends IInputProps {}
const InputComponent = ({ ...rest }: InputComponentProps) => {
  return (
    <Input
      borderColor="background.900"
      bg="background.800"
      fontSize="sm"
      color="text"
      placeholderTextColor="gray.400"
      flex="1"
      _focus={{
        bg: "background.900",
        borderColor: "primary",
      }}
      {...rest}
    />
  );
};
