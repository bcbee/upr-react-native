import InstructionPage from "../components/InstructionPage";

export default function Instruction1({ navigation }) {
  return (
    <InstructionPage
      navigation={navigation}
      text="Download the UPR Controller App on the presenting computer. This can be found at universalpresenterremote.com. Once installed, open the application and verify that your computer is connected to the internet."
      image={require("../../assets/images/instruction_1.png")}
      nextPage="Instruction2"
    />
  );
}
