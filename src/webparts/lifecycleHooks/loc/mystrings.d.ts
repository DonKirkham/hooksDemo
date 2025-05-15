declare interface ILifecycleHooksWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SharePointEnvironment: string;
  TeamsTabEnvironment: string;
  OfficeEnvironment: string;
  OutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'LifecycleHooksWebPartStrings' {
  const strings: ILifecycleHooksWebPartStrings;
  export = strings;
}
