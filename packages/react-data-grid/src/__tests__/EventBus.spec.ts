import EventBus from '../EventBus';
import { EventTypes } from '../common/enums';

describe('EventBus', () => {
  it('should call registered event handlers when event is dispatched', () => {
    const eventBus = new EventBus();
    const eventAHandler1 = jest.fn();
    const eventAHandler2 = jest.fn();
    const eventBHandler = jest.fn();

    eventBus.subscribe(EventTypes.SELECT_CELL, eventAHandler1);
    eventBus.subscribe(EventTypes.SELECT_CELL, eventAHandler2);
    eventBus.subscribe(EventTypes.SELECT_START, eventBHandler);

    eventBus.dispatch(EventTypes.SELECT_CELL, { idx: 1, rowIdx: 2 }, true);

    expect(eventAHandler1).toHaveBeenCalledWith({ idx: 1, rowIdx: 2 }, true);
    expect(eventAHandler2).toHaveBeenCalledWith({ idx: 1, rowIdx: 2 }, true);
    expect(eventBHandler).not.toHaveBeenCalled();
  });

  it('should not call unsubscribed event handlers when event is dispatched', () => {
    const eventBus = new EventBus();
    const eventAHandler1 = jest.fn();
    const eventAHandler2 = jest.fn();

    eventBus.subscribe(EventTypes.SELECT_CELL, eventAHandler1);
    const unsubscribeEventAHandler2 = eventBus.subscribe(EventTypes.SELECT_CELL, eventAHandler2);
    unsubscribeEventAHandler2();

    eventBus.dispatch(EventTypes.SELECT_CELL, { idx: 1, rowIdx: 2 }, true);

    expect(eventAHandler1).toHaveBeenCalledWith({ idx: 1, rowIdx: 2 }, true);
    expect(eventAHandler2).not.toHaveBeenCalled();
  });
});
