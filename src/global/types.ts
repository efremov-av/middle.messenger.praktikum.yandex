declare module '*.hbs' {
  function Template(object: object): string;
  export default Template;
}

type ComponentEvent = {
  [key: string]: EventListenerOrEventListenerObject;
};
