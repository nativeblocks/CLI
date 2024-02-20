export type IntegrationModel = {
  id: string;
  name: string;
  description: string;
  keyType: string;
  platformSupport: string;
  kind: string;
  imageIcon: string;
  price: number;
  version: number;
  documentation: string;
  public: boolean;
  manageable: boolean;
  properties?: IntegrationPropertyModel[];
  events?: IntegrationEventModel[];
  data?: IntegrationDataModel[];
};

export type IntegrationProjectModel = {
  id: string;
  projectId: string;
  integrationName: string;
  integrationKeyType: string;
  integrationId: string;
  integrationVersion: number;
  integrationImage: string;
  hasUpdate: boolean;
};

export type IntegrationDataModel = {
  id: string;
  key: string;
  value: string;
  type: string;
};
export type IntegrationPropertyModel = {
  id: string;
  key: string;
  value: string;
  type: string;
  description: string;
  valuePicker: string;
  valuePickerCategory: string;
  valuePickerGroup: string;
  integrationId: string;
  valuePickerOption: string;
};

export type IntegrationEventModel = {
  id: string;
  event: string;
};
