import React, {PropTypes} from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Test from '../components/Test.js';
import sinon from 'sinon';

  describe('#<test/>', () => {
    let sandbox;
    // setup mock context
    const mockContext = {
      executeAction: (action, data) => {},
      getStore: (store) => {
        return {
          on: () => {}
        }
      }
    };

    const mockChildContextTypes = {
      getStore: PropTypes.func,
      executeAction: PropTypes.func,
      dispatcherContext: PropTypes.func,
      executeActionCalls: PropTypes.array
    };

    // setup the DOM
    var jsdom = require('jsdom').jsdom;
    var exposedProperties = ['window', 'navigator', 'document'];

    global.document = jsdom('');
    global.window = document.defaultView;
    Object.keys(document.defaultView).forEach((property) => {
      if (typeof global[property] === 'undefined') {
       exposedProperties.push(property);
       global[property] = document.defaultView[property];
      }
    });

    global.navigator = {
     userAgent: 'node.js'
    };

    let documentRef = document;

    // create a sinon sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    // restore stubs/spys
    afterEach (() => {
      sandbox.restore();
    });

    it('should render a divs for props and store data', () => {
        const props = {
          message: 'hello'
        }
        const mockData = 'world';
        const mockContextData = 'fakecontext';
        // stub getStateFromStores wth mock data
        sandbox.stub(Test.prototype, 'getStateFromStores')
        .returns({getMessageFromStore:  mockData});

        const wrapper = mount(<Test {...props}/>, {
          context: Object.assign( {}, mockContext, {contextData: mockContextData}),
          childContextTypes: Object.assign( {}, mockChildContextTypes, {contextData: sandbox.spy()})
        });

        expect(wrapper.containsMatchingElement(<div>hello</div>)).to.equal(true);
        expect(wrapper.containsMatchingElement(<div>{mockData}</div>)).to.equal(true);
        expect(wrapper.containsMatchingElement(<div>{mockContextData}</div>)).to.equal(true);
    });
  });
