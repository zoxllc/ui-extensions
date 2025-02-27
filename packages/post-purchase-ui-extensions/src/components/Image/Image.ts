import {createRemoteComponent} from '@remote-ui/core';

export interface ImageProps {
  /**
   * The default image path. This is used for single images, as a fallback if
   * no sources match, or if a browser does not support picture element sources.
   */
  source: string;
  /**
   * An array of image sources to offer alternative versions of an image for
   * different device widths and pixel densities
   */
  sources?: Source[];
  /**
   * An alternative text description that describe the image for the reader to
   * understand what it is about. It is extremely useful for both buyers using
   * assistive technology and sighted buyers. A well written `description`
   * provides people with visual impairments the ability to participate in
   * consuming non-text content. When a screen readers encounters an `Image`,
   * the description is read and announced aloud. If an image fails to load,
   * potentially due to a poor connection, the `description` is displayed on
   * screen instead. This has the benefit of letting a sighted buyer know an
   * image was meant to load here, but as an alternative, they’re still able to
   * consume the text content. Read
   * [considerations when writing alt text](https://ux.shopify.com/considerations-when-writing-alt-text-a9c1985a8204)
   * to learn more.
   *
   * @defaultValue ''
   */
  description?: string;
  /**
   * Indicates how the browser should load the image, either lazy or eager.
   * Uses native browser behavior and is not supported by all browsers.
   * If no value is provided the image is loaded immediately, regardless of
   * whether or not the image is currently within the visible viewport.
   */
  loading?: Loading;
  /** Adds a border to the image */
  bordered?: boolean;
  /**
   * Displays the image at the specified aspect ratio (fills the width of the
   * parent container and sets the height accordingly) and creates an invisible
   * placeholder to prevent content jumping when the image loads. Use along
   * with `fit` if the specified aspect ratio does not match the intrinsic
   * aspect ratio to prevent the image from stretching.
   */
  aspectRatio?: number;
  /**
   * Indicates how the image fits in its frame. Use if the image is not
   * displayed at its intrinsic size to maintain the aspect ratio.
   */
  fit?: Fit;
  /**
   * Indicates the image is decorative and should be hidden from assistive
   * technologies
   */
  decorative?: boolean;
}

interface Source {
  /** The path to the image */
  source: string;
  /**
   * Specify if the image should be loaded for small, medium, or large
   * viewport sizes
   */
  viewportSize?: ViewportSize;
  /**
   * Specify that the image should be used for devices with a matching pixel
   * density
   */
  resolution?: Resolution;
}

type ViewportSize = 'small' | 'medium' | 'large';
type Fit = 'cover' | 'contain';
type Resolution = 1 | 1.3 | 1.5 | 2 | 2.6 | 3 | 3.5 | 4;
type Loading = 'eager' | 'lazy';

/**
 * Image is used for large format, responsive images. For small images use Thumbnail.
 */
export const Image = createRemoteComponent<'Image', ImageProps>('Image');
