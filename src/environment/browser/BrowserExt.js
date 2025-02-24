

import { Extension, ExtensionType } from '@roler/extensions'

export const BrowserExt = {
    extension: {
        type: ExtensionType.Environment,
        name: 'browser',
        priority: -1,
    },
    test: () => true,
    init: async () => {
        await import('./BrowserAll');
    }
}

Extension.add(BrowserExt);