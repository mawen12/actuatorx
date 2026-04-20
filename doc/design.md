# Design

## Backend design

The backend uses `gin` as the HTTP server. Most of the core code is located in the `internal` package, and the main endpoint implementation is in `internal/api/api.go`.

`api.go` receives requests from the frontend and then calls `client.go` to retrieve the required information.

## Frontend design

The frontend is built with `vue` and `vuetify`, and its code is located in the `ui` package.

### Table

The main table view is composed of the following components:
- `TableContext.vue`, defined in `ui/src/components/table`
- `TableCustom.vue`, defined in `ui/src/components/table`
- `XxxTableEntity`, defined in `ui/src/entities`

#### TableEntity

This entity defines the column count, column types, displayed values, and available actions.

| `Field` | `Desc` |
| --- | --- |
| `id` | identifies the entity |
| `itemValue` | passed to `vuetify#table#item-value` and should be unique |
| `showToolbar` | whether to show the search toolbar |
| `headers` | defines the column metadata |
| `headers.[].key` | defines which field from the row is used as the value when no custom value is set; when it equals `data-table-expand`, Vuetify renders it as an expand icon |
| `headers.[].value` | defines how to retrieve the value from the row and overrides `headers.[].key` |
| `headers.[].sortable` | controls row sorting |
| `headers.[].align` | controls the alignment of the column value |
| `headers.[].width` | controls the width of the column |
| `rowAction` | when `headers.[].key` is set to `data-table-expand`, clicking the row shows the configured component |
| `rowAction.type` | the type of row action |
| `rowAction.component` | the component to display when a row is clicked |
| `massActions` | actions for multiple selected rows |
| `globalActions` | global actions in the toolbar |
| `getAnchor` | used to get the target item; currently only used by `beans`, where clicking a dependency jumps to the related bean |
| `filterData` | used by the search toolbar to filter data |

#### TableContext

`TableEntity` is passed to `TableContext`, which parses the entity and provides the actions and data needed to render the table.

#### TableCustom

`TableCustom` is responsible for displaying the data.

### API

actuatorx uses `axios` and `tanstack/vue-query` to fetch information. These are defined in `ui/src/apis`. 

