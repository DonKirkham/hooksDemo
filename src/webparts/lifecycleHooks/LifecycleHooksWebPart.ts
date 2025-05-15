import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'LifecycleHooksWebPartStrings';
import LifecycleHooks from './components/LifecycleHooks';
import { ILifecycleHooksProps } from './components/LifecycleHooks';

export interface ILifecycleHooksWebPartProps {
  description: string;
}

export default class LifecycleHooksWebPart extends BaseClientSideWebPart<ILifecycleHooksWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ILifecycleHooksProps> = React.createElement(
      LifecycleHooks,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );
    ReactDom.render(element, this.domElement);
  }

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environment = '';
          switch (context.app.host.name) {
            case 'Office':
              environment = strings.OfficeEnvironment;
              break;
            case 'Outlook':
              environment = strings.OutlookEnvironment;
              break;
            case 'Teams':
              environment = strings.TeamsTabEnvironment;
              break;
            default:
              environment = strings.UnknownEnvironment;
          }
          return environment;
        });
    }
    return Promise.resolve(strings.SharePointEnvironment);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
