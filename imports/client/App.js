import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import { CSSTransitionGroup } from 'react-transition-group';
import VerticalRhythm from 'react-vertical-rhythm-overlay';

import Item from './Item.js';
import IsRole from './utilities/IsRole';

import Items from '../api/Items';

@autobind
class App extends Component{
    
    showAll(){
        Session.set('showAll',!this.props.showAll);
    }

    addItems(e){
        e.preventDefault();

        const itemOne = this.refs.itemOne.value.trim();
        const itemTwo = this.refs.itemTwo.value.trim();
        if( itemOne != '' && itemTwo != ''){
            Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
                if(!err){
                    this.refs.itemform.reset();
                }
            });   
        }
    };

    render(){
        if(!this.props.itemsReady){
            return <div>Loading</div>;
        }

        return(
            <main>
                {/* <VerticalRhythm fontSize="1.2rem" lineHeight="1.5"/> */}
                <IsRole role="admin">
                    <button onClick={this.showAll}>
                        Show {this.props.showAll ? '1' : 'All'}
                    </button>
                </IsRole>
                <form className="new-items" onSubmit={this.addItems} ref='itemform'>
                    <input type="text" ref='itemOne'/>
                    <input type="text" ref='itemTwo'/>
                    <button type="submit">Add Items</button>
                </form>
                <CSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {this.props.items.map((item) => {
                        return <Item item={item} key={item._id}/>;
                    })}
                </CSSTransitionGroup>
            </main>
        )
    }

}

export default createContainer(({match}) => {
    let itemsSub = Meteor.subscribe('allItems');
    let userSub = Meteor.subscribe('currentUser');
    let showAll = Session.get('showAll');
    let itemsArray;
    if(match.params.id){
        itemsArray = Items.find({_id: match.params.id}).fetch();
    }else{
        itemsArray = Items.find({}, {
            limit: showAll ? 50 : 1,
            sort: { lastUpdated: 1 }
        }).fetch();
    }
    return {
        showAll,
        itemsReady: itemsSub.ready() && userSub.ready(),
        items: itemsArray
    }
}, App);