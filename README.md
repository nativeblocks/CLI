# Nativeblocks CLI

Always you can find all command by help command

```bash
nativeblocks help
```

Also, as following you can see the usage

> **NOTE:** wherever you run the CLI, it creates a `.nativeblocks` directory in there, to save, update and read the
> integration information
>
> It is recommended to run the CLI in the coding directory

## Features

- Region
- Auth
- Integration

### Region

#### Set a region

- -s, --set, Set api region url
- -g, --get, Get api region url

```bash
nativeblocks region --set "https://api.example.com"
nativeblocks region -s "https://api.example.com"
```

#### Get the region

```bash
nativeblocks region --get
nativeblocks region -g
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
nativeblocks organizations
```

### Integration

#### Integration list

- -orgId, --organizationId, Organization id
- -p, --platform, Platform of integration, ANDROID, IOS, REACT
- -k, --kind, Kind of integration, BLOCK, MAGIC, LOGGER or ALL
- -public, --public, Public or private integration

```bash
nativeblocks integration list -orgId "1111-1111-1111-1111" -p "REACT" -k "ALL"  --public false
```

#### Integration detail

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration properties

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration properties -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration properties sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration properties sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration events

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration events -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration events sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration events sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration data

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration data -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```

#### Integration data sync (update)

- -orgId, --organizationId, Organization id
- -id, --integrationId, Integration id

```bash
nativeblocks integration data sync -orgId "1111-1111-1111-1111" -id "2222-2222-2222-2222"
```