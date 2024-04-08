export type IntegrationModel = {
  id: string;
  name: string;
  description: string;
  keyType: string;
  platformSupport: string;
  kind: string;
  imageIcon: string;
  price: number;
  documentation: string;
  public: boolean;
  manageable: boolean;
  properties?: IntegrationPropertyModel[];
  events?: IntegrationEventModel[];
  data?: IntegrationDataModel[];
};

export type IntegrationDataModel = {
  key: string;
  type: string;
};
export type IntegrationPropertyModel = {
  key: string;
  value: string;
  type: string;
  description: string;
  valuePicker: string;
  valuePickerCategory: string;
  valuePickerGroup: string;
  valuePickerOption: string;
};

export type IntegrationEventModel = {
  event: string;
};
