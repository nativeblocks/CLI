import {ResultModel} from "../../../../infrastructure/result/model/ResultModel";
import {IntegrationDataModel, IntegrationEventModel, IntegrationPropertyModel} from "../model/integrationModel";

export interface IntegrationMetaRepository {

  integrationProperties(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationPropertyModel[]>>

  syncIntegrationProperties(organizationId: string, integrationId: string, payload: any): Promise<ResultModel<IntegrationPropertyModel[]>>

  integrationEvents(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationEventModel[]>>

  syncIntegrationEvents(organizationId: string, integrationId: string, payload: any): Promise<ResultModel<IntegrationEventModel[]>>

  integrationData(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationDataModel[]>>

  syncIntegrationData(organizationId: string, integrationId: string, payload: any): Promise<ResultModel<IntegrationDataModel[]>>
}