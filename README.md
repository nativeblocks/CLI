# Nativeblocks CLI

Always you can find all command by help command
```bash
nativeblocks help
```

Also, as following you can see the usage

## Features

- Region
- Auth
- Integration

### Region

Set a region

- -s, --set, Set api region url
- -g, --get, Get api region url

```bash
nativeblocks region --set "https://api.example.com"
nativeblocks region -s "https://api.example.com"
```

Get the region

```bash
nativeblocks region --get
nativeblocks region -g
```

### Auth

Auth with username and password

- -u, --username, username
- -p, --password, password
    
```bash
nativeblocks auth --username "foo@example.com" --password "foobar1234"
nativeblocks auth -u "foo@example.com" -p "foobar1234"
```

### Organization

Organization list

```bash
nativeblocks organizations
```

### Integration

Integration list

- -orgId, --organizationId, Organization id
- -p, --platform, Platform of integration, ANDROID, IOS, REACT
- -k, --kind, Kind of integration, BLOCK, MAGIC, LOGGER or ALL
- -public, --public, Public or private integration

```bash
nativeblocks integration list -orgId "1111-1111-1111-1111" -p "REACT" -k "ALL"  --public false
```