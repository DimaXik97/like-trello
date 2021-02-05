declare namespace ModalModuleCssNamespace {
  export interface IModalModuleCss {
    cansel: string;
    content: string;
    delete: string;
    disableBtn: string;
    footer: string;
    footerBtn: string;
    header: string;
    inputRow: string;
    inputText: string;
    label: string;
    main: string;
    modal: string;
    removeIcon: string;
    round: string;
    save: string;
    slider: string;
    switch: string;
  }
}

declare const ModalModuleCssModule: ModalModuleCssNamespace.IModalModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModalModuleCssNamespace.IModalModuleCss;
};

export = ModalModuleCssModule;
