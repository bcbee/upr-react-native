import InstructionPage from "../components/InstructionPage";
import Link from "../components/Link";

export default function Instruction3({ navigation }) {
  return (
    <InstructionPage
      navigation={navigation}
      step={3}
      title="Connect and go"
      text={
        <>
          Once the remote has successfully connected, open your presentation. You
          should now be able to control it using your iPhone, iPad, iPod Touch or
          Apple Watch. If you have any issues connecting or presenting, do not
          hesitate to contact our support team at{" "}
          <Link url="mailto:support@dbztech.com">support@dbztech.com</Link>.
        </>
      }
      image={require("../../assets/images/instruction_3.png")}
    />
  );
}
