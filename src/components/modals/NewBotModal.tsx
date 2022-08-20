import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { initNewBot, setNewBot } from "store/bot";

interface Props {
  show: boolean;
  onClose: () => void;
}

const NewBotModal = (props: Props) => {
  const dispatch = useDispatch();

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

  return (
    <Modal show={props.show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>봇 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Label>
                  이름 <small>(최대 20글자)</small>
                </Form.Label>
                <Form.Control
                  maxLength={20}
                  value={newBot.name}
                  onChange={e => onChange("name", e.target.value)}
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
                      value={newBot.seed}
                      onChange={e => onChange("seed", Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>분할 일수</Form.Label>
                    <Form.Control
                      type="number"
                      value={newBot.days}
                      onChange={e => onChange("days", Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { NewBotModal };
