declare namespace ProfileModuleCssNamespace {
  export interface IProfileModuleCss {
    logoutBtn: string;
  }
}

declare const ProfileModuleCssModule: ProfileModuleCssNamespace.IProfileModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ProfileModuleCssNamespace.IProfileModuleCss;
};

export = ProfileModuleCssModule;
