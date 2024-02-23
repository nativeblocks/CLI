import {Command} from "commander";
import {region, getRegion, setRegion} from "./feature/region/region";
import {auth} from "./feature/login/auth";
import {organization} from "./feature/organization/organization";
import {addIntegration, integration, integrations, syncIntegration} from "./feature/integration/integration";
import {integrationEvent, syncIntegrationEvent} from "./feature/integration/integrationEvent";
import {integrationProperty, syncIntegrationProperty} from "./feature/integration/integrationProperty";
import {integrationData, syncIntegrationData} from "./feature/integration/integrationData";

const program = new Command();

program
  .name("nativeblocks")
  .description("Nativeblocks CLI for integration management")
  .version("1.0.0")

const regionCommand = region(program)
setRegion(regionCommand)
getRegion(regionCommand)


auth(program)
organization(program)
const integrationCommand = integration(program)
integrations(integrationCommand)
addIntegration(integrationCommand)
syncIntegration(integrationCommand)

const eventCommand = integrationEvent(integrationCommand)
syncIntegrationEvent(eventCommand)

const propertyCommand = integrationProperty(integrationCommand)
syncIntegrationProperty(propertyCommand)

const dataCommand = integrationData(integrationCommand)
syncIntegrationData(dataCommand)

program.parse();