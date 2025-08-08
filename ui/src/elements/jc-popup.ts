import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import globalStyles from '../index.css?inline'

@customElement('jc-popup')
export class JcPopup extends LitElement {
  static styles = [unsafeCSS(globalStyles)]

  @property()
  href?: string

  // Optional confirmation hook: return false to block closing. Can be async.
  @property({ attribute: false })
  beforeClose?: (ctx: { reason: 'backdrop' | 'button' | 'programmatic' | 'escape' }) => boolean | Promise<boolean>;

  @state()
  private _open: boolean = false

  render() {
    const popup = html`
      <div class="fixed inset-0 z-50 flex items-center justify-center ${this._open ? '' : 'pointer-events-none'}">
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur transition-opacity duration-300 ${this._open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
          @click=${() => this._onClose('backdrop')}
        ></div>
        <div
          class="relative bg-white rounded-lg shadow-xl w-[80vw] max-w-xl mx-4 transition-all duration-300 transform ${this._open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}"
        >
          <button
            class="absolute -top-3 -right-3 bg-red-500 w-7 h-7 rounded-full flex items-center justify-center shadow hover:bg-red-600"
            @click=${() => this._onClose('button')}
            aria-label="Close"
            part="close-button"
          >
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-white" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          ${this.href
            ? html`<iframe src=${this.href} class="w-full h-[70vh] rounded-lg" frameborder="0" part="iframe"></iframe>`
            : html`<div class="p-6" part="content"><slot name="content"></slot></div>`}
        </div>
      </div>
    `

    return html`
      <button @click=${this._onClick} part="button">
        <slot></slot>
      </button>
      ${popup}
    `
  }

  private _onClick() {
    this._open = !this._open
  }

  connectedCallback(): void {
    super.connectedCallback()
    window.addEventListener('keydown', this._onKeydown)
  }

  disconnectedCallback(): void {
    window.removeEventListener('keydown', this._onKeydown)
    super.disconnectedCallback()
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (!this._open) return
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault()
      this._onClose('escape')
    }
  }

  private async _onClose(reason: 'backdrop' | 'button' | 'programmatic' | 'escape' = 'programmatic') {
    // Optional confirmation hook
    if (this.beforeClose) {
      try {
        const ok = await this.beforeClose({ reason });
        if (ok === false) return;
      } catch (err) {
        // If hook throws, default to not closing
        return;
      }
    }

    this._open = false
    this.dispatchEvent(new CustomEvent('jc:closed', { detail: { reason }, bubbles: true, composed: true }))
  }
}