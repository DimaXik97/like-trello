declare namespace HeaderModuleCssNamespace {
  export interface IHeaderModuleCss {
    header: string;
    login: string;
    title: string;
  }
}

declare const HeaderModuleCssModule: HeaderModuleCssNamespace.IHeaderModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderModuleCssNamespace.IHeaderModuleCss;
};

export = HeaderModuleCssModule;
