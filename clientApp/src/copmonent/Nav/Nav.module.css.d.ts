declare namespace NavModuleCssNamespace {
  export interface INavModuleCss {
    logo: string;
    logo1: string;
    logo2: string;
    logoAnimation1: string;
    logoAnimation2: string;
    navBar: string;
    navImg: string;
    springIn: string;
  }
}

declare const NavModuleCssModule: NavModuleCssNamespace.INavModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NavModuleCssNamespace.INavModuleCss;
};

export = NavModuleCssModule;
