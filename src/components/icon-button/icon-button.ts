import { LitElement, html, property, query, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { tag } from '../../internal/decorators';
import { ifDefined } from 'lit-html/directives/if-defined';
import styles from 'sass:./icon-button.scss';
import { focusVisible } from '../../internal/focus-visible';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @part base - The component's base wrapper.
 */
@tag('sl-icon-button')
export default class SlIconButton extends LitElement {
  static styles = unsafeCSS(styles);

  @query('button') button: HTMLButtonElement;

  /** The name of the icon to draw. */
  @property() name: string;

  /** The name of a registered custom icon library. */
  @property() library: string;

  /** An external URL of an SVG file. */
  @property() src: string;

  /**
   * A description that gets read by screen readers and other assistive devices. For optimal accessibility, you should
   * always include a label that describes what the icon button does.
   */
  @property() label: string;

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    focusVisible.observe(this.button);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    focusVisible.unobserve(this.button);
  }

  render() {
    return html`
      <button
        part="base"
        class=${classMap({
          'icon-button': true,
          'icon-button--disabled': this.disabled
        })}
        ?disabled=${this.disabled}
        type="button"
        aria-label=${this.label}
      >
        <sl-icon
          name=${ifDefined(this.name)}
          library=${ifDefined(this.library)}
          src=${ifDefined(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </button>
    `;
  }
}
