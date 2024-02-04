import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View } from 'react-native';

export default class ImagePanel extends React.Component {

  static propTypes = {
    image: PropTypes.any.isRequired
  };

  render() {
    const { image } = this.props;

    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B30298'
  },
  image: {
    flex: 1,
    margin: 10
  }
});
