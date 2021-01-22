declare namespace BoardInformationModuleCssNamespace {
  export interface IBoardInformationModuleCss {
    container: string;
  }
}

declare const BoardInformationModuleCssModule: BoardInformationModuleCssNamespace.IBoardInformationModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BoardInformationModuleCssNamespace.IBoardInformationModuleCss;
};

export = BoardInformationModuleCssModule;
