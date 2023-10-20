import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Link as ReactLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import LocaleSelect from "./localeSelect";

export default function Navbar() {
  const { toggleColorMode } = useColorMode();
  const { t } = useTranslation();

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
          <Link
            as={ReactLink}
            pl={{ base: 3, md: 0 }}
            fontFamily="heading"
            fontSize="lg"
            fontWeight={600}
            to="/"
          >
            {t("title")}
          </Link>
        </Flex>

        <ButtonGroup spacing={3} variant="ghost">
          <IconButton
            aria-label="Toggle ColorMode"
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            isRound
            onClick={toggleColorMode}
          />
          <LocaleSelect />
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
