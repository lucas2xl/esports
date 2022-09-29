import React from "react";
import {
  Icon,
  Modal,
  Text,
  Pressable,
  useClipboard,
  Center,
  useToast,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Heading } from "./Heading";

interface DuoMatchProps {
  userDiscord: string;
  onClose: () => void;
  isOpen: boolean;
}
export const DuoMatch = ({
  userDiscord,
  isOpen,
  onClose,
  ...rest
}: DuoMatchProps) => {
  const { onCopy } = useClipboard();
  const toast = useToast();

  const handleCopyDiscordUser = () => {
    onCopy(userDiscord);
    onClose();
    toast.show({
      title: "Copiado com sucesso!",
      placement: "top",
      render: () => (
        <Center bg="black" p="4" rounded="lg">
          <Text color="white" fontSize="sm">
            Copiado!
          </Text>
        </Center>
      ),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bg="overlay"
      size="md"
      avoidKeyboard
      isKeyboardDismissable={true}
      shadow="9"
      {...rest}
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
        <Modal.Body>
          <Center mx="4" my="4">
            <Icon
              as={AntDesign}
              name="checkcircleo"
              size={12}
              color="success"
            />

            <Heading
              title="Let's play!"
              subtitle="Agora é só começar a jogar!"
              alignItems="center"
              w="full"
              p="0"
              mt="4"
            />

            <Text fontSize="lg" color="white" mt="6" fontWeight="bold">
              Adicione no Discord
            </Text>

            <Pressable
              w="full"
              p="4"
              bg="background.900"
              rounded="lg"
              alignItems="center"
              justifyContent="center"
              mt="2"
              onPress={handleCopyDiscordUser}
              _pressed={{
                opacity: 0.5,
              }}
            >
              <Text fontSize="md" color="caption.300">
                {userDiscord}
              </Text>
            </Pressable>
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
