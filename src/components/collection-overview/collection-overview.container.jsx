import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { compose } from 'redux';

import { selectIsCollectionLoaded } from '../../redux/shop/shop.selector';
import withSpinner from '../with-spinner/with-spinner.component';
import collectionOverviewComponent from './collection-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoaded: state => !selectIsCollectionLoaded(state)
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(collectionOverviewComponent);

export default CollectionOverviewContainer;