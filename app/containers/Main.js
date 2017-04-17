/**
 * Foxes list component.
 */
 
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { 
  StyleSheet,
  FlatList, 
  View, 
  Text,
  ToolbarAndroid,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Actions as Router } from 'react-native-router-flux';

class Main extends Component {

  constructor(props) {
    super(props);
	
	this.state = {
	  isFoxSearching: false
	}
  }

  handleFoxSelected(foxData) {
    Router.details({foxData});
  }
  
  render() {
    const { state, actions } = this.props;
	const foxes = ['Fox 1', 'Fox 2', 'Fox 3'];
    return (
      <View style={styles.container}>
	    <ToolbarAndroid 
		  title='CatchTheFox'
		  style={styles.toolbar}/>
	    <FlatList
		  renderItem={this.renderFox.bind(this)}
		  data={foxes}
		  ItemSeparatorComponent={this.renderSeparator}
		/>
      </View>
    );
  }
  
  renderFox(fox) {
    return (
	  <TouchableHighlight 
	    key={fox}
		underlayColor='#E0E0E0'
		style={styles.foxItemContainer}
		onPress={this.handleFoxSelected.bind(this, fox.item)}>
	    <Text style={styles.foxName}>{fox.item}</Text>
	  </TouchableHighlight>
	);
  }
  
  renderSeparator() {
    return (
	  <View style={styles.rowSeparator}/>
	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  foxItemContainer: {
    padding: 8
  },
  foxName: {
    fontSize: 20
  },
  rowSeparator: {
    height: 0.5,
	backgroundColor: '#BDBDBD'
  },
  toolbar: {
    height: 48,
	backgroundColor: '#E0E0E0'
  }
});

export default connect()(Main);
