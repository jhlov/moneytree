import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const Setting = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [KIAppKey, setKIAppKey] = useState<string>("");

  return (
    <Row className="justify-content-center pt-5">
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
              <Form.Label>한국투자증권 App Key</Form.Label>
              <Form.Control
                type="text"
                value={KIAppKey}
                onChange={e => setKIAppKey(e.target.value)}
                disabled={!isEdit}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>한국투자증권 App Secret</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={KIAppKey}
                onChange={e => setKIAppKey(e.target.value)}
                disabled={!isEdit}
              />
            </Form.Group>
          </Card.Body>
          {isEdit && (
            <Card.Footer className="text-center">
              <Button
                variant="outline-secondary me-2"
                onClick={() => setIsEdit(false)}
              >
                취소
              </Button>
              <Button variant="primary">적용</Button>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export { Setting };
