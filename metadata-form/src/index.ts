import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { IFormWidgetRegistry } from '@jupyterlab/ui-components';

import { CustomCheckbox } from './customWidgets';

/**
 * Initialization data for the metadata_form extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'metadata_form:plugin',
  autoStart: true,
  requires: [],
  optional: [IFormWidgetRegistry],
  activate: (
    app: JupyterFrontEnd,
    formRegistry: IFormWidgetRegistry | null
  ) => {
    // Register the custom widget
    if (formRegistry) {
      formRegistry.addFormWidget('custom-checkbox', {
        renderer: (props: any) => {
          return CustomCheckbox(props);
        },
      });
    }
    console.log('Metadata form example activated');
  },
};

export default plugin;
