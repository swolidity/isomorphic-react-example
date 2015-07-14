import React from 'react'

class ProfilePhoto extends React.Component {

  render() {
    return (
      <img
        {...this.props}
        width={this.props.width}
        height={this.props.height}
        className="img-circle"
        src={this.props.photo}
      />
    );
  }
}

ProfilePhoto.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}

ProfilePhoto.defaultProps ={
  width: 20,
  height: 20
}

module.exports = ProfilePhoto;
