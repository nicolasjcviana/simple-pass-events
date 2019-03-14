import React from 'react';
import { Linking, Button, StyleSheet, Text, View } from 'react-native';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
      this.state = {resultHtml: <Text></Text>, eventsSent: 0};
    }

    handleAnalyticsClick() {
      Analytics.record('AWS Event Hello World')
        .then( (evt) => {
          console.log(evt);
            const url = 'https://'+awsconfig.aws_project_region+'.console.aws.amazon.com/pinpoint/home/?region='+awsconfig.aws_project_region+'#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            let result = (
              <View>
                <Text>Enviado</Text>
                <Text>Quantidade: {++this.state.eventsSent}</Text>
              </View>
            );
            this.setState({
                'resultHtml': result
            });
        });
    };

    render() {
      return (
        <View style={styles.container}>
          <Text>Hello World App</Text>
          <Button title="Gerar evento" onPress={this.handleAnalyticsClick} />
          {this.state.resultHtml}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue'
  }
});