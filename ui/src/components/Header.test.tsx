import * as React from "react";
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import Header from "./Header";

describe('Header', function () {
  it('should contain header', function () {
      let container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
          ReactDOM.render(<Header/>, container);
      })
      const header = container.getElementsByClassName('header')[0];
      expect(header.textContent).toBe("UserApp");
  });
});
