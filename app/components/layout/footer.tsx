import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

function SocialButton({
  children,
  label,
  href
}: {
  children: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Tooltip label={label} placement="top">
      <chakra.button
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        rounded="full"
        w={8}
        h={8}
        as="a"
        href={href}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        transition="background .3s ease"
        _hover={{
          bg: useColorModeValue("blackAlpha.300", "whiteAlpha.300")
        }}
      >
        {children}
      </chakra.button>
    </Tooltip>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      pos="absolute"
      bottom={0}
      w="100%"
      color={useColorModeValue("gray.700", "gray.200")}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Container
        as={Stack}
        align={{ base: "center", md: "center" }}
        justify={{ base: "center", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
        maxW="6xl"
        py={4}
        spacing={4}
      >
        <Text>Copyright © 2023 XDE Web</Text>

        <Stack direction="row" spacing={6}>
          <SocialButton label={t("back")} href="https://www.kjzxxyq.top">
            <FaHome />
          </SocialButton>

          <SocialButton
            label="GitHub"
            href="https://github.com/jwcub/XDEWeb-message-board"
          >
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
