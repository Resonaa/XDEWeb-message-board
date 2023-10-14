import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
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

  return (
    <Tabs w="100%" isLazy {...props}>
      <TabList border="none">
        <Tab border="none" transitionDuration=".3s">
          {t("community.edit")}
        </Tab>
        <Tab border="none" transitionDuration=".3s">
          {t("community.preview")}
        </Tab>
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
