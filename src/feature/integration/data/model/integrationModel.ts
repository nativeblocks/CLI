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
  slots?: IntegrationSlotModel[];
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
  valuePickerGroup: string;
  valuePickerOptions: string;
};

export type IntegrationEventModel = {
  event: string;
};

export type IntegrationSlotModel = {
  slot: string;
};
