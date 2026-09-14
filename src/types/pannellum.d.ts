export {};

interface PannellumConfig {
  type: 'equirectangular';
  panorama: string;
  hfov?: number;
  autoLoad?: boolean;
  showFullscreenCtrl?: boolean;
  showZoomCtrl?: boolean;
  mouseZoom?: boolean;
}

interface PannellumApi {
  viewer: (container: HTMLElement | string, config: PannellumConfig) => unknown;
}

declare global {
  interface Window {
    pannellum?: PannellumApi;
  }
}
