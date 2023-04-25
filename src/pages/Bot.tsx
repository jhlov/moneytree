import { NewBotModal } from "components/modals/NewBotModal";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Bot = () => {
  const [showNewBotModal, setShowNewBotModal] = useState(false);

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
