// Declaring the type of SVG. Typescript doesn't know this automatically!
declare module '*.svg' {
    const content: string;
    export default content;
}


  