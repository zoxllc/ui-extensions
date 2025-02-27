import {BasicComponents, SmartGridComponents} from 'component-sets';
import {SmartGridApi, NavigationApi, StandardApi} from '../extension-api';
import {RenderExtension} from './render-extension';

export interface ExtensionPoints {
  'pos.home.tile.render': RenderExtension<
    StandardApi<'pos.home.tile.render'> & SmartGridApi,
    SmartGridComponents
  >;
  'pos.home.modal.render': RenderExtension<
    StandardApi<'pos.home.modal.render'> & NavigationApi,
    BasicComponents
  >;
}

export type ExtensionPoint = keyof ExtensionPoints;
