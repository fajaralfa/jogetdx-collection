import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import globalStyles from '../index.css?inline'

@customElement('jc-popup')
export class JcPopup extends LitElement {
  static styles = [unsafeCSS(globalStyles)]

  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  @property()
  href = null

  @state()
  private _open: boolean = false

  render() {
    const popup = html`<h1>Elemen Popup</h1>`

    return html`
      <button @click=${this._onClick} part="button">
        <slot></slot>
      </button>
      ${this._open ?
        popup : html``
      }
    `
  }

  private _onClick() {
    this._open = !this._open
    console.log(this._open)
  }
}