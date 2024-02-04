import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    isHeader: PropTypes.bool,
    isHeaderBack: PropTypes.bool
  };

  getIcon = () => {
    const { icon, isHeaderBack } = this.props;
    let size = 28;
    if (isHeaderBack) size = 32;
    if (icon) {
      return <Icon name={icon} size={size} color="#FFF" />;
    }
  };

  getTitle = () => {
    const { title, icon, isHeaderBack, disabled, textStyle } = this.props;
    if (title) {
      return (
        <View style={styles.container}>
          {this.getIcon()}
          <Text
            style={[
              styles.buttonText,
              isHeaderBack ? styles.headerBackText : undefined,
              disabled ? styles.disabledText : undefined,
              textStyle
            ]}
          >
            {title}
          </Text>
        </View>
      );
    } else if (icon) {
      return <View style={styles.container}>{this.getIcon()}</View>;
    }
  };

  render() {
    const {
      title,
      onPress,
      style,
      isHeader,
      isHeaderBack,
      disabled
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          isHeader ? styles.header : undefined,
          isHeaderBack ? styles.headerBack : undefined,
          disabled ? styles.disabled : undefined,
          style
        ]}
      >
        {this.getTitle()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B30298',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'SugarcubesBold',
    fontSize: 20
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: 'transparent',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1
  },
  headerBack: {
    backgroundColor: 'transparent',
    paddingRight: 15,
    paddingLeft: 10,
    flex: 1
  },
  headerBackText: {
    paddingLeft: 0,
    fontSize: 18,
    position: 'relative',
    right: 5
  },
  disabled: {
    backgroundColor: '#CCC'
  },
  disabledText: {
    color: '#000'
  }
});
