var RowUpdateEventString = "type RowUpdateEvent = {\n\trowIdx: number;\n\tupdated: object;\n\tcellKey: string;\n\tkeyCode: string\n};";
var CellDragEventString = "type CellDragEvent = {\n\trowIdx: number;\n\tfromRow: number,\n\ttoRow: number,\n\tvalue: any\n};";
var CellCopyPasteEventString = "type CellCopyPasteEvent = {\n\trowIdx: number;\n\tvalue : any;\n\tfromRow: number;\n\ttoRow: number;\n\tcellKey: string\n};";

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h1 id="js-api-refernce">API Reference</h1>
        <h2>Grid Events</h2>
      </div>
    );
  }
});
