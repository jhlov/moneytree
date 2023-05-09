import { BotCard } from "components/BotCard";
import { NewBotModal } from "components/modals/NewBotModal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "store/useAuth";
import { useBot } from "store/useBot";
import "./Bot.scss";

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
      <div className="bot">
        {botList.map(bot => {
          if (bot.type === "0458") {
            return <BotCard key={bot.id} bot={bot} />;
          }
        })}

        <Button
          className="bot__add-btn"
          variant="outline-primary"
          size="lg"
          onClick={onClickAddBot}
        >
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
