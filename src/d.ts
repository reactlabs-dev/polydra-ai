/* eslint-disable @typescript-eslint/no-explicit-any */
// declare module '*.scss' {
//     const content: { [className: string]: string };
//     export default content;
// }

declare module '*.css' {
    const content: any;
    export default content;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}