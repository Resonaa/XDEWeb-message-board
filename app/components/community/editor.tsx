import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/tabs";
import { Textarea } from "@chakra-ui/textarea";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";

import RenderedText from "./renderedText";

export default function Editor({
  value,
  setValue
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const { t } = useTranslation();

  const tabs = [t("community.edit"), t("community.preview")];

  const tabHoverColor = useColorModeValue("blue.700", "blue.200");

  return (
    <Tabs w="100%" mt="-4px">
      <TabList border="none">
        {tabs.map(tab => (
          <Tab
            key={tab}
            border="none"
            _hover={{ color: tabHoverColor }}
            transitionDuration=".3s"
          >
            {tab}
          </Tab>
        ))}
      </TabList>

      <TabIndicator
        h="2px"
        bg={useColorModeValue("blue.600", "blue.300")}
        borderRadius="1px"
        transitionDuration=".2s !important"
      />

      <TabPanels>
        <TabPanel px={0}>
          <Textarea
            as={TextareaAutosize}
            minH="4rem"
            maxH="14rem"
            resize="none"
            name="content"
            onChange={e => setValue(e.target.value)}
            placeholder={t("community.placeholder")}
            value={value}
            variant="filled"
          />
        </TabPanel>

        <TabPanel px={0}>
          <RenderedText content={value} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
