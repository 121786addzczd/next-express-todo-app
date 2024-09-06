/**
 * swagger-ui-express.d.ts
 *
 * TypeScript型定義ファイル for `swagger-ui-express`
 *
 * `swagger-ui-express`には公式の型定義が提供されていないため、独自に型定義を作成。
 * このファイルは、以下のリソースを参考にして作成：
 *
 * - GitHubリポジトリ: https://github.com/scottie1984/swagger-ui-express
 * - `index.js`ファイルの`module.exports`定義: https://github.com/scottie1984/swagger-ui-express/blob/master/index.js
 *
 * これらの情報に基づき、`swagger-ui-express`の主要なエクスポート（`serve`, `setup`, `serveFiles`など）の型定義を行っている。
 *
 * 参考:
 * - TypeScriptの型定義ファイルについて: https://typescriptbook.jp/reference/declaration-file
 */

declare module "swagger-ui-express" {
  import { RequestHandler } from "express";

  /**
   * Swagger UIのカスタマイズオプションを定義するインターフェース。
   */
  interface SwaggerUiOptions {
    customCss?: string;
    customJs?: string;
    customfavIcon?: string;
    customSiteTitle?: string;
    swaggerOptions?: Record<string, any>;
    explorer?: boolean;
    swaggerUrl?: string;
    swaggerUrls?: Array<{ url: string; name: string }>;
  }

  /**
   * Swagger UIの静的ファイルを提供するミドルウェアを返す関数。
   *
   * @param swaggerDocument - Swaggerのドキュメントオブジェクト。
   * @param options         - Swagger UIのカスタマイズオプション。
   * @returns Expressのリクエストハンドラの配列。
   */
  export function serveFiles(
    swaggerDocument: object,
    options?: SwaggerUiOptions,
  ): RequestHandler;

  /**
   * Swagger UIの静的ファイルを提供するためのデフォルトのミドルウェア。
   */
  export const serve: RequestHandler;

  /**
   * Swagger UIを設定するためのミドルウェアを返す関数。
   *
   * @param swaggerDocument - Swaggerのドキュメントオブジェクト。
   * @param options         - Swagger UIのカスタマイズオプション。
   * @param customCss       - カスタムCSS文字列。
   * @param customfavIcon   - カスタムファビコンのパス。
   * @param customJs        - カスタムJavaScript文字列。
   * @param customSiteTitle - カスタムサイトタイトル。
   * @returns Expressのリクエストハンドラ。
   */
  export function setup(
    swaggerDocument: object,
    options?: SwaggerUiOptions,
    customCss?: string,
    customfavIcon?: string,
    customJs?: string,
    customSiteTitle?: string,
  ): RequestHandler;
}
