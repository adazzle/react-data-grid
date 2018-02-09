import connect from '../stateManagement/Connect';
import Cell from '../Cell';
import EventTypes from '../stateManagement/EventTypes';

const mapEventsToProps = () => [EventTypes.selectCell];
const mapStateToProps = () => {};
export default connect(mapStateToProps, mapEventsToProps)(Cell);

