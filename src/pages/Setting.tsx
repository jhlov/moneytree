import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateUserInfo } from "store/config";
import "./Setting.scss";

const Setting = () => {
  const dispatch = useDispatch();

  const KIAppKey = useSelector((state: RootState) => state.config.KIAppKey);
  const KIAppSecret = useSelector(
    (state: RootState) => state.config.KIAppSecret
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [curKIAppKey, setCurKIAppKey] = useState<string>("");
  const [curKIAppSecret, setCurKIAppSecret] = useState<string>("");

  useEffect(() => {
    setCurKIAppKey(KIAppKey);
  }, [KIAppKey]);

  useEffect(() => {
    setCurKIAppSecret(KIAppSecret);
  }, [KIAppSecret]);

  const onCancel = () => {
    setIsEdit(false);
    setCurKIAppKey(KIAppKey);
    setCurKIAppSecret(KIAppSecret);
  };

  const onApply = async () => {
    setIsEdit(false);
    dispatch(
      updateUserInfo({ KIAppKey: curKIAppKey, KIAppSecret: curKIAppSecret })
    );
  };

  return (
    <Row className="setting justify-content-center pt-5">
      <Col xs="12" md="10" lg="8" xl="6">
        <Card>
          <Card.Header className="d-flex align-items-center">
            환경설정
            {!isEdit && (
              <EditIcon
                className="icon-btn ms-1"
                fontSize="small"
                onClick={() => setIsEdit(true)}
              />
            )}
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                한국투자증권 App Key{" "}
                <Button
                  variant="outline-secondary ms-2"
                  size="sm"
                  disabled={!curKIAppKey || !curKIAppSecret}
                >
                  TEST
                </Button>
              </Form.Label>
              <Form.Control
                type="text"
                value={curKIAppKey}
                onChange={e => setCurKIAppKey(e.target.value)}
                disabled={!isEdit}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>한국투자증권 App Secret</Form.Label>
              <Form.Control
                className="ki-app-secret"
                as="textarea"
                rows={5}
                value={curKIAppSecret}
                onChange={e => setCurKIAppSecret(e.target.value)}
                disabled={!isEdit}
              />
            </Form.Group>
          </Card.Body>
          {isEdit && (
            <Card.Footer className="text-center">
              <Button variant="outline-secondary me-2" onClick={onCancel}>
                취소
              </Button>
              <Button variant="primary" onClick={onApply}>
                적용
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export { Setting };
