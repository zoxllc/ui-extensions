import {createRemoteComponent} from '@remote-ui/core';

import type {Spacing} from '../types';

export interface BlockStackProps {
  /**
   * Specifies the inline alignment. This affects the horizontal flow of elements.
   * @defaultValue `leading`
   */
  inlineAlignment?: 'leading' | 'center' | 'trailing';

  /**
   * Adjusts spacing between children.
   * @defaultValue 'base'
   **/
  spacing?: Spacing;
}

/**
 * Use to achieve no-fuss vertical centering.
 *
 * A stack is made of flexible items that wrap each of the stack’s children. Options provide control of the alignment and spacing of the items in the stack.
 * Use `StackItem` to group multiple elements inside a `BlockStack` together.
 */
export const BlockStack = createRemoteComponent<'BlockStack', BlockStackProps>(
  'BlockStack',
);
