import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { chakra } from "@chakra-ui/system";
import { useTranslation } from "react-i18next";
import { HiMiniLanguage } from "react-icons/hi2";

import i18nConfig from "~/i18n";

function DropdownRightIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <Icon
      as={ChevronDownIcon}
      transform={isOpen ? "rotate(180deg)" : undefined}
      transition="all .25s ease-in-out"
    />
  );
}

export default function LocaleSelect() {
  const { i18n, t } = useTranslation();

  return (
    <Menu autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={<DropdownRightIcon isOpen={isOpen} />}
            rounded="full"
          >
            <Flex align="center" h="100%">
              <HiMiniLanguage />
              <chakra.span pl="3px">{t("lang." + i18n.language)}</chakra.span>
            </Flex>
          </MenuButton>
          <MenuList border="none" shadow="xl">
            {i18nConfig.supportedLngs.map(language => (
              <MenuItem
                key={language}
                justifyContent="space-between"
                fontWeight={i18n.language === language ? "bold" : "normal"}
                transition="background .15s ease"
                onClick={() => i18n.changeLanguage(language)}
              >
                {t("lang." + language)}
                {i18n.language === language && <CheckIcon />}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
}
