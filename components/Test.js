import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import TestStore from '../stores/TestStore';

class Test extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func,
    getStore: React.PropTypes.func,
    contextData: React.PropTypes.string
  };
  static propsTypes = {
    message: React.PropTypes.string
  };
  constructor(props){
     super(props);
     this.state = {foo: ''};
  }
  render() {
    if(this.props.getMessageFromStore){
      return (

        <div>
          <div>{this.props.message}</div>
          <div>{this.props.getMessageFromStore}</div>
          <div>{this.context.contextData}</div>
        </div>

      );
    }
    return null;
  }
}

Test = connectToStores(Test, [TestStore], (context, props) => ({
    getMessageFromStore: context.getStore(TestStore).getMessage()
}));
export default Test;
