import InstructionPage from "../components/InstructionPage";

export default function Instruction3({ navigation }) {
  return (
    <InstructionPage
      navigation={navigation}
      text="Once the remote has successfully connected, open your presentation. You should now be able to control it using your iPhone, iPad, iPod Touch or Apple Watch. If you have any issues connecting or presenting, do not hesitate to contact our support team at support@dbztech.com."
      image={require("../../assets/images/instruction_3.png")}
    />
  );
}
