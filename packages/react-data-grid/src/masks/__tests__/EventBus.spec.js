import EventBus from '../EventBus';

describe('EventBus', () => {
  it('should call registered event handlers when event is dispatched', () => {
    const eventBus = new EventBus();
    const eventAHandler1 = jasmine.createSpy();
    const eventAHandler2 = jasmine.createSpy();
    const eventBHandler = jasmine.createSpy();

    eventBus.subscribe('eventA', eventAHandler1);
    eventBus.subscribe('eventA', eventAHandler2);
    eventBus.subscribe('eventB', eventBHandler);

    eventBus.dispatch('eventA', 1, 2, 3);

    expect(eventAHandler1).toHaveBeenCalledWith(1, 2, 3);
    expect(eventAHandler2).toHaveBeenCalledWith(1, 2, 3);
    expect(eventBHandler).not.toHaveBeenCalled();
  });

  it('should not call unsubscribed event handlers when event is dispatched', () => {
    const eventBus = new EventBus();
    const eventAHandler1 = jasmine.createSpy();
    const eventAHandler2 = jasmine.createSpy();

    eventBus.subscribe('eventA', eventAHandler1);
    const unsubscribeEventAHandler2 = eventBus.subscribe('eventA', eventAHandler2);
    unsubscribeEventAHandler2();

    eventBus.dispatch('eventA', 1, 2, 3);

    expect(eventAHandler1).toHaveBeenCalledWith(1, 2, 3);
    expect(eventAHandler2).not.toHaveBeenCalled();
  });
});
