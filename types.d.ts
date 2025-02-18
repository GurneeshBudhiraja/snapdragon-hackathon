interface GetRoomInfoProps {
  path: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, params: "getName" | "submit") => void;
  roomIdInput?: React.RefObject<HTMLInputElement | null>;
  passwordInput?: React.RefObject<HTMLInputElement | null>;
  userNameRef?: React.RefObject<HTMLInputElement | null>;
}