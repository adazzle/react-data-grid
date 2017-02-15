var GridRowsUpdateEvent = 'type GridRowsUpdateEvent = {\n\tcellKey: string,\n\tfromRow: number,\n\ttoRow: number,\n\trowIds: array,\n\tupdated: object,\n\taction: string\n}';

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h1 id="js-api-refernce">API Reference</h1>
        <h2>Grid Events</h2>
        <h3>onGridRowsUpdated</h3>
        <div className="code-block function">
          <pre>
            <span className="nx">onGridRowsUpdated</span><span className="p">(</span><span className="nx">e</span> <span className="nx">:GridRowsUpdateEvent</span><span className="p">)</span>
          </pre>
        </div>
        <div className="code-block flow">
          <pre>
            /* @flow */
            <br/>
            <code>{GridRowsUpdateEvent}</code>
          </pre>
        </div>
      </div>
    );
  }
});
