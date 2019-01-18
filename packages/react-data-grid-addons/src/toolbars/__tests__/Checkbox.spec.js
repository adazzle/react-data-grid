import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Checkbox from '../Checkbox';
import _ from 'underscore';

describe('CheckBoxTexts', () => {
    let component;
    const colObj = {
        key: 'complete',
        isSelected: false
    };
    describe('Basic tests', () => {
        const fakeMethods = {
            handleCheckboxChange: jasmine.createSpy(),
            setSelectedItems: jasmine.createSpy()
        };

        beforeEach(() => {
            component = TestUtils.renderIntoDocument(
            <Checkbox
            key={_.clone(colObj.key)}
            optionObj={_.clone(colObj)}
            handleCheckboxChange={fakeMethods.handleCheckboxChange}
            setSelectedItems={fakeMethods.setSelectedItems}
          />);
        });

        describe('While invoking toggleCheckboxChange', () => {
            it('Should toggle the isSelected property of the optionsObj', () => {
                const modifiedCol = {
                    key: 'complete',
                    isSelected: true
                };
                component.toggleCheckboxChange();
                expect(component.props.optionObj.isSelected).toEqual(true);
                expect(component.state.isSelected).toEqual(true);
                expect(fakeMethods.handleCheckboxChange).toHaveBeenCalledWith(modifiedCol);
            });
        });

        describe('While invoking setSelectedValues', () => {
            it('Should call the setSelectedItems method of props if the isSelected value is true ', () => {
                const modifiedCol = {
                    key: 'complete',
                    isSelected: true
                };
                component.toggleCheckboxChange();
                component.setSelectedValues();
                expect(component.props.optionObj.isSelected).toEqual(true);
                expect(component.state.isSelected).toEqual(true);
                expect(fakeMethods.setSelectedItems).toHaveBeenCalledWith(modifiedCol);
            });
            it('Should not call the setSelectedItems method of props if the isSelected value is true ', () => {
                component.toggleCheckboxChange();
                component.toggleCheckboxChange();
                component.setSelectedValues();
                expect(component.props.optionObj.isSelected).toEqual(false);
                expect(component.state.isSelected).toEqual(false);
            });
        });
    });
});
