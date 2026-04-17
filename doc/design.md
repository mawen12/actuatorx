# Design

## Backend design

Backend use `gin` as http server, the main code is in `internal` package, the core endpoint is `internal/api/api.go`.

`api.go` receive the request from frontend, then call the `client.go` for retrieve information. 

## Frontend design

Frontend use `vue` + `vuetify` to build, the code is in `ui` package。

### Table

The main view component is `table`, it is defined with these component:
- `TableContext.vue` define in `ui/src/components/table` 
- `TableCustom.vue` define in `ui/src/components/table`
- `XxxTableEntity` define in `ui/src/entities`

#### TableEntity

The entity define the column count, column type, column value, column action。

| `Field` | `Desc` |
| --- | --- |
| `id` | identify the entity |
| `itemValue` | provide to `vuetify#table#item-value`, should be unique | 
| `showToolbar` | whethever show the search toolbar |
| `headers` | define the columns information |
| `headers.[].key` | define fetch the field from row as value if value is not set, when it = `data-table-expand`, vuetify render it as expand icon |
| `headers.[].value` | define how to fetch the value from row, it will override the `headers.[].key` |
| `headers.[].sortable` | row sort |
| `headers.[].align` | column value align |
| `headers.[].width` | column value width |
| `rowAction` | when set the `headers.[].key` = `data-table-expand`，then click the row to show the component |
| `rowAction.type` | the row action type |
| `rowAction.component` | when click the row then show this component |
| `massActions` | multi row selected actions |
| `globalActions` | global actions in the tool bar |
| `getAnchor` | use to get the item, only use by `beans`, when click the dependency then jump to bean |
| `filterData` | when use search tool bar, then use this to filter data |

#### TableContext

The TableEntity will pass to the TableContext, it parse the entity, provide actions and data for table render.

#### TableCustom

The TableCustom is responsible for display the data.

### Api

actuatorx use `axios` + `tanstack/vue-query` for fetch the information。
it is defined in `ui/src/apis`。

