import { useMemo } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { Bot } from "scripts/interfaces";
import "./BotCard.scss";

interface Props {
  bot: Bot;
}

export const BotCard = (props: Props) => {
  const typeName = useMemo(() => {
    if (props.bot.type === "0458") {
      return "떨사오팔";
    }
  }, [props.bot.type]);

  const renderStatus = () => {
    if (props.bot.status === "RUNNING") {
      return (
        <Badge pill bg="primary">
          진행중
        </Badge>
      );
    } else if (props.bot.status === "PAUSE") {
      return (
        <Badge pill bg="warning" text="dark">
          중지
        </Badge>
      );
    }
  };

  return (
    <div className="bot-card">
      <div className="bot-card__header">
        <strong>{props.bot.name}</strong> <small>({typeName})</small>{" "}
        {renderStatus()}
      </div>
      <div className="bot-card__body">
        <Row>
          <Col xs={4}>
            <label>생성일</label>
            <div>{props.bot.createdDate}</div>
          </Col>
          <Col xs={4}>
            <label>종목</label>
            <div>{props.bot.stock}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
