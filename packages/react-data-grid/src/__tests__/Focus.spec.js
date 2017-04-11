import React from 'react';
import ReactDataGrid from '../ReactDataGrid';
import { mount } from 'enzyme';

const createRows = () => {
  let rows = [];
  for (let i = 1; i < 10; i++) {
    rows.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return rows;
};

const renderContainer = () => {
  if (document.getElementById('sandbox') === null) {
    let sbox = document.createElement('div');
    sbox.id = 'sandbox';
    sbox.style.width = '600px';
    sbox.style.height = '5000px'; // Big enough to scroll out of range
    document.body.appendChild(sbox);
    sbox.innerHTML += "<div style='width:600px;height:200px' id='gridContainer'></div>";
  }
  let gridContainer = document.getElementById('gridContainer');
  return gridContainer;
};

const renderComponent = (container, extraProps) => {
  let rows = createRows();
  let testProps = {
    columns: [
      { key: 'id', name: 'ID', editable: true },
      { key: 'title', name: 'Title', editable: true },
      { key: 'count', name: 'Count', editable: true }
    ],
    rowGetter: i => { return rows[i]; },
    rowsCount: rows.length,
    minHeight: 500,
    enableCellSelect: true
  };

  const wrapper = mount(<ReactDataGrid {...testProps} {...extraProps} />, {attachTo: container});
  return wrapper;
};

describe('Focus Tests', () => {
  let container;
  let testElement;

  beforeEach(() => {
    container = renderContainer();
  });

  afterEach(function() {
    const elem = document.getElementById('sandbox');
    elem.parentNode.removeChild(elem);
  });

  describe('with current focus on the body', function() {
    it('should receive focus when onscreen', function() {
      document.body.focus(); // IE requires this explicitly (otherwise activeElement is null)
      expect(document.activeElement).toBe(document.body);
      testElement = renderComponent(container);
      expect(document.activeElement).toBe(
        testElement.find('.react-grid-Cell').first().node
      );
    });
    it('should not receive focus when offscreen', function() {
      document.body.focus(); // IE requires this explicitly (otherwise activeElement is null)
      expect(document.activeElement).toBe(document.body);
      window.scrollTo(0, 2000);
      expect(document.activeElement).toBe(document.body);
      testElement = renderComponent(container);
      expect(document.activeElement).toBe(document.body);
    });
  });
});
