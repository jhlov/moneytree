import { Tooltip } from "components/Tooltip";
import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getKIAccountWithDash } from "scripts/utils";
import { useBot } from "store/useBot";
import { useConfig } from "store/useConfig";

interface Props {
  show: boolean;
  onClose: () => void;
}

const NewBotModal = (props: Props) => {
  const { KIAccounts } = useConfig();
  const { newBot, createBot, initNewBot, setNewBot } = useBot();

  const stocks: string[] = [
    "BNKU",
    "BULZ",
    "CURE",
    "DFEN",
    "DPST",
    "DRN",
    "DUSL",
    "FAS",
    "FNGU",
    "HIBL",
    "LABU",
    "MIDU",
    "NAIL",
    "PILL",
    "RETL",
    "SOXL",
    "TECL",
    "TNA",
    "TPOR",
    "TQQQ",
    "UDOW",
    "UPRO",
    "UTSL",
    "WANT",
    "WEBL"
  ];

  const stopLosses = [
    ["쿼터 손절", "QUARTER_STOP_LOSS"],
    // ["10% 이내 손절", "WITHIN_10"],
    // ["10% 이내 손절/10% 이상 쿼터 손절", "WITHIN_10_QUARTER_STOP_LOSS"],
    ["손절 없음", "NONE"]
  ];

  useEffect(() => {
    if (props.show) {
      initNewBot();
    }
  }, [props.show]);

  const handleClose = () => {
    props.onClose();
  };

  const onChange = (key: string, value: string | number | boolean) => {
    console.log("onChange", value);
    setNewBot({ key, value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("onSubmit", e);
    createBot(newBot);
    handleClose();
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
                  <option value="">선택하세요.</option>
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
                <Form.Label>종목</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={newBot.stock}
                  onChange={e => onChange("stock", e.target.value)}
                  required
                >
                  {stocks.map(stock => (
                    <option key={stock} value={stock}>
                      {stock}
                    </option>
                  ))}
                </Form.Select>
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
                  {newBot.type.startsWith("IB") && (
                    <>
                      매수/매도 조건{" "}
                      <Tooltip>
                        <div className="text-start">
                          {newBot.type === "IBv1" && (
                            <>
                              <div>매수</div>
                              <div className="ms-1">
                                - LOC평단매수: 평단 * 0.5회액수
                              </div>
                              <div className="ms-1">
                                - LOC큰수매수: 현재가 +10% * 0.5회액수
                              </div>
                              <div>매도: 평단 +10%</div>
                            </>
                          )}
                          {newBot.type === "IBv2" && (
                            <>
                              <div>전반 (원금소진 50% 이하)</div>
                              <div className="ms-1">매수</div>
                              <div className="ms-2">
                                - LOC평단매수: 평단 * 0.5회액수
                              </div>
                              <div className="ms-2">
                                - LOC큰수매수: 평단 +5% * 0.5회액수
                              </div>
                              <div className="ms-1">매도: 평단 +10%</div>
                              <hr className="my-1" />
                              <div>후반 (원금소진 50% 이상)</div>
                              <div className="ms-1">매수</div>
                              <div className="ms-2">
                                - LOC평단매수: 평단 * 1회액수
                              </div>
                              <div className="ms-1">매도</div>
                              <div className="ms-2">- 평단 +5%</div>
                              <div className="ms-2">- 평단 +10%</div>
                            </>
                          )}
                          {newBot.type === "IBv2.1" && (
                            <>
                              <div>전반 (원금소진 50% 이하)</div>
                              <div className="ms-1">매수</div>
                              <div className="ms-2">
                                - LOC평단매수: 평단 * 0.5회액수
                              </div>
                              <div className="ms-2">
                                - LOC큰수매수: 평단 +5% * 0.5회액수
                              </div>
                              <div className="ms-1">매도</div>
                              <div className="ms-2">
                                - 평단 +5% LOC매도 (전체물량 25%)
                              </div>
                              <div className="ms-2">
                                - 평단 +10% 지정가매도 (전체물량 75%)
                              </div>
                              <hr className="my-1" />
                              <div>후반 (원금소진 50% 이상)</div>
                              <div className="ms-1">매수</div>
                              <div className="ms-2">
                                - LOC평단매수: 평단 * 1회액수
                              </div>
                              <div className="ms-1">매도</div>
                              <div className="ms-2">
                                - 평단 +0% LOC매도 (전체물량 25%)
                              </div>
                              <div className="ms-2">
                                - 평단 +5% 지정가매도 (전체물량 25%)
                              </div>
                              <div className="ms-2">
                                - 평단 +1% 지정가매도 (전체물량 50%)
                              </div>
                            </>
                          )}
                        </div>
                      </Tooltip>
                    </>
                  )}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Label>
                  투자금($) <small>(1000~)</small>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="1000"
                  value={newBot.seed}
                  onChange={e => onChange("seed", Number(e.target.value))}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Label>수수료(%)</Form.Label>
                <Form.Control
                  type="number"
                  value={newBot.fee}
                  onChange={e => onChange("fee", Number(e.target.value))}
                  required
                />
                <Form.Text>매도 시, 수수료*2 를 더해 매도합니다.</Form.Text>
              </Form.Group>
            </Col>
            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Label>
                  수익 재투자(%) <small>(0~100)</small>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  value={newBot.reinvestment}
                  onChange={e =>
                    onChange("reinvestment", Number(e.target.value))
                  }
                  required
                />
                <Form.Text>
                  매도 시, 수익에서 지정한 비율만큼 시드에 추가합니다.
                </Form.Text>
              </Form.Group>
            </Col>

            {/* 무한매수 관련 설정 */}
            {newBot.type.startsWith("IB") && (
              <>
                <Col xs="12" sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      분할 일수 <small>(1~100)</small>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="100"
                      value={newBot.days}
                      onChange={e => onChange("days", Number(e.target.value))}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>손절</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={newBot.stopLoss}
                      onChange={e => onChange("stopLoss", e.target.value)}
                      required
                    >
                      {stopLosses.map(arr => (
                        <option key={arr[1]} value={arr[1]}>
                          {arr[0]}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs="12" sm="6">
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="싸이클 종료 후 계속 진행"
                      checked={newBot.startNextCycle}
                      onChange={e =>
                        onChange("startNextCycle", e.target.checked)
                      }
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            <Col xs="12" sm="6">
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="봇 생성 후 바로 실행"
                  checked={newBot.start}
                  onChange={e => onChange("start", e.target.checked)}
                />
              </Form.Group>
            </Col>
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
