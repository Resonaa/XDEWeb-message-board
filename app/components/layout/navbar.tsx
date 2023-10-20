import { ButtonGroup } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Link as RemixLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import ColorModeToggle from "./colorModeToggle";
import LocaleSelect from "./localeSelect";

function Title() {
  const { t } = useTranslation();

  return (
    <Link
      as={RemixLink}
      pl={{ base: 3, lg: 0 }}
      textAlign="center"
      fontFamily="heading"
      fontSize="lg"
      fontWeight={600}
      to="/"
    >
      {t("title")}
    </Link>
  );
}

export default function Navbar() {
  return (
    <Box
      pos="fixed"
      zIndex={161}
      top={0}
      w="100%"
      bg={useColorModeValue("whiteAlpha.800", "rgba(26, 32, 44, .8)")}
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      backdropFilter="blur(14px)"
    >
      <Flex align="center" maxW="6xl" mx="auto" px={4} py={2}>
        <Flex align="center" justify="start" flex={1}>
          <Title />
        </Flex>

        <ButtonGroup spacing={3} variant="ghost">
          <ColorModeToggle />
          <LocaleSelect />
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
