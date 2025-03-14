---
title: "Row Grouping - Custom Group Filtering"
enterprise: true
---

This section shows how to customise row group filtering - such as providing different filters on the group columns than
the underlying columns.

## Custom Group Column Filtering

To filter across all levels of the grouping in a single filter, you can use the [Set Filter Tree List](/filter-set-tree-list/).

Otherwise, in order to know what values to use in the group column filter, a `filterValueGetter` should be supplied to the `autoGroupColumnDef` as shown below:

<api-documentation source='column-properties/properties.json' section='filtering' names='["filterValueGetter"]'></api-documentation>

### Single Group Column

<snippet>
const gridOptions = {  
    columnDefs: [
        { field: 'sport', rowGroup: true, hide: true },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
    ], 
    autoGroupColumnDef: { 
        // enables filtering on the group column with specified filter type
        filter: 'agTextColumnFilter',
        // supplies 'sport' values to the filter 
        filterValueGetter: params => params.data.sport,                          
    }, 
    groupDisplayType: 'singleColumn',
}
</snippet>

In the snippet above the rows are grouped by `sport` and `country`, however there is only a single group column. This is why a `filterValueGetter` is required to supply the filter values. In this case, reading the `sport` property from the row.

Note that [Adding Values to Leaf Nodes](/grouping-single-group-column/#adding-values-to-leaf-nodes) using a `valueGetter` or a `field` will also allow filtering once the `filter` column property is enabled. However, filtering will be performed using the leaf values in this case.

When applying a filter directly on the group column instead of using the Group Column Filter, the filter model is tied to the group column instead of the underlying columns. To set the filter via the Grid API on a single group column (`setFilterModel`), it needs to be referenced using the name `ag-Grid-AutoColumn`.

<snippet>
| gridOptions.api.setFilterModel({
|     'ag-Grid-AutoColumn': {
|         filterType: 'text',
|         type: 'contains',
|         filter: 'Skiing'
|     },
| });
</snippet>

The following example demonstrates filtering with a single group column. Note the following:

- Rows are grouped by `sport` and `country` under a [Single Group Column](/grouping-single-group-column/).
- A `filterValueGetter` is supplied to the group column which returns `sport` values to the filter.
- Clicking the `Filter Skiing Sports` button at the top will set the filter using the Grid API `setFilterModel`. Note that the reference name `ag-Grid-AutoColumn` is used.

<grid-example title='Custom Group Filtering - Single Group Column' name='custom-group-filtering-single' type='generated' options='{ "enterprise": true, "exampleHeight": 510, "modules": ["clientside", "rowgrouping", "menu", "setfilter"] }'></grid-example>

### Multiple Group Columns

Filtering with [Multiple Group Columns](/grouping-multiple-group-columns/) uses the same approach as described above with a [Single Group Column](#single-group-column), however the `filterValueGetter` must return different filter values for each group column, as shown below:

<snippet>
const gridOptions = {  
    columnDefs: [
        { field: 'sport', rowGroup: true, hide: true },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
    ], 
    autoGroupColumnDef: { 
        // enables filtering on the group column with specified filter type
        filter: 'agTextColumnFilter',
        // supplies filter values to the column filters based on the colId
        filterValueGetter: params => {      
            const colId = params.column.getColId();        
            if (colId.includes('sport')) {
                return params.data.sport;      
            } else if (colId.includes('country')) {
                return params.data.country;      
            }            
        },                        
    }, 
    groupDisplayType: 'multipleColumns',
}
</snippet>

Note in the snippet above that the `filterValueGetter` uses the `colId` value to determine which filter value to return, although different strategies may be required for different column configurations.

Similar to when using a single group column, the filter model is tied to the group columns instead of the underlying columns. To set the filter via the Grid API against each of the group columns, `ag-Grid-AutoColumn-[colId]` is used, where `[colId]` is the column id.

<snippet>
| gridOptions.api.setFilterModel({
|     'ag-Grid-AutoColumn-sport': {
|         filterType: 'text',
|         type: 'contains',
|         filter: 'Skiing'
|     },
| });
</snippet>

The following example demonstrates filtering with multiple group columns. Note the following:

- Rows are grouped by `sport` and `country` across [Multiple Group Columns](/grouping-multiple-group-columns/).
- A `filterValueGetter` is supplied to extract the correct filter value for each group column.
- Clicking the `Filter Skiing Sports` button at the top will set the filter using the Grid API `setFilterModel`. Note that the reference name `ag-Grid-AutoColumn-sport` is used, as `sport` is the column id for the column where the filter is changing.

<grid-example title='Custom Group Filtering - Multiple Group Columns' name='custom-group-filtering-multiple' type='generated' options='{ "enterprise": true, "exampleHeight": 510, "modules": ["clientside", "rowgrouping", "menu", "setfilter"] }'></grid-example>

### Group Rows

The [Group Rows](/grouping-group-rows/) display type does not have group columns, so filters can only be defined on the underlying columns.

If the columns used in the grouping are hidden, they can still be filtered by using the [Filters Tool Panel](/tool-panel-filters/).

The following example demonstrates filtering with row groups. Note the following:

- Rows are grouped by `sport` and `country` under [Group Rows](/grouping-group-rows/).
- The Filters Tool Panel is shown, which allows filtering to be performed on `sport` and `country` values.

<grid-example title='Custom Group Filtering - Group Rows' name='custom-group-filtering-group-rows' type='generated' options='{ "enterprise": true, "exampleHeight": 510, "modules": ["clientside", "rowgrouping", "menu", "setfilter", "filterpanel"] }'></grid-example>

## Next Up

Continue to the next section to learn about [Group Footers](../grouping-footers/).