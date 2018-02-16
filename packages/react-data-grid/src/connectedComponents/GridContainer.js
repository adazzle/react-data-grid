import connect from '../stateManagement/Connect';
import GridWrapper from '../GridWrapper';
import EventTypes from '../stateManagement/EventTypes';

const mapEventsToProps = () => [];
const mapStateToProps = () => {};

const subscriptions = (updateStore, props) => {
  return {
    [EventTypes.onCommit]: props.onCommit
  };
};

export default connect(mapStateToProps, mapEventsToProps, subscriptions)(GridWrapper);
