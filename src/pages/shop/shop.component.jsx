import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import { convertCollectionSnapShotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollection } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;
    componentDidMount(){
        const { updateCollection } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot =>{
            const collectionsMap = convertCollectionSnapShotToMap(snapShot);
            updateCollection(collectionsMap)
            this.setState({ loading: false })
        })
        
    }

    componentWillUnmount(){
        this.unsubscribeFromSnapshot();
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route exact path={match.path} render={(props)=> (<CollectionOverviewWithSpinner isLoading={loading} {...props} />)} />
                <Route exact path={`${match.path}/:collectionId`} render={(props)=> (<CollectionPageWithSpinner isLoading={loading} {...props} />)} />
            </div>
        )
    }
};

const mapDisapatchToProps = dispatch => ({
    updateCollection: collectionsMap => dispatch(updateCollection(collectionsMap))
})

export default connect(null, mapDisapatchToProps)(ShopPage)