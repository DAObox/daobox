import { SimpleGrid } from "@chakra-ui/react";
import { FiUsers, FiMail, FiSend } from "react-icons/fi";
import { BsCash, BsCashCoin } from "react-icons/bs";
import { Stat } from "../atoms/Stat";
import { SiCashapp } from "react-icons/si";
import { RiMoneyDollarBoxFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { FaVoteYea } from "react-icons/fa";

export const stats = [
  {
    icon: ImUsers,
    label: "Total Members",
    value: "12",
  },
  {
    icon: FaVoteYea,
    label: "Total Proposals",
    value: "2",
  },
  {
    icon: RiMoneyDollarBoxFill,
    label: "Vault Value",
    value: "$42,069",
  },
];

export function StatBar() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
      {stats.map((stat, id) => (
        <Stat key={id} {...stat} />
      ))}
    </SimpleGrid>
  );
}
