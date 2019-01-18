import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Toolbar from '../Toolbar';
import _ from 'underscore';

describe('ToolbarTests', () => {
    let component;
    const allColumns = [
        {
            key: 'id',
            name: 'ID',
            isSelected: false
        },
        {
            key: 'task',
            isSelected: false
        }];
    const fakeMethods = {
        getTotalNoOfRecords: jasmine.createSpy().and.returnValue('5'),
        applySelectedColumns: jasmine.createSpy(),
        getAllColumns: jasmine.createSpy().and.returnValue(_.clone(allColumns)),
        getDefaultColumns: jasmine.createSpy()
    };
    describe('Basic tests', () => {
        describe('While rendering the component', () => {
            it('Should not render total number of records if the flag is set to true', () => {
                component = TestUtils.renderIntoDocument(
                    <Toolbar
                        totalRecords={fakeMethods.getTotalNoOfRecords}
                        enableAddOrRemoveColumns={true}
                        enableResetToDefaultColumns={true}
                        applySelectedColumns={fakeMethods.applySelectedColumns}
                        getAllColumns={fakeMethods.getAllColumns}
                        getDefaultColumns={fakeMethods.getDefaultColumns}
                        displayTotalNoOfRecords={false}
                    />);
                spyOn(component, 'displayTotalNoOfRecords');
                expect(fakeMethods.getTotalNoOfRecords).not.toHaveBeenCalled();
                expect(component.displayTotalNoOfRecords).not.toHaveBeenCalled();
            });
            it('Should render total number of records if the flag is set to true', () => {
                component = TestUtils.renderIntoDocument(
                    <Toolbar
                        totalRecords={fakeMethods.getTotalNoOfRecords}
                        enableAddOrRemoveColumns={true}
                        enableResetToDefaultColumns={true}
                        applySelectedColumns={fakeMethods.applySelectedColumns}
                        getAllColumns={fakeMethods.getAllColumns}
                        getDefaultColumns={fakeMethods.getDefaultColumns}
                        displayTotalNoOfRecords={true}
                    />);
                expect(fakeMethods.getTotalNoOfRecords).toHaveBeenCalled();
            });
        });
        describe('other tests', () => {
            beforeEach(() => {
                component = TestUtils.renderIntoDocument(
                    <Toolbar
                        totalRecords={fakeMethods.getTotalNoOfRecords}
                        enableAddOrRemoveColumns={true}
                        enableResetToDefaultColumns={true}
                        applySelectedColumns={fakeMethods.applySelectedColumns}
                        getAllColumns={fakeMethods.getAllColumns}
                        getDefaultColumns={fakeMethods.getDefaultColumns}
                        displayTotalNoOfRecords={true}
                    />);
            });
            describe('While involing displayTotalNoOfRecords', () => {
                it('Should render the TotalNoOfrecordsComponent', () => {
                    const result = TestUtils.renderIntoDocument(component.displayTotalNoOfRecords());
                    expect(result).toBeDefined();
                });
            });
            describe('While involing addOrRemoveColumns', () => {
                it('Should render the AddOrRemoveColumns if the props is set to true', () => {
                    const result = TestUtils.renderIntoDocument(component.addOrRemoveColumns());
                    expect(result).toBeDefined();
                });

                it('Should not render the AddOrRemoveColumns if the props is set to false', () => {
                    component = TestUtils.renderIntoDocument(
                        <Toolbar
                            totalRecords={fakeMethods.getTotalNoOfRecords}
                            enableAddOrRemoveColumns={false}
                            enableResetToDefaultColumns={true}
                            applySelectedColumns={fakeMethods.applySelectedColumns}
                            getAllColumns={fakeMethods.getAllColumns}
                            getDefaultColumns={fakeMethods.getDefaultColumns}
                            displayTotalNoOfRecords={true}
                        />);
                    const result = TestUtils.renderIntoDocument(component.addOrRemoveColumns());
                    expect(result).toBeNull();
                });
            });
            describe('While invoking getAllColumns', () => {
                it('Should call the getAllColumns of the props', () => {
                    component.getAllColumns();
                    expect(fakeMethods.getAllColumns).toHaveBeenCalled();
                });
            });
            describe('While invoking getDefaultColumns', () => {
                it('Should call the getDefaultColumns of the props', () => {
                    component.getDefaultColumns();
                    expect(fakeMethods.getDefaultColumns).toHaveBeenCalled();
                });
            });
            describe('While invoking onCancel', () => {
                it('Should set showColumns state to false', () => {
                    component.onCancel();
                    expect(component.state.showColumns).toBe(false);
                });
            });
            describe('While invoking openOrCloseColumns', () => {
                it('Should togggle openOrCloseColumns state', () => {
                    const currentState = component.state.showColumns;
                    component.openOrCloseColumns();
                    expect(component.state.showColumns).toBe(!currentState);
                });
            });
            describe('While invoking handleClick method', () => {
                it('Should set showColumns to false if the node does not contain the target', () => {
                    component.state.showColumns = true;
                    component.handleClick();
                    expect(component.state.showColumns).toBe(false);
                });
                it('Should not set showColumns to false if the node does contains the target', () => {
                    spyOn(component.node, 'contains').and.returnValue(true);
                    component.state.showColumns = true;
                    const e = {
                        target: ''
                    };
                    component.handleClick(e);
                    expect(component.state.showColumns).toBe(true);
                });
            });
        });
    });
});
