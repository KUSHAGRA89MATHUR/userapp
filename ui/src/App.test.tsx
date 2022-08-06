import * as React from "react";
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import App from "./App";

describe('App', function () {
  it('should contain routes element', function () {
      let container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
          ReactDOM.render(<App/>, container);
      })
      const routes = container.getElementsByClassName('routes');
      expect(routes).not.toBe(null);
  });
});
