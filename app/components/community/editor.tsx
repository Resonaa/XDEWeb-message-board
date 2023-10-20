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
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";

import RenderedText from "./renderedText";

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
}

function AnimatedContent({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Editor<T extends EditorProps>({
  value,
  setValue,
  ...props
}: T) {
  const { t } = useTranslation();

  const tabs = [t("community.edit"), t("community.preview")];

  const tabHoverColor = useColorModeValue("blue.700", "blue.200");

  return (
    <Tabs w="100%" isLazy {...props}>
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
          <AnimatedContent>
            <Textarea
              as={TextareaAutosize}
              minH="4rem"
              maxH="14rem"
              resize="none"
              name="content"
              onChange={e => setValue(e.target.value)}
              placeholder={t("community.placeholder")}
              required
              value={value}
              variant="filled"
            />
          </AnimatedContent>
        </TabPanel>
        <TabPanel px={0}>
          <AnimatedContent>
            <RenderedText content={value} />
          </AnimatedContent>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
