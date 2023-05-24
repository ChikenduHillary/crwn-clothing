import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionStart } from '../../redux/shop/shop.actions';


class ShopPage extends React.Component {
    componentDidMount(){
        const { fetchCollectionStart } = this.props;
        fetchCollectionStart();
    }

    render(){
        const { match } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={match.path} component={CollectionOverviewContainer} />
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        )
    }
};

const mapDisapatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(null, mapDisapatchToProps)(ShopPage)