import { Button } from "@chakra-ui/button";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillSendFill } from "react-icons/bs";

import Editor from "./editor";

export default function AddMessage() {
  const fetcher = useFetcher();
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (fetcher.state === "idle") {
      setValue("");
    }
  }, [fetcher.state]);

  return (
    <fetcher.Form method="post" action="/?index" style={{ width: "100%" }}>
      <Editor value={value} setValue={setValue} />
      <Button
        colorScheme="blue"
        isLoading={fetcher.state !== "idle"}
        isDisabled={value.trim().length === 0}
        leftIcon={<BsFillSendFill />}
        float="right"
        type="submit"
      >
        {t("community.add-message")}
      </Button>
    </fetcher.Form>
  );
}
