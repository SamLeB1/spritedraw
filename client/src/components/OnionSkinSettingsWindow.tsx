import FloatingWindow from "./FloatingWindow";

type OnionSkinSettingsWindowProps = {
  onClose: () => void;
};

export default function OnionSkinSettingsWindow({
  onClose,
}: OnionSkinSettingsWindowProps) {
  return (
    <FloatingWindow title="Onion Skin Settings" onClose={onClose}>
      <></>
    </FloatingWindow>
  );
}
