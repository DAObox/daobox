import { FiInbox } from "react-icons/fi";
import { PageContent, Variant } from "../../components/templates/PageContent";
import { TransactionList } from "../../components/organisams/TransactionList";
import { VoteList } from "../../components/organisams/VoteList";
import { StatBar } from "../../components/organisams/StatBar";
import { TwoThirdSplitLayout } from "../../components/templates/TwoThirdSplitLayout";
import { useDrawer } from "../../components/providers/DrawProvider";
import SignalVoteForm from "../../components/organisams/SignalVoteForm";

import { useFetchDao } from "@daobox/use-aragon";

export default function Home() {
  const { onOpen } = useDrawer();
  console.log({ d: useFetchDao("0xb76f8d3512497040a96e77141c951a5374f24eb9") });

  const openDrawerWithContent = () => {
    onOpen({
      header: "Signal Vote",
      form: <SignalVoteForm id="my-form" />,
      formId: "my-form",
      formText: "Create Vote",
    });
  };

  const buttonSettings = [
    {
      label: "New Proposal",
      variant: Variant.PRIMARY,
      icon: <FiInbox fontSize="1.25rem" />,
      onClick: () => openDrawerWithContent(),
    },
  ];

  return (
    <PageContent
      title={"Home"}
      subtitle={"where stuff happens"}
      ctaButtons={buttonSettings}
      content={
        <>
          <StatBar />
          <TwoThirdSplitLayout left={<VoteList />} right={<TransactionList />} />
        </>
      }
    />
  );
}
