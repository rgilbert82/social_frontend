import React from 'react';
import { Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 500 },
  exit: { opacity: 0 }
});

export default class AnimatedSwitch extends React.Component {
  render() {
    return (
      <div>
        <PoseGroup>
          <RoutesContainer key={ this.props.location.key || this.props.location.pathname }>
            <Switch location={ this.props.location }>
             { this.props.children }
            </Switch>
          </RoutesContainer>
        </PoseGroup>
      </div>
    );
  }
}
