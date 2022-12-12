// svg.d.ts
declare module '*.svg' {
  export type SVGComponent = React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >

  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >
}
