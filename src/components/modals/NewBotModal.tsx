import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getKIAccountWithDash } from "scripts/utils";
import { RootState } from "store";
import { initNewBot, setNewBot } from "store/bot";

interface Props {
  show: boolean;
  onClose: () => void;
}

const NewBotModal = (props: Props) => {
  const dispatch = useDispatch();

  const KIAccounts = useSelector((state: RootState) => state.config.KIAccounts);
  // const KIAccounts: Account[] = [];
  const newBot = useSelector((state: RootState) => state.bot.newBot);

  useEffect(() => {
    if (props.show) {
      dispatch(initNewBot());
    }
  }, [props.show]);

  const handleClose = () => {
    props.onClose();
  };

  const onChange = (key: string, value: string | number) => {
    console.log("onChange", value);
    dispatch(setNewBot({ key, value }));
  };

  const onSubmit = () => {
    return false;
  };

  return (
    <Modal show={props.show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>봇 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col xs="12">
              <Form.Group className="mb-3">
                <Form.Label>계좌</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={newBot.account}
                  onChange={e => onChange("account", e.target.value)}
                  required
                >
                  {KIAccounts.map(account => (
                    <option key={account.account} value={account.account}>
                      {getKIAccountWithDash(account.account)} ({account.name})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Label>
                  이름 <small>(최대 20글자)</small>
                </Form.Label>
                <Form.Control
                  maxLength={20}
                  value={newBot.name}
                  onChange={e => onChange("name", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Label>종류</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={newBot.type}
                  onChange={e => onChange("type", e.target.value)}
                  required
                >
                  <option value="IBv1">무한매수 v1</option>
                  <option value="IBv2">무한매수 v2</option>
                  <option value="IBv2.1">무한매수 v2.1</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  {newBot.type === "IBv1" && (
                    <span>We'll never share your email with anyone else.</span>
                  )}
                </Form.Text>
              </Form.Group>
            </Col>
            {newBot.type.startsWith("IB") && (
              <>
                <Col xs="12" sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>투자금($)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={newBot.seed}
                      onChange={e => onChange("seed", Number(e.target.value))}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>분할 일수</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={newBot.days}
                      onChange={e => onChange("days", Number(e.target.value))}
                      required
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button className="ms-1" type="submit" variant="primary">
              생성
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export { NewBotModal };
