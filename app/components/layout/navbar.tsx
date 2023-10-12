import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Link,
  useBreakpointValue,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { Link as ReactLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import LocaleSelect from "./localeSelect";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Box
      pos="fixed"
      zIndex={161}
      top={0}
      w="100%"
      color={useColorModeValue("gray.600", "white")}
      bg={useColorModeValue("white", "gray.800")}
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
      borderBottom={1}
    >
      <Flex align="center" maxW="6xl" mx="auto" px={4} py={2}>
        <Flex align="center" justify="start" flex={1}>
          <Link
            as={ReactLink}
            display="block"
            pl={useBreakpointValue({ base: 3, md: 0 })}
            color={useColorModeValue("gray.800", "white")}
            fontFamily="heading"
            fontSize="xl"
            fontWeight={600}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            to="/"
          >
            {t("title")}
          </Link>
        </Flex>

        <ButtonGroup size="md" spacing={3}>
          <IconButton
            aria-label="Toggle ColorMode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            isRound
            onClick={toggleColorMode}
            variant="ghost"
          />
          <LocaleSelect />
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
