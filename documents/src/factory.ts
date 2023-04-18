import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';

import { Contents } from '@jupyterlab/services';

import { ExampleDocWidget, ExamplePanel } from './widget';

import { ExampleDoc, ExampleDocModel } from './model';

/**
 * A widget factory to create new instances of ExampleDocWidget.
 */
export class ExampleWidgetFactory extends ABCWidgetFactory<
  ExampleDocWidget,
  ExampleDocModel
> {
  /**
   * Constructor of ExampleWidgetFactory.
   *
   * @param options Constructor options
   */
  constructor(options: DocumentRegistry.IWidgetFactoryOptions) {
    super(options);
  }

  /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
  protected createNewWidget(
    context: DocumentRegistry.IContext<ExampleDocModel>
  ): ExampleDocWidget {
    return new ExampleDocWidget({
      context,
      content: new ExamplePanel(context),
    });
  }
}

/**
 * A Model factory to create new instances of ExampleDocModel.
 */
export class ExampleDocModelFactory
  implements DocumentRegistry.IModelFactory<ExampleDocModel>
{
  /**
   * The name of the model.
   *
   * @returns The name
   */
  get name(): string {
    return 'example-model';
  }

  /**
   * The content type of the file.
   *
   * @returns The content type
   */
  get contentType(): Contents.ContentType {
    return 'file';
  }

  /**
   * The format of the file.
   *
   * @returns the file format
   */
  get fileFormat(): Contents.FileFormat {
    return 'text';
  }

  readonly collaborative: boolean = true;

  /**
   * Get whether the model factory has been disposed.
   *
   * @returns disposed status
   */
  get isDisposed(): boolean {
    return this._disposed;
  }

  /**
   * Dispose the model factory.
   */
  dispose(): void {
    this._disposed = true;
  }

  /**
   * Get the preferred language given the path on the file.
   *
   * @param path path of the file represented by this document model
   * @returns The preferred language
   */
  preferredLanguage(path: string): string {
    return '';
  }

  /**
   * Create a new instance of ExampleDocModel.
   *
   * @param languagePreference Language
   * @param modelDB Model database
   * @returns The model
   */
  createNew(
    options: DocumentRegistry.IModelOptions<ExampleDoc>
  ): ExampleDocModel {
    return new ExampleDocModel(
      options.languagePreference,
      options.sharedModel,
      options.collaborationEnabled
    );
  }

  private _disposed = false;
}
