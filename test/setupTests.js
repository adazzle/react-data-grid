import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Immutable from 'immutable';

enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true
});

window.Immutable = Immutable;
