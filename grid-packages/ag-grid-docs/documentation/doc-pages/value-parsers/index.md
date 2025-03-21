---
title: "Parsing Values"
---

After editing cells in the grid you have the opportunity to parse the value before inserting it into your data. This is done using Value Parsers.

## Value Parser

For example suppose you are editing a number using a text editor. The result will be a `string`, however you will probably want to store the result as a `number`. Use a Value Parser to convert the `string` to a `number`.

<snippet spaceBetweenProperties="true">
const gridOptions = {
    columnDefs: [
        {
            // name is a string, so don't need to convert
            field: 'name',
            editable: true,
        },
        {
            // age is a number, so want to convert from string to number
            field: 'age',
            editable: true,
            valueParser: params => Number(params.newValue)
        }
    ]
}
</snippet>

<api-documentation source='column-properties/properties.json' section="editing" names='["valueParser"]' ></api-documentation>

<note>
If using [Cell Data Types](../cell-data-types/), Value Parsers are set by default to handle the conversion of each of the different data types.
</note>

The return value of a value parser should be the result of the parse, i.e. return the value you want stored in the data.

Below shows an example using value parsers. The following can be noted:

- All columns are editable. After any edit, the console prints the new data for that row.
- Column 'Name' is a string column. No parser is needed.
- Column 'Bad Number' is bad because after an edit, the value is stored as a string in the data, whereas the data value should be number type.
- Column 'Good Number' is good because after an edit, the value is converted to a number using the value parser.

<grid-example title='Value Parsers' name='example-parsers' type='generated' options='{ "exampleHeight": 550 }'></grid-example>

## Use Value Parser for Import

Sometimes you may want to use the value parser when performing other grid operations apart from editing that can update values. This is possible by setting the column definition property `useValueParserForImport = true`.

<api-documentation source='column-properties/properties.json' section="editing" names='["useValueParserForImport"]' ></api-documentation>

This applies to the following features:
- [Paste](/clipboard/#processing-pasted-data)
- [Fill Handle](/range-selection-fill-handle/)
- [Copy Range Down](/range-selection/#copy-range-down)

If `useValueParserForImport` is enabled, it is recommended to also [Use a Value Formatter for Export](/value-formatters/#use-value-formatter-for-export), where a [Value Formatter](/value-formatters/) is defined that does the reverse of the value parser.

The following example demonstrates using the value parser for import with each of the supported features mentioned above. `useValueFormatterForExport` is also enabled to ensure the features work as expected.

<grid-example title='Use Value Parser for Import' name='use-value-parser-for-import' type='generated' options='{ "enterprise": true, "modules": ["clientside", "range", "clipboard"] }'></grid-example>

Note that if you are providing your own custom handling for the following features, then `useValueParserForImport` is ignored and the value will be either the original value or that set in the custom handler:
- If `processCellFromClipboard` is provided when using paste.
- If `fillOperation` is provided when using fill handle.
- If `processCellFromClipboard` is provided when using copy range down.
