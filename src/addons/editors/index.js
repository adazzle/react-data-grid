const Editors = {
  AutoComplete: require('./AutoCompleteEditor'),
  DropDownEditor: require('./DropDownEditor'),
  SimpleTextEditor: require('./SimpleTextEditor'),
  CheckboxEditor: require('./CheckboxEditor')
};

window.addEventListener( 'click', (e) => {
  e.stopPropagation;
  if (document.querySelector('.DayPicker')) {
    let el = document.querySelector('.DayPicker');
    console.log(el);
    el.remove();
  }
});

module.exports = Editors;
