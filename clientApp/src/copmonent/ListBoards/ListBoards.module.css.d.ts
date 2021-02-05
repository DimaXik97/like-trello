declare namespace ListBoardsModuleCssNamespace {
  export interface IListBoardsModuleCss {
    active: string;
    item: string;
    line: string;
    link: string;
    list: string;
    newBtn: string;
    settingsIcon: string;
  }
}

declare const ListBoardsModuleCssModule: ListBoardsModuleCssNamespace.IListBoardsModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ListBoardsModuleCssNamespace.IListBoardsModuleCss;
};

export = ListBoardsModuleCssModule;
