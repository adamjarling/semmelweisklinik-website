/// <reference types="astro/client" />
/// <reference types="astro/jsx-runtime" />

declare global {
  namespace JSX {
    // Fallback for any intrinsic element names we haven't typed yet
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module "astro/jsx-runtime" {
  export const Fragment: any;
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

export {};
