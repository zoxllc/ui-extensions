import {URL} from 'url';
import {argumentParserFor, parseDevelopmentServerConfig} from './utilities';
import * as WebpackConfig from './webpack-config';

describe('argumentParserFor', () => {
  it('creates a function', () => {
    expect(argumentParserFor([])).toBeInstanceOf(Function);
  });

  it('creates a function for accessing individual arguments', () => {
    const fetch = argumentParserFor(['--store=shop1.myshopify.io']);
    expect(fetch('store')).toBe('shop1.myshopify.io');
  });
});

describe('parseDevelopmentServerConfig', () => {
  const args = [
    '--store=shop1.myshopify.io',
    '--resourceUrl=/cart/1:1',
    '--publicUrl=https://example.com',
    '--port=5678',
  ];

  it('includes store', () => {
    expect(parseDevelopmentServerConfig(args)).toMatchObject({
      store: 'shop1.myshopify.io',
    });
  });

  it('includes resource URL', () => {
    expect(parseDevelopmentServerConfig(args)).toMatchObject({
      resourceUrl: '/cart/1:1',
    });
  });

  it('includes public URL', () => {
    expect(parseDevelopmentServerConfig(args)).toMatchObject({
      publicUrl: 'https://example.com',
    });
  });

  it('includes port', () => {
    expect(parseDevelopmentServerConfig(args)).toMatchObject({
      port: '5678',
    });
  });

  it('includes filename', () => {
    expect(parseDevelopmentServerConfig(args)).toMatchObject({
      filename: 'extension.js',
    });
  });

  it('includes extensionPoint', () => {
    expect(
      parseDevelopmentServerConfig([...args, '--extension-point=test']),
    ).toMatchObject({
      extensionPoint: 'test',
    });
  });

  describe('scriptUrl', () => {
    it('points to localhost:8910 when no public url and port is provided', () => {
      expect(parseDevelopmentServerConfig([])).toMatchObject({
        scriptUrl: 'http://localhost:8910/assets/extension.js',
      });
    });

    it('supports custom port', () => {
      expect(parseDevelopmentServerConfig(['--port=1234'])).toMatchObject({
        scriptUrl: 'http://localhost:1234/assets/extension.js',
      });
    });

    it('points to public URL if one was provided and ignores port', () => {
      expect(
        parseDevelopmentServerConfig([
          '--port=1234',
          '--publicUrl=https://example.com',
        ]),
      ).toMatchObject({
        scriptUrl: 'https://example.com/assets/extension.js',
      });
    });
  });

  describe('permalinkUrl', () => {
    it('returns undefined if resourceUrl, publicUrl or store are missing', () => {
      const argsWithoutShop = [
        '--resourceUrl=/cart/1:1',
        '--publicUrl=https://example.com',
      ];
      const argsWithoutResourceUrl = [
        '--publicUrl=https://example.com',
        '--store=shop1.myshopify.io',
      ];
      const argsWithoutPublicUrl = [
        '--store=shop1.myshopify.io',
        '--resourceUrl=/cart/1:1',
      ];
      const configWithoutPermalinkUrl = {permalinkUrl: undefined};

      expect(parseDevelopmentServerConfig(argsWithoutShop)).toMatchObject(
        configWithoutPermalinkUrl,
      );

      expect(
        parseDevelopmentServerConfig(argsWithoutResourceUrl),
      ).toMatchObject(configWithoutPermalinkUrl);

      expect(parseDevelopmentServerConfig(argsWithoutPublicUrl)).toMatchObject(
        configWithoutPermalinkUrl,
      );
    });

    it('returns a permalinkUrl if all necessary command line flags are present', () => {
      const permalink = new URL('https://shop1.myshopify.com/cart/1:1');
      permalink.searchParams.append('dev', 'https://example.com/query');
      const configWithPermalink = {permalinkUrl: permalink.toString()};

      expect(
        parseDevelopmentServerConfig([
          ...args,
          '--resourceUrl=/cart/1:1',
          '--publicUrl=https://example.com',
          '--store=shop1.myshopify.com',
        ]),
      ).toMatchObject(configWithPermalink);
    });
  });

  describe('passwordPageUrl', () => {
    it('returns undefined if store flag is missing', () => {
      const configWithoutPasswordPageUrl = {
        passwordPageUrl: undefined,
      };
      expect(parseDevelopmentServerConfig([])).toMatchObject(
        configWithoutPasswordPageUrl,
      );
    });

    it('returns https://<store>/password if store flag is present', () => {
      const configWithPasswordPageUrl = {
        passwordPageUrl: 'https://shop1.myshopify.io/password',
      };
      expect(
        parseDevelopmentServerConfig([...args, '--store=shop1.myshopify.io']),
      ).toMatchObject(configWithPasswordPageUrl);
    });
  });

  describe('webpackConfiguration', () => {
    it('runs in development mode', () => {
      const createWebpackConfigurationSpy = jest.spyOn(
        WebpackConfig,
        'createWebpackConfiguration',
      );

      parseDevelopmentServerConfig(args);

      expect(createWebpackConfigurationSpy).toHaveBeenCalledWith(
        expect.objectContaining({development: true}),
      );
    });

    it('outputs the asset to /assets/extension.js', () => {
      const createWebpackConfigurationSpy = jest.spyOn(
        WebpackConfig,
        'createWebpackConfiguration',
      );

      parseDevelopmentServerConfig(args);

      expect(createWebpackConfigurationSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          output: {
            filename: 'extension.js',
            publicPath: '/assets/',
          },
        }),
      );
    });

    it('websocket points to localhost:8910 by default', () => {
      const createWebpackConfigurationSpy = jest.spyOn(
        WebpackConfig,
        'createWebpackConfiguration',
      );

      parseDevelopmentServerConfig([]);

      expect(createWebpackConfigurationSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          hotOptions: {
            https: false,
            webSocket: {
              host: 'localhost',
              port: 8910,
              path: '/build',
            },
          },
        }),
      );
    });

    it('websocket points to the public endpoint if --publicUrl was provided', () => {
      const createWebpackConfigurationSpy = jest.spyOn(
        WebpackConfig,
        'createWebpackConfiguration',
      );

      parseDevelopmentServerConfig(['--publicUrl=https://example.com/']);

      expect(createWebpackConfigurationSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          hotOptions: {
            https: true,
            webSocket: {
              host: 'example.com',
              port: 443,
              path: '/build',
            },
          },
        }),
      );
    });
  });
});
