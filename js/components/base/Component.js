export class Component {
  _container
  constructor(container) {
    this._container = container
  }

  toggleClass(element, className, force) {
    element.classList.toggle(className, force);
  }

  setDisabled(element, state) {
    if (!element) return;
    element.disabled = state;
}

  setHidden(element, state) {
    if (!element) return;
    element.hidden = state;
}

  setText(element, value) {
    element.textContent = value
  }

  render(data) {
    Object.assign(this, data ?? {})
    return this._container
  }
}