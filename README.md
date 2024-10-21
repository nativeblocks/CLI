# Nativeblocks CLI

## Installation

```bash
npm install -g @nativeblocks/cli
```

Or

```bash
yarn global add @nativeblocks/cli
```

## Updating

```bash
npm update -g @nativeblocks/cli --latest
```

Or

```bash
yarn global upgrade @nativeblocks/cli --latest
```

You can always find all command by help command

```bash
nativeblocks help
```

## Features

- Region
- Auth
- Integration

### Region

#### Set a region

- -u, --url, Set api region url

```bash
nativeblocks region set "https://api.example.com"
```

#### Get the region

```bash
nativeblocks region get
```

### Auth

#### Auth with username and password

- -u, --username, username
- -p, --password, password

```bash
nativeblocks auth --username "foo@example.com" --password "foobar1234"
nativeblocks auth -u "foo@example.com" -p "foobar1234"
```

### Organization

#### Organization list

```bash
nativeblocks organization list
```

### Integration

#### Integration list

- -orgId, --organizationId, Organization id
- -p, --platform, Platform of integration, ANDROID, IOS, REACT
- -k, --kind, Kind of integration, BLOCK, ACTION, LOGGER or ALL

```bash
nativeblocks integration list -orgId "1111-1111-1111-1111" -p "REACT" -k "ALL"
```

#### Integration add

```bash
nativeblocks integration add
```

#### Integration detail

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration properties

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration properties -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration properties sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration properties sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration events

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration events -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration events sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration events sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration data

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration data -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration data sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration data sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration slots

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration slots -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration slots sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration slots sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```