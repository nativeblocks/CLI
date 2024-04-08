import { Command } from "commander";
import { addIntegration, integration, integrations, syncIntegration } from "./feature/integration/integration";
import { integrationData, syncIntegrationData } from "./feature/integration/integrationData";
import { integrationEvent, syncIntegrationEvent } from "./feature/integration/integrationEvent";
import { integrationProperty, syncIntegrationProperty } from "./feature/integration/integrationProperty";
import { auth } from "./feature/login/auth";
import { organization } from "./feature/organization/organization";
import { getRegion, region, setRegion } from "./feature/region/region";

const program = new Command();

program
  .name("nativeblocks")
  .description("Nativeblocks CLI for integration management")
  .version(`${process.env.npm_package_version}`)

const regionCommand = region(program)
setRegion(regionCommand)
getRegion(regionCommand)

auth(program)
organization(program)

const integrationCommand = integration(program)
integrations(integrationCommand)
addIntegration(integrationCommand)
syncIntegration(integrationCommand)
// generateIntegration(integrationCommand)
const eventCommand = integrationEvent(integrationCommand)
syncIntegrationEvent(eventCommand)
const propertyCommand = integrationProperty(integrationCommand)
syncIntegrationProperty(propertyCommand)
const dataCommand = integrationData(integrationCommand)
syncIntegrationData(dataCommand)

program.parse();