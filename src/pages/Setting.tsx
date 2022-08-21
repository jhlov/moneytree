import EditIcon from "@mui/icons-material/Edit";
import Grid from "@toast-ui/react-grid";
import { cloneDeep, isEmpty, pick } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RemoveAccountRenderer } from "scripts/classes";
import { Account } from "scripts/interfaces";
import { TestKIResponse } from "scripts/responses";
import { getGridErrorStr } from "scripts/utils";
import { api } from "services/api";
import { RootState } from "store";
import { updateUserInfo } from "store/config";
import "tui-grid/dist/tui-grid.css";
import { OptColumn } from "tui-grid/types/options";
import { InvalidRow } from "tui-grid/types/store/data";
import "./Setting.scss";

const Setting = () => {
  const dispatch = useDispatch();

  const KIAccounts = useSelector((state: RootState) => state.config.KIAccounts);
  const KIAppKey = useSelector((state: RootState) => state.config.KIAppKey);
  const KIAppSecret = useSelector(
    (state: RootState) => state.config.KIAppSecret
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [curKIAccounts, setCurKIAccounts] = useState<Partial<Account>[]>([]);
  const [curKIAppKey, setCurKIAppKey] = useState<string>("");
  const [curKIAppSecret, setCurKIAppSecret] = useState<string>("");

  const gridRef = useRef<Grid>(null);

  const onClickRemoveAccount = (rowKey: number) => {
    const gridData: Account[] =
      (gridRef.current?.getInstance().getData() as unknown as Account[]) ?? [];
    setCurKIAccounts(
      gridData
        .map(data => pick(data, ["account", "name"]))
        .filter((_, i) => i !== rowKey)
    );
  };

  const columns: OptColumn[] = useMemo(() => {
    return [
      {
        name: "account",
        header: "계좌 번호 (숫자만입력)",
        editor: isEdit ? "text" : undefined,
        validation: {
          dataType: "number",
          required: true,
          min: 100,
          unique: true
        },
        formatter: props => {
          const valueStr = props.value?.toString() ?? "";
          if (8 < valueStr.length) {
            return `${valueStr.substring(0, 8)}-${valueStr.substring(8)}`;
          }

          return props.value?.toString() ?? "";
        }
      },
      {
        name: "name",
        header: "계좌 별명",
        editor: isEdit ? "text" : undefined
      },
      {
        name: "remove",
        header: "삭제",
        width: 40,
        align: "center",
        hidden: !isEdit,
        renderer: {
          type: RemoveAccountRenderer,
          options: {
            handleRemove: onClickRemoveAccount
          }
        }
      }
    ];
  }, [isEdit]);

  const data = useMemo(() => {
    return curKIAccounts.map((account, i) => ({
      id: i,
      ...account
    }));
  }, [curKIAccounts]);

  useEffect(() => {
    setCurKIAccounts(cloneDeep(KIAccounts));
  }, [KIAccounts]);

  useEffect(() => {
    setCurKIAppKey(KIAppKey);
  }, [KIAppKey]);

  useEffect(() => {
    setCurKIAppSecret(KIAppSecret);
  }, [KIAppSecret]);

  const onCancel = () => {
    setIsEdit(false);
    setCurKIAccounts(cloneDeep(KIAccounts));
    setCurKIAppKey(KIAppKey);
    setCurKIAppSecret(KIAppSecret);
  };

  const onApply = async () => {
    // 계좌번호 에러 체크
    const invalidRows: InvalidRow[] =
      gridRef.current?.getInstance().validate() ?? [];
    if (!isEmpty(invalidRows)) {
      const errStr: string[] = [];
      const columnName = {
        account: "계좌 번호는"
      };

      invalidRows.forEach(row => {
        row.errors.forEach(error => {
          error.errorInfo.forEach(errorInfo => {
            errStr.push(
              `row${(row.rowKey as number) + 1}: ${
                (columnName as any)[error.columnName]
              } ${getGridErrorStr(errorInfo)} `
            );
          });
        });
      });

      alert(errStr.join("\n"));
      return;
    }

    setIsEdit(false);
    const gridData: Account[] =
      (gridRef.current?.getInstance().getData() as unknown as Account[]) ?? [];
    dispatch(
      updateUserInfo({
        KIAccounts: gridData.map(data => pick(data, ["account", "name"])),
        KIAppKey: curKIAppKey,
        KIAppSecret: curKIAppSecret
      })
    );
  };

  const onClickAddAccount = () => {
    const newAccounts =
      (gridRef.current?.getInstance().getData() as unknown as Account[]) ?? [];
    setCurKIAccounts([...newAccounts, { account: "", name: "" }]);
  };

  const onClickTestKI = async () => {
    const r = await api.post<TestKIResponse>(
      "https://c4z8mtlrqa.execute-api.ap-northeast-2.amazonaws.com/default/mt-test-ki",
      {
        KIAppKey: curKIAppKey,
        KIAppSecret: curKIAppSecret
      }
    );

    if (r.status === 200) {
      alert("테스트 통신에 성공했습니다.");
    } else {
      alert(`error. ${r.data.error}`);
    }
  };

  return (
    <Row className="setting justify-content-center">
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
              <Form.Label>한국투자증권 계좌</Form.Label>
              {isEmpty(curKIAccounts) && (
                <p>
                  <small>등록된 계좌가 없습니다. 계좌를 등록해 주세요</small>
                </p>
              )}
              {!isEmpty(curKIAccounts) && (
                <Grid
                  ref={gridRef}
                  minBodyHeight={40}
                  columns={columns}
                  data={data}
                />
              )}
              {isEdit && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={onClickAddAccount}
                >
                  계좌 추가
                </Button>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <div>
                <Form.Label onClick={e => e.stopPropagation()}>
                  한국투자증권 App Key
                </Form.Label>
                <Button
                  variant="outline-secondary ms-2"
                  size="sm"
                  disabled={!curKIAppKey || !curKIAppSecret}
                  onClick={onClickTestKI}
                >
                  TEST
                </Button>
              </div>

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
