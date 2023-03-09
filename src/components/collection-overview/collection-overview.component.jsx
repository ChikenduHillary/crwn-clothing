import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";

import "./collection-overview.styles.scss";

const CollectionOverview = ({collections}) =>(
    <div className="collection-overview">
        {
            collections.map(({id, ...otherCollectionProp}) => {
                return <CollectionPreview key={id} {...otherCollectionProp} />
            })
        }
    </div>
);
    
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview);