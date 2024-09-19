import { Modal } from "flowbite-react";
import { Chat } from "./Chat";
import { ChatForm } from "./ChatForm";
import { UserAvatar } from "../../../components/UserAvatar";
interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  imgUrl?: string;
  fullname?: string;
}
export const ChatModal: React.FC<IProps> = ({
  openModal,
  setOpenModal,
  username,
  imgUrl,
  fullname,
}) => {
  return (
    <>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="4xl"
      >
        <Modal.Header className="grid grid-cols-4">
          <div className="flex ml-auto">
            <UserAvatar
              username={username}
              imgUrl={imgUrl}
              fullname={fullname}
              followersCount={0}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Chat username={username} imgUrl={imgUrl} fullname={fullname} />
        </Modal.Body>
        <Modal.Footer>
          <ChatForm ReciverUsername={username} />
        </Modal.Footer>
      </Modal>
    </>
  );
};
