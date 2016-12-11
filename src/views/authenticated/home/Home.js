import React from 'react';
import BasketWrap from '../../../components/basket/BasketWrap';
import TotalWrap from '../../../components/total/TotalWrap';

export default function(props) {
    return (
        <div>
            <TotalWrap/>
            <BasketWrap/>
        </div>
    );
}
