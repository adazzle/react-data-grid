var RowUpdateEventString = "type RowUpdateEvent = {\n\trowIdx: number;\n\tupdated: object;\n\tcellKey: string;\n\tkeyCode: string\n};";
var CellDragEventString = "type CellDragEvent = {\n\trowIdx: number;\n\tfromRow: number,\n\ttoRow: number,\n\tvalue: any\n};";
var CellCopyPasteEventString = "type CellCopyPasteEvent = {\n\trowIdx: number;\n\tvalue : any;\n\tfromRow: number;\n\ttoRow: number;\n\tcellKey: string\n};";

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h1 id="js-api-refernce">API Reference</h1>
        <h2>Grid Events</h2>
        <h3>onRowUpdated</h3>
        <div className="code-block function">
          <pre>
            <span className="nx">onRowUpdated</span><span className="p">(</span><span className="nx">e</span> <span className="nx">:RowUpdateEvent</span><span className="p">)</span>
          </pre>
        </div>
        <div className="code-block flow">
          <pre>
            /* @flow */
            <br/>
            <code>{RowUpdateEventString}</code>
          </pre>
        </div>
        <h3>onCellsDragged</h3>
        <div className="code-block function">
          <pre>
            <span className="nx">onCellsDragged</span><span className="p">(</span><span className="nx">e</span> <span className="nx">:CellDragEvent</span><span className="p">)</span>
          </pre>
        </div>
        <div className="code-block flow">
          <pre>
            /* @flow */
            <br/>
            <code>{CellDragEventString}</code>
          </pre>
        </div>
        <h3>onCellCopyPaste</h3>
        <div className="code-block function">
          <pre>
            <span className="nx">onCellCopyPaste</span><span className="p">(</span><span className="nx">e</span> <span className="nx">:CellCopyPasteEvent</span><span className="p">)</span>
          </pre>
        </div>
        <div className="code-block flow">
          <pre>
            /* @flow */
            <br/>
            <code>{CellCopyPasteEventString}</code>
          </pre>
        </div>
      </div>
    );
  }
});
