declare namespace MainModuleCssNamespace {
  export interface IMainModuleCss {
    title: string;
  }
}

declare const MainModuleCssModule: MainModuleCssNamespace.IMainModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainModuleCssNamespace.IMainModuleCss;
};

export = MainModuleCssModule;
