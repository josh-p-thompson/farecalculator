import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';

// helper function to render component
function render(reactComponent) {
    const div = document.createElement('div');
    const renderedReactComponent = ReactDOM.render(reactComponent, div);
    return ReactDOM.findDOMNode(renderedReactComponent);
  }

const testData = {
    value: 'Mon Mar 09 2020 20:18:00 GMT-0700 (Pacific Daylight Time)', // should render as "March 9th 08:18 p.m."
    onChange: (newValue) => console.log(newValue),
    label: 'testLabel',
    inputVariant: "outlined",
}

// test that it renders
test('renders succesfully', () => {
    const elem = render(
        <DatePicker
        {...testData}
        />
    );

    expect(elem).toBeTruthy();
});
  
// test that label appears
test('renders label ', () => {
    // Render the element with given props
    const elem = render(
      <DatePicker
        {...testData}
      />
    );
    expect(elem.textContent).toContain(testData.label);
});  
  
// test that it renders datetime correctly
test('renders time ', () => {
    // Render the element with given props
    const elem = render(
      <DatePicker
        {...testData}
      />
    );
    expect(elem.innerHTML).toContain('value="March 9th 08:18 p.m.">');
});
  


  