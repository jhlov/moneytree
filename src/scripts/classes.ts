export class RemoveAccountRenderer {
  el: HTMLButtonElement;

  constructor(props: any) {
    const el = document.createElement("button");
    const { handleRemove } = props.columnInfo.renderer.options;

    el.className = "btn btn-outline-secondary btn-sm";
    el.innerText = "삭제";

    const { grid, rowKey, columnInfo } = props;
    el.addEventListener("click", () => {
      handleRemove(rowKey);
    });

    this.el = el;
  }

  getElement() {
    return this.el;
  }
}
