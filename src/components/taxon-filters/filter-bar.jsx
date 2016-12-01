import React, { Component } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import Taxon from './taxon';

class FilterBar extends Component {
  taxonMarkup (taxon) {
    if (taxon.taxons.length > 0) {
      let thisTaxonInnerMarkup = taxon.taxons.map((innerTaxon) => {
        return (this.taxonMarkup(innerTaxon));
      });

      return (
        <NavDropdown id={ `dropdown-${ taxon.name }-${ taxon.id }` } title={ taxon.name } key={ `nav-dropdown-${ taxon.id }` }>
          { thisTaxonInnerMarkup }
        </NavDropdown>
      );
    }
    else {
      return (
        <Taxon taxon={taxon} key={ `taxon-${ taxon.id }` } handleTaxonClick={ this.props.handleTaxonClick } />
      );
    }
  };

  render() {
    let parentTaxons = this.props.taxons.filter((taxon) => {
      return taxon.parent_id == null;
    });

    const taxonFilterMarkup = parentTaxons.map((parentTaxon) => {
      return this.taxonMarkup(parentTaxon);
    });

    return (
      <div className="row filter-bar">
        <div className="col-md-12">
          <Nav bsStyle="tabs">
            { taxonFilterMarkup }
          </Nav>
        </div>
      </div>
    );
  }
}

export default FilterBar;
