import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { OverlayTrigger, Tooltip as BSTooltip } from "react-bootstrap";

interface Props {
  children?: React.ReactNode;
}

const Tooltip = (props: Props) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<BSTooltip id="tooltip">{props.children}</BSTooltip>}
    >
      <HelpOutlineIcon fontSize="small" />
    </OverlayTrigger>
  );
};

export { Tooltip };
