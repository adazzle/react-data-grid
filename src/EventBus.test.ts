import EventBus from './EventBus';

describe('EventBus', () => {
  it('should call registered event handlers when event is dispatched', () => {
    const eventBus = new EventBus();
    const eventAHandler1 = jest.fn();
    const eventAHandler2 = jest.fn();
    const eventBHandler = jest.fn();

    eventBus.subscribe('CELL_SELECT', eventAHandler1);
    eventBus.subscribe('CELL_SELECT', eventAHandler2);
    eventBus.subscribe('ROW_SELECT', eventBHandler);

    eventBus.dispatch('CELL_SELECT', { idx: 1, rowIdx: 2 }, true);

    expect(eventAHandler1).toHaveBeenCalledWith({ idx: 1, rowIdx: 2 }, true);
    expect(eventAHandler2).toHaveBeenCalledWith({ idx: 1, rowIdx: 2 }, true);
    expect(eventBHandler).not.toHaveBeenCalled();
  });

  it('should not call unsubscribed event handlers when event is dispatched', () => {
    const eventBus = new EventBus();
    const eventAHandler1 = jest.fn();
    const eventAHandler2 = jest.fn();

    eventBus.subscribe('CELL_SELECT', eventAHandler1);
    const unsubscribeEventAHandler2 = eventBus.subscribe('CELL_SELECT', eventAHandler2);
    unsubscribeEventAHandler2();

    eventBus.dispatch('CELL_SELECT', { idx: 1, rowIdx: 2 }, true);

    expect(eventAHandler1).toHaveBeenCalledWith({ idx: 1, rowIdx: 2 }, true);
    expect(eventAHandler2).not.toHaveBeenCalled();
  });
});
