import 'umi/typings';

declare global {
  interface Window {}
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}
