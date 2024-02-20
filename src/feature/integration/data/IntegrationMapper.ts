import {
  IntegrationDataModel,
  IntegrationEventModel,
  IntegrationModel,
  IntegrationPropertyModel
} from "./integrationModel";

export function integrationToModel(item: any): IntegrationModel {
  return {
    id: item.id ?? "",
    name: item.name,
    description: item.description ?? "",
    documentation: item.documentation ?? "",
    imageIcon: item.imageIcon ?? "",
    keyType: item.keyType ?? "",
    kind: item.kind ?? "",
    manageable: item.manageable ?? false,
    platformSupport: item.platformSupport ?? "",
    price: item.price ?? "",
    public: item.public ?? "",
    version: item.version ?? -1,
    properties:
      item.properties?.map((property: any) => {
        return integrationPropertyToModel(property);
      }) ?? [],
    events:
      item.events?.map((event: any) => {
        return integrationEventToModel(event);
      }) ?? [],
    data: item.data?.map((event: any) => {
      return integrationDataToModel(event);
    }) ?? [],
  } as IntegrationModel;
}

function integrationDataToModel(item: any): IntegrationDataModel {
  return {
    id: item.id ?? "",
    key: item.key ?? "",
    value: item.value ?? "",
    type: item.type ?? "",
  } as IntegrationDataModel;
}

function integrationPropertyToModel(item: any): IntegrationPropertyModel {
  return {
    id: item.id ?? "",
    key: item.key ?? "",
    value: item.value ?? "",
    type: item.type ?? "",
    description: item.description ?? "",
    valuePicker: item.valuePicker ?? "",
    valuePickerCategory: item.valuePickerCategory ?? "",
    valuePickerGroup: item.valuePickerGroup ?? "",
    integrationId: item.integrationId ?? "",
    valuePickerOption: item.valuePickerOption ?? "",
  } as IntegrationPropertyModel;
}

function integrationEventToModel(item: any): IntegrationEventModel {
  return {
    id: item.id,
    event: item.event,
  } as IntegrationEventModel;
}
