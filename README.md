
# Medium clone implemented with NestJS

Notes:
// to log in
psql -U postgres

display the users
\du;

list all databases
\l;

create a database
create database db_name;

create a user
create user user_name with encrypted password ‘123’;

connect to a database
\c database_name;

describe the table schema
\d table_name;

display all the tables
\dt

## fixes and configs

```ts
import {PostgresConnectionOptions} from ’typeorm/driver/postgres/PostgresConnectionOptions’;
const config: PostgresConnectionOptions = {}
```

```bash
> yarn add typeorm
> yarn add @nestjs/typeorm
> yarn add pg

[Nest] 40147 ERROR [ExceptionHandler] permission denied for schema public QueryFailedError: permission denied for schema public
```

Solution:

```sql
ALTER DATABASE my_database OWNER TO my_database_user;
```

create data source from config in src/ormdatasource.ts

```ts
import { DataSource } from ‘typeorm’;
import ormconfig from ‘@app/ormconfig’;
export default new DataSource(ormconfig);
```

package.json

```json
“type”: “ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/ormdatasource.ts”,
“db:drop”: “npm run typeorm schema:drop”, (“yarn typeorm schema:drop”)
“db:create”: “npm run typeorm migration:generate”,
```

src/ormconfig.ts

```ts
synchronize: false,
migrations: [__dirname + ‘/migrations/**/*{.ts,.js}’],
```

```bash
> npm run db:drop
> npm run db:create src/migrations/CreateTags
```

```ts
const userByEmail = await this.userRepository.findOne({ where: email: createUserDto.email }, });
```

https://github.com/gothinkster/realworld/tree/main/api
