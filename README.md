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

#### Set organization id

- -u, --url, Set organization id

```bash
nativeblocks organization set "1111-1111-1111-1111"
```

#### Get organization id

```bash
nativeblocks region get
```

#### Organization list

```bash
nativeblocks organization list
```

### Integration

#### Integration list

- -p, --platform, Platform of integration, ANDROID, IOS, REACT
- -k, --kind, Kind of integration, BLOCK, ACTION, LOGGER or ALL

```bash
nativeblocks integration list -p "REACT" -k "ALL"
```

#### Integration add

```bash
nativeblocks integration add
```

#### Integration detail

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration -id "2222-2222-2222-2222"
```

#### Integration sync (update)

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration sync -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration properties

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration properties -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration properties sync (update)

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration properties sync -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration events

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration events -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration events sync (update)

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration events sync -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration data

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration data -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration data sync (update)

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration data sync -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration slots

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration slots -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```

#### Integration slots sync (update)

- -id, --integrationId, Integration id
- -d, --directory, Integration working directory

```bash
nativeblocks integration slots sync -id "2222-2222-2222-2222" -d "/Users/sample/projects/awesome_project/integrations/button"
```