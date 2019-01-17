import React from 'react';
import TestUtils from 'react-dom/test-utils';
import AddorRemoveColumns from '../AddorRemoveColumns';
import _ from 'underscore';

describe('AddOrRemoveColumnsTests', () => {
    let component;
    let allColumns = [];
    describe('Basic tests', () => {
        const fakeMethods = {
            onColumnUpdate: jasmine.createSpy(),
            getAllColumns: function() {
                return _.clone(allColumns);
            },
            onCancel: jasmine.createSpy()
        };

        beforeEach(() => {
            allColumns = [
                {
                  key: 'id',
                  name: 'ID',
                  isSelected: false
                },
                {
                  key: 'task',
                  isSelected: false
                },
                {
                  key: 'priority',
                  isSelected: false
                },
                {
                  key: 'issueType',
                  isSelected: false
                },
                {
                  key: 'developer',
                  isSelected: false
                },
                {
                  key: 'complete',
                  isSelected: false
                },
                {
                  key: 'startDate',
                  isSelected: false
                },
                {
                  key: 'completeDate',
                  isSelected: false
                }
              ];
            component = TestUtils.renderIntoDocument(
                <AddorRemoveColumns
                    onColumnUpdate={fakeMethods.onColumnUpdate}
                    getAllColumns={fakeMethods.getAllColumns}
                    onCancel={fakeMethods.onCancel}
                />);
        });
        it('Should create an instance for the AddorRemoveColumns Comonent', () => {
            expect(component).toBeDefined();
        });
        describe('While invoking getColumnsForList', () => {
            it('Should call getAllColumns of the props once the Component is instantiated', () => {
                const result = component.getColumnsForList();
                expect(result[0].isSelected).toBe(false);
            });
            it('in the interim after the Component is instantiated, it should not call the props method to get all columns', () => {
                allColumns.push({
                    key: 'temp',
                    isSelected: false
                });
                const result = component.getColumnsForList(false, false, false);
                expect(result.length).not.toEqual(allColumns.length);
            });
            it('if select all parameter is passed as true, it should set isSelected field of the column to true', () => {
                const result = component.getColumnsForList(true, false);
                expect(result[0].isSelected).toEqual(true);
            });
            it('if select all parameter is passed as false, it should set isSelected field of the column to false', () => {
                const result = component.getColumnsForList(false, true);
                expect(result[0].isSelected).toEqual(false);
            });
        });
        describe('While invoking applySelectedColumns method', () => {
            it('Should not call the onColumnUpdate method of props if it is an empty selection', () => {
                component.applySelectedColumns();
                expect(fakeMethods.onColumnUpdate).not.toHaveBeenCalled();
                expect(component.state.displayErrorMessage).toEqual(true);
            });
            it('Should call the onColumnUpdate method of props if it is not an empty selection', () => {
                const selectedItems = {
                    key: 'complete',
                    isSelected: true
                };
                const selItemsArray = [];
                selItemsArray.push(selectedItems);
                component.setSelectedItems(selectedItems);
                component.applySelectedColumns();
                expect(fakeMethods.onColumnUpdate).toHaveBeenCalledWith(selItemsArray);
                expect(component.state.displayErrorMessage).toEqual(false);
            });
        });
        describe('While invoking cancelDialog method', () => {
            it('Should the props onCancel method', () => {
                component.cancelDialog();
                expect(fakeMethods.onCancel).toHaveBeenCalled();
            });
        });
        describe('While invoking setSelectedItems method', () => {
            it('Should set the state variable for the selectedColumns', () => {
                const selectedItems = {
                    key: 'complete',
                    isSelected: true
                };
                const selItemsArray = [];
                selItemsArray.push(selectedItems);
                component.setSelectedItems(selectedItems);
                expect(component.state.selectedColumns.length).toEqual(1);
                expect(component.state.selectedColumns[0]).toEqual(selectedItems);
            });
        });
        describe('While invoking selectAll method', () => {
            it('Should set the state variable for the selectedColumns', () => {
                component.selectAll();
                expect(component.state.selectedColumns.length).toEqual(allColumns.length);
                expect(component.state.selectedColumns[component.state.selectedColumns.length - 1].isSelected).toEqual(true);
                expect(component.state.displayErrorMessage).toBe(false);
                expect(component.state.selectAllColumns).toBe(true);
                expect(component.state.deselectAllColumns).toBe(false);
            });
        });
        describe('While invoking unSelectAll method', () => {
            it('Should set the state variable for the selectedColumns', () => {
                component.unSelectAll();
                expect(component.state.selectedColumns.length).toEqual(0);
                expect(component.state.allColumns[4].isSelected).toEqual(false);
                expect(component.state.selectAllColumns).toBe(false);
                expect(component.state.deselectAllColumns).toBe(true);
            });
        });
        describe('While invoking createCheckBoxes method', () => {
            it('Should get all the columns and should create as many checkbox instances', () => {
                spyOn(component, 'createCheckbox');
                component.createCheckboxes();
                expect(component.createCheckbox.calls.count()).toEqual(allColumns.length);
            });
        });
        describe('While invoking handleChange', () => {
            it('Should set the flags for appropriate columns', () => {
                const selectedItems = {
                    key: 'complete',
                    isSelected: true
                };
                component.handleChange(selectedItems);
                const modifiedCol = _.find(component.state.allColumns, function(col) {
                    return col.key === selectedItems.key;
                });
                expect(component.state.allColumns[0].isSelected).toBe(false);
                expect(component.state.deselectAllColumns).toBe(false);
                expect(component.state.selectAllColumns).toBe(false);
                expect(modifiedCol.isSelected).toBe(true);
            });
        });
    });
});
