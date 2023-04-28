import { NewBotModal } from "components/modals/NewBotModal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "store/useAuth";
import { useBot } from "store/useBot";

const Bot = () => {
  const [showNewBotModal, setShowNewBotModal] = useState(false);

  const { botList, getBotList } = useBot();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      getBotList();
    }
  }, [isLogin]);

  const onClickAddBot = () => {
    console.log("onClickAddBot");
    setShowNewBotModal(true);
  };

  const onSuccessCreateBot = () => {
    console.log("success");
  };

  return (
    <>
      <div className="d-grid">
        {botList.map(bot => (
          <div key={bot.id}>{bot.name}</div>
        ))}

        <Button variant="primary" size="lg" onClick={onClickAddBot}>
          + 봇 생성
        </Button>
      </div>

      <NewBotModal
        show={showNewBotModal}
        onClose={() => setShowNewBotModal(false)}
        onSuccess={onSuccessCreateBot}
      />
    </>
  );
};

export { Bot };
