import { InlineToolbar } from '../../../../types/api/inline-toolbar';
import Module from '../../__module';

/**
 * @class InlineToolbarAPI
 * Provides methods for working with the Inline Toolbar
 */
export default class InlineToolbarAPI extends Module {
  /**
   * Available methods
   *
   * @returns {InlineToolbar}
   */
  public get methods(): InlineToolbar {
    return {
      close: (): void => this.close(),
      open: (): void => this.open(),
      init: (): void => this.init(),
    };
  }

  /**
   * Open Inline Toolbar
   */
  public open(): void {
    console.log('inlineToolbar.ts open() ');
    this.Editor.InlineToolbar.tryToShow();
  }

  public init(): void {
    console.log('inlineToolbar.ts init()');
    this.Editor.InlineToolbar.move();
    this.Editor.InlineToolbar.open();
  }
  /**
   * Close Inline Toolbar
   */
  public close(): void {
    this.Editor.InlineToolbar.close();
  }
}
