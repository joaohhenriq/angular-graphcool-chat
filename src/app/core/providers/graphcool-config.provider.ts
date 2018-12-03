import { InjectionToken } from '@angular/core';

const graphcoolId = 'cjniussik5sar0177vc58th1h';

export interface GraphcoolConfig {
  simpleAPI: string;
  subscriptionsAPI: string;
  fileAPI: string;
  fileDownloadURL: string;
}

export const graphcoolConfig: GraphcoolConfig = {
  simpleAPI: `https://api.graph.cool/simple/v1/${graphcoolId}`,
  subscriptionsAPI: `wss://subscriptions.graph.cool/v1/${graphcoolId}`,
  fileAPI: `https://api.graph.cool/file/v1/${graphcoolId}`,
  fileDownloadURL: `https://files.graph.cool/${graphcoolId}`
};

export const GRAPHCOOL_CONFIG = new InjectionToken<GraphcoolConfig>(
  'graphcool.config',
  {
    providedIn: 'root',
    factory: () => {
      return graphcoolConfig;
    }
  }
);
