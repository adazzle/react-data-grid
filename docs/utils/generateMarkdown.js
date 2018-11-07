const PropTypes = {
  SHAPE: 'shape',
  ARRAYOF: 'arrayOf'
};

function stringOfLength(string, length) {
  var newString = '';
  for (var i = 0; i < length; i++) {
    newString += string;
  }
  return newString;
}

function generateDesciption(description) {
  return description + '\n';
}

function generateShapeMarkdown(shape) {
  const rows = Object.keys(shape).reduce((text, key) => {
    const prop = shape[key];
    return text.concat(`${key} | ${prop.name} | ${prop.required} | ${prop.description}| \n`);
  }, '');
  const tableHeader = `
  | Name | Type | Required | Description
  | --------- | ---- | ---- | ----------------------------------
  |${rows}`;
  return tableHeader;
}

function getPropDefintion(type) {
  let values;
  if (type.name === PropTypes.SHAPE) {
    return generateShapeMarkdown(type.value);
  }
  if (type.name === PropTypes.ARRAYOF && type.value.name === PropTypes.SHAPE) {
    return generateShapeMarkdown(type.value.value);
  }
  if (Array.isArray(type.value)) {
    values = `(${type.value.map(typeValue => (typeValue.name || typeValue.value)).join('|')})`;
  } else {
    values = type.value;
  }
  return values ? values : '';
}
function generatePropType(type) {
  return `**type:** ${type.name} ${getPropDefintion(type)} \n`;
}

function generatePropDefaultValue(value) {
  return '\n **defaultValue:** `' + value.value + '`\n';
}

function generateProp(propName, prop) {
  return (
    '### `' + propName + '`' + (prop.required ? ' (required)' : '') + '\n' +
    '\n' +
    (prop.description ? prop.description + '\n\n' : '') +
    (prop.type ? generatePropType(prop.type) : '') +
    (prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : '') +
    '\n'
  );
}

const sortByName = (p1, p2) => {
  if (p1.name < p2.name) { return -1; }
  if (p1.name > p2.name) { return 1; }
  return 0;
};

function generateProps(props) {
  var title = 'Props';
  const propsList = Object.keys(props).map(name => ({name, ...props[name]}));
  const requiredProps = propsList.filter(p => p.required === true).sort(sortByName);
  const otherProps = propsList.filter(p => p.required !== true).sort(sortByName);
  const allProps = [...requiredProps, ...otherProps];
  return (
    title + '\n' +
    stringOfLength('-', title.length) + '\n' +
    '\n' +
    allProps.map(function(p) {
      return generateProp(p.name, p);
    }).join('\n')
  );
}

function generateMarkdown(name, reactAPI) {
  var markdownString = undefined;

  if (reactAPI && reactAPI.props && name) {
    markdownString =
      generateDesciption(reactAPI.description) + '\n' +
      generateProps(reactAPI.props);
  }

  return markdownString;
}

module.exports = generateMarkdown;